import { OpenAI } from "langchain/llms/openai";
import { ChatOpenAI } from "langchain/chat_models/openai";
import { PromptTemplate } from "langchain/prompts";
import { ConversationChain, LLMChain } from "langchain/chains";
import { initializeAgentExecutorWithOptions } from "langchain/agents";
import { SerpAPI } from "langchain/tools";
import { Calculator } from "langchain/tools/calculator";
import { BufferMemory } from "langchain/memory";
import { PlanAndExecuteAgentExecutor } from "langchain/experimental/plan_and_execute";
import { exec } from "child_process";

// export OPENAI_API_KEY=<>
// export SERPAPI_API_KEY=<>
// Replace with your API keys!

// 1. Prompt Templates
// google: "who is elon musk"
// chatgpt: "who is elon musk" => prompt template => "You are a helpful assistant, speaking with a user. They just said {who is Elon Musk}. Be as helpful as possible! And nice!"


const template = 'You are a director of social media with 30 years of experience. Please give me some ideas for content I should write about regarding {topic}? The content is for {socialplatform}. Translate to {language}.'

const prompt = new PromptTemplate({
    template: template,
    inputVariables: ["topic", "socialplatform", "language"],
})

// Sample FormatedPromptTemplate
// const formattedPromptTemplate = await prompt.format({
//     topic: "artificial intelligence",
//     socialplatform: "twitter",
//     language: "Hindi"
// })

// console.log({formattedPromptTemplate})

// LLM Chain 
// 1. Creates Prompt Template (format)
// 2. Call to OpenAI
// Langchain is basically chaining large language model task
// Temperature 0 => not creative, 1=> very creative

const model = new OpenAI({temperature: 0.9})

const chain = new LLMChain({ prompt: prompt, llm: model})

// const resChain = await chain.call({
//     topic: "artificial intelligence",
//     socialplatform: "twitter",
//     language: "English"
// })

// console.log({ resChain})




// to run, go to terminal and enter: cd playground
// then enter: node quickstart.mjs



// AGENTS
// Chains => Predefined, --> 1. Research=> API call 2. Summarize Research
// Agent = task + tools => it figures out what to do with all the knowledge it has.

const agentModel = new OpenAI({
    temperature: 0,
    modelName: "text-davinci-003",
})

const tools = [
    new SerpAPI(process.env.SERPAPI_API_KEY, {
        location: "Mumbai, Maharashtra, India",
        hl: 'en',
        gl:'us'
    }),
    new Calculator()
]

// const executor = await initializeAgentExecutorWithOptions(tools, agentModel, {
//     agentType: "zero-shot-react-description",
//     verbose: true,
//     maxIterations: 5
// })

// const input = "what is langchain?"

// const result = await executor.call({input})
// console.log(result.output)


// PLAN AND ACTION AGENT
const chadModel = new ChatOpenAI({
    temperature: 0,
    modelName: "gpt-3.5-turbo",
    verbose: true
})

const executor = PlanAndExecuteAgentExecutor.fromLLMAndTools({
    llm: chadModel,
    tools: tools
})

// We don't tell it how to do it, we just tell what to do.
const result = await executor.call({
    input: "Who is the prime minister of India? What is their current age raised to the second power?"
})

console.log({result})


// MEMORY 
const llm = new OpenAI({})
const memory = new BufferMemory();
const conversationChain = new ConversationChain({llm: llm, memory: memory});

const res1 = await conversationChain.call({
    input: "Hey, the prime minister of India is Narendra Modi."
})

console.log("Hey, the prime minister of India is Narendra Modi.");
console.log(res1)

const input2 = "Who is the prime minister of the India?"
const res2 = await conversationChain.call({
    input: input2
})

console.log(input2)
console.log(res2)