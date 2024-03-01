/* ================================================================================================ /
 * Title : History page
 * Description : This tells you about history of your mood and set a sentiment score
 * Author : Hashan
 * Date : February 29th, 2024
 /* ================================================================================================ */

import { getUserByClerkId } from "@/utils/auth"
import { prisma } from "@/utils/db"

const getData = async () => {
  const user = await getUserByClerkId()
  const analyses =   await prisma.analysis.findMany({
    where: {
      userId: user.id
    }
  })
  return analyses
}

const History = () => {
  return <div>History</div>
}

export default History
