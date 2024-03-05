/* ================================================================================================ /
 * Title : History page
 * Description : This tells you about history of your mood and set a sentiment score
 * Author : Hashan
 * Date : February 29th, 2024
 /* ================================================================================================ */

import HistoryCharts from '@/components/HistoryCharts'
import { getUserByClerkId } from '@/utils/auth'
import { prisma } from '@/utils/db'

/**
 * Asynchronously retrieves user data and calculates the average sentiment score of the analyses.
 *
 * @return {Object} Object containing the analyses and the average sentiment score.
 */
const getData = async () => {
  const user = await getUserByClerkId()
  const analyses = await prisma.analysis.findMany({
    where: {
      userId: user.id,
    },
    orderBy: {
      createdAt: 'asc',
    },

  })

  const sum = analyses.reduce((all, current) => all + current.sentimentScore, 0)
  const avg = Math.round(sum / analyses.length)
  return { analyses, avg }
}

const History = async () => {
  const { analyses, avg } = await getData()
  return (
    <div className="w-full h-full">
      <div>{`Avg. Sentiment ${avg}`}</div>
      <div className="w-full h-full">
        <HistoryCharts data={analyses} />
      </div>
    </div>
  )
}

export default History
