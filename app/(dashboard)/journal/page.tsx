/* ================================================================================================ /
 * Title : Journal page
 * Description : This renders the journal page
 * Author : Hashan
 * Date : February 17th, 2024
 /* ================================================================================================ */

import EntryCard from '@/components/EntryCard'
import NewEntryCard from '@/components/NewEntryCard'
import { getUserByClerkId } from '@/utils/auth'
import { prisma } from '@/utils/db'
import Link from 'next/link'
import { analyze } from '@/utils/ai'

const getEntries = async () => {
  const user = await getUserByClerkId()
  const entries = await prisma.journalEntry.findMany({
    where: {
      userId: user.id,
    },
    orderBy: {
      createdAt: 'desc',
    },
  })
  // await analyze(`I am going to give you a journal entry, I want you to analyze for few things. I need the mood, a summary, what the subject is, and a color representing the mood. You need to respont back with formatted JSON like so: {"mood": "", "summary": "", "subject": "", "color": "", "nagative": ""}.
  
  // entry: Today was a realy great day. I was able to get an order from fiverr have been dying to get
  // `)
  return entries
}

const JournalPage = async () => {
  const entries = await getEntries()

  return (
    <div className="p-10 bg-zinc-400/10 h-full">
      <h2 className="text-3xl mb-8">Journal</h2>
      <div className="grid grid-cols-3 gap-4">
        <NewEntryCard />
        {entries.map((entry) => (
          <Link href={`/journal/${entry.id}`} key={entry.id}>
            <EntryCard entry={entry} />
          </Link>
        ))}
      </div>
    </div>
  )
}

export default JournalPage
