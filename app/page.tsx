/* ================================================================================================ /
 * Title : Home Page
 * Description : This renders the first welcome page of the app. This checks if user is signed in or not
 * Author : Hashan
 * Date : February 10th, 2024
 /* ================================================================================================ */

import { auth } from '@clerk/nextjs'
import Link from 'next/link'

export default async function Home() {
  const { userId } = await auth() // Check if user is signed in

  let href = userId ? '/journal' : '/new-user'
  return (
    <div className="w-screen h-screen bg-black flex justify-center items-center text-white">
      <div className="w-full max-w-[600px] mx-auto">
        <h1 className="text-6xl mb-4">The BEST Journal app, ever!</h1>
        <p className="text-2xl text-white/60 mb-4">
          Daily Emotions, Analyzed: Unravel Your Moods with MoodMap
        </p>
        <div>
          <Link href={href}>
            <button className="bg-blue-600 px-4 py-2 rounded-lg text-xl">
              get started
            </button>
          </Link>
        </div>
      </div>
    </div>
  )
}
