import React from 'react';
import Avatar from "../assets/images/avatar.png";
import HumburgerIcon from "../assets/images/sidebar.svg"

const DashboardHeader = ({ onToggle }) => {
    return (
        <header className="p-4 d-flex justify-content-between justify-content-md-end align-items-center">
            <button className="btn p-0 d-md-none" onClick={onToggle}>
                <img src={HumburgerIcon} width="20" alt="" />
            </button>
            <div className="avatar">
                <img src={Avatar} alt="" />
            </div>
        </header>
    )
}

export default DashboardHeader
