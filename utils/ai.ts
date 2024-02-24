/* ================================================================================================ /
 * Title : Journal page
 * Description : Describes the structure of the prompt, and format of the output.
 * Author : Hashan
 * Date : February 23rd, 2024
 /* ================================================================================================ */

import { OpenAI } from '@langchain/openai'
import { StructuredOutputParser } from 'langchain/output_parsers'
import { z } from 'zod'
import { PromptTemplate } from "langchain/prompts";

const parser = StructuredOutputParser.fromZodSchema(
  z.object({
    mood: z
      .string()
      .describe('the mood of the person who wrote the journal entry.'),
    summary: z.string().describe('quick summary of the entire entry.'),
    negative: z
      .boolean()
      .describe(
        'is the journal entry negative? (i.e. does it contain negative emotions?).'
      ),
    color: z
      .string()
      .describe(
        'a hexadecimal color code that represents the mood of the entry. Example # #2ecc71 for green representing the happiness.'
      ),
  })
)

const getPrompt = async (content) => {
  const formatted_instructions = parser.getFormatInstructions()

  const prompt = new PromptTemplate({
    template:
      'Analyze the following journal entry. Follow the instructions and format your response to match the format instructions, no matter what! \n{format_instructions}\n{entry}',
    inputVariables: ['entry'],
    partialVariables: { formatted_instructions },
  })

  const input = await prompt.format({
    entry: content,
  })

  console.log(input)
  return input
}

export const analyze = async (content) => {
  const input = await getPrompt(content)
  const model = new OpenAI({ temperature: 0, modelName: 'gpt-3.5-turbo' })
  const result = await model.invoke(input)

  console.log(result)
}
