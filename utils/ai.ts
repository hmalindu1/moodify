import { OpenAI } from "@langchain/openai"

export const analyze = async (prompts) => {
    const model  = new OpenAI({ temperature: 0, modelName: "gpt-3.5-turbo" })
    const result = await model.invoke(prompts);
    console.log(result);
    
}