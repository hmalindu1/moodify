/* ================================================================================================ /
 * Title : New User page
 * Description : If user got into this page, it means the user is a brand new user, this will check with
 *               database to see, if 
 *               ther is not a user with the clerk user ID create that user. If user exist in the database and somehow he/she got
 *               into this page, it will redirect to the journal page. 
 * Author : Hashan
 * Date : February 10th, 2024
 /* ================================================================================================ */

import { prisma } from '@/utils/db'
import { currentUser } from '@clerk/nextjs'
import { redirect } from 'next/navigation'

const createNewUser = async () => {
  const user = await currentUser() //get the user ID
  console.log('User: ', user)

  const match = await prisma.user.findUnique({
    where: {
      clerkId: user.id as string,
    },
  })

  if (!match) {
    await prisma.user.create({
      data: {
        clerkId: user.id,
        email: user?.emailAddresses[0].emailAddress,
      },
    })
  }

  redirect('/journal')
}

const NewUser = async () => {
  await createNewUser()
  return <div>...Loading</div>
}

export default NewUser
