import React from 'react'
import AppNav from '../Components/AppNav'
import Sidenav from '../Components/Sidenav'
import { Outlet } from 'react-router-dom'

const Layout = () => {
    return (
        <div>
            <AppNav />
            <div className="w-100  row bg-light layout">
                <div className="col-3 d-none d-sm-block">
                    <Sidenav className="sidenavvv" />
                </div>
                <div className="col-12 col-sm-9">
                    <Outlet />
                </div>
            </div>
        </div>
    )
}

export default Layout