import { DirectoryLoader } from 'langchain/document_loaders/fs/directory';
import { PDFLoader } from 'langchain/document_loaders/fs/pdf';
import { CharacterTextSplitter } from "langchain/text_splitter";
import { OpenAIEmbeddings } from "langchain/embeddings/openai";
import { PineconeStore } from "langchain/vectorstores/pinecone";
import { PineconeClient } from "@pinecone-database/pinecone";
import { loadSummarizationChain } from "langchain/chains";
import { OpenAI } from "langchain/llms/openai";
import { join } from 'path';
import { writeFile, unlink } from 'fs/promises';
import { NextRequest, NextResponse } from 'next/server';
import { TextLoader } from 'langchain/document_loaders/fs/text'


export default async function handler(req: NextRequest) {
    try {
    
      const data = await req.formData()
      const file: File | null = data.get('file') as unknown as File
    
      if(!file) {
        return NextResponse.json({ success: false })
      }
    

        const bytes = await file.arrayBuffer();
        const buffer = Buffer.from(bytes);

        const path = join('documents', file.name); // Adjust the path accordingly

        await writeFile(path, buffer);
        console.log(`Uploaded file: ${file.name}`);

        const loader = new DirectoryLoader('documents', {
            ".pdf": (path) => new TextLoader(path),
        });

        const docs = await loader.load();

        const splitter = new CharacterTextSplitter({
          separator: " ",
          chunkSize: 200,
          chunkOverlap: 20,
        });
    
        
        const splitDocs = await splitter.splitDocuments(docs);
        const reducedDocs = splitDocs.map((doc) => {
          const fileName = doc.metadata.source.split("/").pop();
          const [_, firstName, lastName] = fileName.split("_");
    
          return {
            ...doc,
            metadata: {
              first_name: firstName,
              last_name: lastName.slice(0, -4),
              docType: "resume",
            },
          };
        });
    
        let summaries: { summary: any }[] = [];        const model = new OpenAI({
          modelName: "gpt-3.5-turbo",
          temperature: 0.3,
          openAIApiKey: process.env.OPENAI_API_KEY, 
        });
        const summarizeAllChain = loadSummarizationChain(model, {
          type: "map_reduce",
        });
        
        const summarizeRes:any = await summarizeAllChain.call({
          input_documents: docs,
        });
        console.log({summarizeRes})
        console.log("just start 11")
        summaries.push({ summary: summarizeRes.text });
    
    
        /** Summarize each candidate */
        for (let doc of docs) {
          const summarizeOneChain = loadSummarizationChain(model, {
            type: "map_reduce",
          });
          const summarizeOneRes = await summarizeOneChain.call({
            input_documents: [doc],
          });
    
          console.log({ summarizeOneRes });
          summaries.push({ summary: summarizeOneRes.text });
        }
    
        const client = new PineconeClient();
        await client.init({
          apiKey: process.env.PINECONE_API_KEY || "",
          environment: process.env.PINECONE_ENVIRONMENT || "",
        });
    
        const pineconeIndex = client.Index(process.env.PINECONE_INDEX || "");
    
        await PineconeStore.fromDocuments(reducedDocs, new OpenAIEmbeddings(), {
          pineconeIndex,
        });
    
        console.log("Uploaded to Pinecone");
    
        console.log({summaries});
      
        const summaryStr = JSON.stringify(summaries, null, 2);
        return NextResponse.json({
          output: summaryStr 
        })
    
    } catch (error) {
        console.error('Error uploading file:', error);
        return NextResponse.json({
          error: "Something went wrong" 
        })
    }
}
