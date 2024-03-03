import { render, screen } from '@testing-library/react'
import { vi } from 'vitest'
import HomePage from '../app/page'

vi.mock(`@clerk/nextjs`, () => {
  return {
    auth: () =>
      new Promise((resolve) =>
        resolve({ userId: '31vd12e12vasdav123qdvwe5645' })
      ),
      ClerkProvider: ({children}) => <div>{children}</div>,
      useUser: () => ({
        isSignedIn: true,
        user: { id: '31vd12e12vasdav123qdvwe5645', fullName: 'John Doe' },
      })
  }
})

test(`Home`, async ()=>{
  render(await HomePage())
  expect(screen.getByText(`Daily Emotions, Analyzed: Unravel Your Moods with MoodMap`)).toBeInTheDocument() 
})
