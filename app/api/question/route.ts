/* ================================================================================================ /
 * Title : API for asking the Questions
 * Description : This will get the user through middleware and create a journal 
 * Author : Hashan
 * Date : February 17th, 2024
 /* ================================================================================================ */

import { getUserByClerkId } from '@/utils/auth'
import { prisma } from '@/utils/db'
import { qa } from '@/utils/ai'
import { NextResponse } from 'next/server'

/**
 * Parse the incoming request to extract the question field from the JSON body
 *
 * @param {Object} request - the incoming request object
 * @return {Promise<Object>} a JSON object containing the AI's answer to the question
 */
export const POST = async (request): Promise<object> => {
  // Parse the incoming request to extract the question field from the JSON body
  const { question } = await request.json()

  // Retrieve the current user details using the helper function `getUserByClerkId`
  const user = await getUserByClerkId()

  // Query the database to find all journal entries for the current user
  const entries = await prisma.journalEntry.findMany({
    where: {
      userId: user.id, // Filter entries to only include those that belong to the current user
    },
    select: {
      content: true, // Select only the content field from each entry
      createdAt: true, // Select only the createdAt field from each entry
    },
  })

  // Use the AI utility function `qa` to analyze the question against the entries
  const answer = await qa(question, entries)

  // Respond with a JSON object containing the AI's answer to the question
  return NextResponse.json({ data: answer })
}
