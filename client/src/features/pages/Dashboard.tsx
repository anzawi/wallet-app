import React from 'react';
import {observer} from "mobx-react-lite";
import Menu from "./dashboard/Menu";
import {Outlet} from "react-router-dom";

function Dashboard () {
    return (
        <div className="flex relative pl-64">
            <Menu />
            <Outlet />
        </div>
    )
}

export default observer(Dashboard);