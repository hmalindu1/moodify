/* ================================================================================================ /
 * Title : Dashboard Layout
 * Description : This is the main layout for the app.It contains the Left side Navbar, header and the content
 * Author : Hashan
 * Date : February 11th, 2024
 /* ================================================================================================ */

import { UserButton } from '@clerk/nextjs'
import Link from 'next/link'

const links = [
  { label: 'Home', href: '/' },
  { label: 'Journal', href: '/journal' },
]

/**
 * Create a dashboard layout component.
 *
 * @param {{ children: React.ReactNode }} param0 - The children to be rendered within the layout.
 * @return {React.ReactNode} The main layout structure.
 */
const DashboardLayout = ({ children }: { children: React.ReactNode }) => {
  // Return the main layout structure
  return (
    <div className="h-screen w-screen relative">
      {/* Define the sidebar */}
      <aside className="absolute w-[200px] top-0 left-0 h-full border-r border-black/10">
        <div>Mood</div>
        <ul>
          {links.map(link => (
            <li key={link.href} className='px-2 py-6 text-xl'>
              <Link href={link.href}>{link.label}</Link>
            </li>
          ))}
        </ul>
      </aside>
      {/* Define the content area */}
      <div className="ml-[200px] h-full">
        {/* Define the header */}
        <header className="h-[60px] border-b border-black/10">
          <div className="h-full w-full px-6 flex items-center justify-end">
            {/* Render the UserButton component */}
            <UserButton />
          </div>
        </header>
        {/* Render the children components within the content area */}
        {/* <div className="h-[calc(100vh-60px)]">{children}</div> */}
        <div>{children}</div>
      </div>
    </div>
  )
}

export default DashboardLayout
