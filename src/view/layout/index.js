import React from "react";
import { Link } from "react-router-dom";
import { Outlet } from "react-router-dom";
import Header from "../../compunents/header";

const Layout = () => {
    return (
        <>
        <Header/>
        <Outlet/>
        <div>
            {/* footer */}
        </div>
        </>
    )
}

export default Layout;