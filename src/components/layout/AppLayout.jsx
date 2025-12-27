import { Outlet } from 'react-router-dom'
import Navbar from './Navbar'
import Sidebar from './Sidebar'

const AppLayout = () => {
  return (
    <>
      <Sidebar />
      <div className="main-content">
        <Navbar />
        <div className="container-fluid p-4">
          <Outlet />
        </div>
      </div>
    </>
  )
}

export default AppLayout
