import React from 'react'
import Sidebar from './Sidebar'
import { Outlet } from 'react-router-dom'

function Letside() {
  return (
    <>
        <Sidebar/>
        <Outlet/>
    </>
  )
}

export default Letside