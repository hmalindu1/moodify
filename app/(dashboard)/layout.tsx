/* ================================================================================================ /
 * Title : Dashboard Layout
 * Description : This is the main layout for the app.It contains the Left side Navbar, header and the content
 * Author : Hashan
 * Date : February 11th, 2024
 /* ================================================================================================ */

const DashboardLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="h-screen w-screen relative">
      <aside className="absolute w-[200px] top-0 left-0 h-full border-r border-black/10">
        Mood
      </aside>
      <div className="ml-[200px]">
        <header className="h-[60px] border-b border-black/10">
          <div className="w-full h-full px-6 flex items-center justify-end">
            <UserButton/>
          </div>
        </header>
        <div>{children}</div>
      </div>
    </div>
  )
}

export default DashboardLayout
