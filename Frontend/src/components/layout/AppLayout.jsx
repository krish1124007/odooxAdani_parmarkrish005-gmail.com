import { Outlet } from 'react-router-dom'
import Navbar from './Navbar'

const AppLayout = () => {
  return (
    <div className="app-layout">
      <Navbar />
      <main className="main-content-top">
        <div className="container-fluid p-4">
          <Outlet />
        </div>
      </main>
    </div>
  )
}

export default AppLayout
