import Navbar from './Navbar'
import Breadcrumbs from './Breadcrumbs'
import Footer from './Footer'
import { Outlet, useLocation } from 'react-router-dom'

function Layout() {
  const { pathname } = useLocation()
  const isHome = pathname === '/'

  return (
    <>
      <Navbar />
      {!isHome && <Breadcrumbs />}
      <main><Outlet /></main>
      <Footer />
    </>
  )
}

export default Layout