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

/**
 * Obtains a string with formatting instructions for the parser's expected output schema
 *
 * @param {string} content - the journal entry content
 * @return {Promise<string>} the formatted prompt which is ready to be sent to the AI model
 */
const getPrompt = async (content: string) => {
  // Obtains a string with formatting instructions for the parser's expected output schema
  const format_instructions = parser.getFormatInstructions()

  // Creates a new prompt template with placeholders for the journal entry and formatting instructions
  const prompt = new PromptTemplate({
    template: `
      Analyze the following journal entry. Follow the instructions and format your response to match 
      the format instructions, no matter what! 
      {format_instructions}
      {entry}`,
    inputVariables: ['entry'], // Declares 'entry' as the variable to be replaced in the template
    partialVariables: { format_instructions }, // Supplies the formatted instructions to the template
  })

  // Fills in the prompt template with the actual journal entry content
  const input = await prompt.format({
    entry: content,
  })

  // Logs the formatted prompt to the console for debugging
  console.log(input)
  // Returns the formatted prompt which is ready to be sent to the AI model
  return input
}

/**
 * Generates a formatted prompt to be provided to the AI model for analysis
 *
 * @param {string} content - the input content to be analyzed
 * @return {Promise<void>} a promise that resolves when the analysis is complete
 */
export const analyze = async (content: string) => {
  // Generates a formatted prompt to be provided to the AI model for analysis
  const input = await getPrompt(content)

  // Creates an instance of the OpenAI model with specific parameters
  const model = new OpenAI({ temperature: 0, modelName: 'gpt-3.5-turbo' })

  // Invokes the AI model with the formatted input and waits for the result
  const result = await model.invoke(input)

  // Logs the result of the AI model analysis to the console
  console.log(result)
}
