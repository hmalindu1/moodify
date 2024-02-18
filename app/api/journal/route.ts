/* ================================================================================================ /
 * Title : API for creating the journal
 * Description : This will get the user through middleware and create a journal 
 * Author : Hashan
 * Date : February 17th, 2024
 /* ================================================================================================ */

import { getUserByClerkId } from '@/utils/auth'
import { prisma } from '@/utils/db'
import { revalidatePath } from 'next/cache'
import { NextResponse } from 'next/server'

export const POST = async () => {
  const user = await getUserByClerkId()
  const entry = await prisma.journalEntry.create({
    data: {
      userId: user.id,
      content: 'Write about your day',
    },
  })

  revalidatePath('/journal') // to refresh the journal page with SSR

  return NextResponse.json({ data: entry })
}
