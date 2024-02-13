/* ================================================================================================ /
 * Title : Dashboard Layout
 * Description : This is the main layout for the app.It contains the Left side Navbar, header and the content
 * Author : Hashan
 * Date : February 11th, 2024
 /* ================================================================================================ */

import { UserButton } from '@clerk/nextjs'

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
        Mood
      </aside>
      {/* Define the content area */}
      <div className="ml-[200px]">
        {/* Define the header */}
        <header className="h-[60px] border-b border-black/10">
          <div className="w-full h-full px-6 flex items-center justify-end">
            {/* Render the UserButton component */}
            <UserButton />
          </div>
        </header>
        {/* Render the children components within the content area */}
        <div>{children}</div>
      </div>
    </div>
  )
}

export default DashboardLayout
