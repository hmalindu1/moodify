import { auth } from '@clerk/nextjs'
import { prisma } from './db'

export const getUserByClerkId = async () => {
  const { userId } = await auth() // Check if user is signed in

  /** Find user,if user does not exist in database, then throw an error, because at this point if user is not in database, it means
   * that the user has slipped passed through our new user logic. We need to check that error.
   */

  const user = await prisma.user.findUniqueOrThrow({
    where: {
      clerkId: userId,
    },
  })

  return user
}
