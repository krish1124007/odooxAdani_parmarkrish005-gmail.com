import { Outlet } from 'react-router-dom'

const AppLayout = () => {
  return (
    <div className="app-layout">
      <main className="main-content-top">
        <div className="container-fluid p-4">
          <Outlet />
        </div>
      </main>
    </div>
  )
}

export default AppLayout
