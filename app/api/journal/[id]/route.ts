/* ================================================================================================ /
 * Title : API for updating the journal
 * Description : 
 * Author : Hashan
 * Date : February 17th, 2024
 /* ================================================================================================ */
import { analyze } from '@/utils/ai'
import { getUserByClerkId } from '@/utils/auth'
import { prisma } from '@/utils/db'
import { NextResponse } from 'next/server'

export const PATCH = async (request: Request, { params }) => {
  const { content } = await request.json()
  const user = await getUserByClerkId()
  const updatedEntry = await prisma.journalEntry.update({
    where: {
      userId_id: {
        userId: user.id,
        id: params.id,
      },
    },
    data: {
      content,
    },
  })

  const analyis = await analyze(updatedEntry.content)

  const updated = await prisma.analysis.upsert({
    where: {
      entryId: updatedEntry.id,
    },
    create: {
      entryId: updatedEntry.id,
      ...analyis,
    },
    update: analyis,
  })

  console.log(updated)

  return NextResponse.json({ data: { ...updatedEntry, analysis: updated } })
}
