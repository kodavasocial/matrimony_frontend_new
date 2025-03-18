import React, { useState } from 'react'
import Footer from './components/Footer'
import Navbar from './components/Navbar'
import { getLocalStorage } from './Utils/LocalStorage'

const Layout = ({ children }) => {
  const [auth, setAuth] = useState(!!getLocalStorage("access_token"))
  return (
    <>
      <Navbar auth={auth} />
      {children}
      <Footer />
    </>
  )
}

export default Layout;