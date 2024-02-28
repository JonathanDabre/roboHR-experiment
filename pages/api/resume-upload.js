// /pages/api/resume_upload.js
// Import dependencies

/**
 * This endpoint is used to load the resumes into the chain, then upload them to the Pinecone database.
 * Tutorial: https://js.langchain.com/docs/modules/indexes/document_loaders/examples/file_loaders/directory
 * Summarization: https://js.langchain.com/docs/modules/chains/other_chains/summarization
 * Dependencies: npm install pdf-parse
 */

import { DirectoryLoader } from "langchain/document_loaders/fs/directory";
import { PDFLoader } from "langchain/document_loaders/fs/pdf";
import { CharacterTextSplitter } from "langchain/text_splitter";
import { OpenAIEmbeddings } from "langchain/embeddings/openai";
import { PineconeStore } from "langchain/vectorstores/pinecone";
import { PineconeClient } from "@pinecone-database/pinecone";
import { loadSummarizationChain } from "langchain/chains";
import { OpenAI } from "langchain/llms/openai";

export default async function handler(req, res) {
  // Grab the prompt from the url (?prompt=[value])
  //   console.log(process.env.PINECONE_API_KEY);
  //   console.log(process.env.PINECONE_ENVIRONMENT);
  //   console.log(process.env.PINECONE_INDEX);
  // Always use a try catch block to do asynchronous requests and catch any errors
  try {
    console.log("just start 1")
    const loader = new DirectoryLoader("/home/jonathan/pbl-project/roboHR-experiment/data/resumes", {
      ".pdf":(path) => new PDFLoader(path, '/pdf')
    })

    const docs = await loader.load();
    console.log(docs)
    console.log("just start 2")

    // console.log(`Loaded: ${docs.length}`);
    
    // Split the documents with their metadata
    const splitter = new CharacterTextSplitter({
      separator: " ",
      chunkSize: 200,
      chunkOverlap: 20,
    });

    console.log("just start 3")
    const splitDocs = await splitter.splitDocuments(docs);
    console.log("just start 4")

    // console.log(`Split Docs: ${splitDocs.length}`);

    // console.log(docs[0]);
    // console.log(splitDocs[0]);

    // reduce the metadata and make it more searchable
    const reducedDocs = splitDocs.map((doc) => {
      // ["Users", "shawnesquivel", ... "resume_aubrey_graham.pdf"]
      console.log("just start 5")
      const fileName = doc.metadata.source.split("/").pop();
      // ["resume", "aubrey", "graham.pdf"]
      const [_, firstName, lastName] = fileName.split("_");
      console.log("just start 6")

      return {
        ...doc,
        metadata: {
          first_name: firstName,
          last_name: lastName.slice(0, -4),
          docType: "resume",
        },
      };
    });

    // console.log(reducedDocs[4]);
    console.log("just start 7")
    let summaries = [];
    console.log("just start 8")
    // const model = new OpenAI({ temperature: 0 });
    const model = new OpenAI({
      modelName: "gpt-3.5-turbo", // Defaults to "gpt-3.5-turbo-instruct" if no model provided.
      temperature: 0.3,
      openAIApiKey: process.env.OPENAI_API_KEY, // In Node.js defaults to process.env.OPENAI_API_KEY
    });
    console.log("just start 9")
    const summarizeAllChain = loadSummarizationChain(model, {
      type: "map_reduce",
    });
    console.log("just start 10")
    
    const summarizeRes = await summarizeAllChain.call({
      input_documents: docs,
    });
    console.log({summarizeRes})
    console.log("just start 11")
    summaries.push({ summary: summarizeRes.text });
    console.log("just start 12")

    /** Summarize each candidate */
    for (let doc of docs) {
      const summarizeOneChain = loadSummarizationChain(model, {
        type: "map_reduce",
      });
      const summarizeOneRes = await summarizeOneChain.call({
        input_documents: [doc],
      });

      console.log("just start 13")
      console.log({ summarizeOneRes });
      summaries.push({ summary: summarizeOneRes.text });
    }

    const client = new PineconeClient();
    await client.init({
      apiKey: process.env.PINECONE_API_KEY,
      environment: process.env.PINECONE_ENVIRONMENT,
    });

    const pineconeIndex = client.Index(process.env.PINECONE_INDEX);

    await PineconeStore.fromDocuments(reducedDocs, new OpenAIEmbeddings(), {
      pineconeIndex,
    });

    console.log("Uploaded to Pinecone");

    console.log({summaries});
  
    const summaryStr = JSON.stringify(summaries, null, 2);

    return res.status(200).json({ output: summaryStr });

  } catch (err) {
    // If we have an error

    console.error(err);
    return res.status(500).json({ error: err });
  }
}
