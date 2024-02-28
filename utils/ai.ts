/* ================================================================================================ /
 * Title : Journal page
 * Description : Describes the structure of the prompt, and format of the output.
 * Author : Hashan
 * Date : February 23rd, 2024
 /* ================================================================================================ */

import { OpenAI } from '@langchain/openai'
import { StructuredOutputParser } from 'langchain/output_parsers'
import { z } from 'zod'
import { PromptTemplate } from '@langchain/core/prompts'
import { Document } from 'langchain/document'
import { loadQARefineChain } from 'langchain/chains'
import { OpenAIEmbeddings } from '@langchain/openai'
import { MemoryVectorStore } from 'langchain/vectorstores/memory'

const parser = StructuredOutputParser.fromZodSchema(
  z.object({
    mood: z
      .string()
      .describe('the mood of the person who wrote the journal entry.'),
    summary: z.string().describe('quick summary of the entire entry.'),
    subject: z.string().describe('the subject of the journal entry.'),
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

  try {
    return parser.parse(result)
  } catch (error) {
    console.log(error)
  }
}

/**
 * Processes a question and retrieves an answer from a set of journal entries.
 *
 * @param {string} question - The question to be answered
 * @param {Array<{content: string, id: string, createdAt: Date}>} entries - The array of journal entries
 * @return {Promise<string>} The retrieved answer for the provided question
 */
export const qa = async (
  question: string,
  entries: Array<{ content: string; id?: string; createdAt: Date }>
): Promise<string> => {
  // Maps the journal entries to Document objects for processing, including content and metadata (source and date)
  const docs = entries.map(
    (entry) =>
      new Document({
        pageContent: entry.content, // The content of the journal entry
        metadata: { source: entry.id, date: entry.createdAt }, // Metadata with the entry's ID and creation date
      })
  )

  // Creates an instance of the OpenAI model with specific parameters for processing the question
  const model = new OpenAI({ temperature: 0, modelName: 'gpt-3.5-turbo' })

  // Loads a pre-configured processing chain for question answering and refinement
  const chain = loadQARefineChain(model)

  // Initializes the embeddings model to convert documents into vector representations
  const embeddings = new OpenAIEmbeddings()

  // Creates a vector store in memory from the documents, using their embeddings to allow similarity search
  const store = await MemoryVectorStore.fromDocuments(docs, embeddings)

  // Performs a similarity search to find the most relevant documents to the question
  const relevantDocs = await store.similaritySearch(question)

  // Invokes the question-answering chain with the relevant documents and the question, and waits for the result
  const res = await chain.invoke({
    input_documents: relevantDocs, // The documents relevant to the question
    question, // The question to be answered
  })

  // Returns the text output from the question-answering chain
  return res.output_text
}
