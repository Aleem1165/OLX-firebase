import React from "react";
import { Outlet } from "react-router-dom";
import DashboardHeader from "../../compunents/dashboardHeader";

const DashboardLayout = () => {
    return (
        <>
        <DashboardHeader/>
        <Outlet/>
        </>
    )
}

export default DashboardLayout;