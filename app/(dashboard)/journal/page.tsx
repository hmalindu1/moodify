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
import Question from '@/components/Question'

/**
 * Retrieves the journal entries for the current user.
 *
 * @return {Promise<Array<JournalEntry>>} An array of journal entries.
 */
const getEntries = async () => {
  const user = await getUserByClerkId()
  const entries = await prisma.journalEntry.findMany({
    where: {
      userId: user.id,
    },
    orderBy: {
      createdAt: 'desc',
    }
  })

  return entries
}

/**
 * Renders the Journal page with a list of journal entries.
 *
 * @return {Promise<JSX.Element>} The rendered Journal page.
 */
const JournalPage = async () => {
  const entries = await getEntries()

  return (
    <div className="p-10 bg-zinc-400/10 h-full">
      <h2 className="text-3xl mb-8">Journal</h2>
      <div className='my-8'>
        <Question/>
      </div>
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
