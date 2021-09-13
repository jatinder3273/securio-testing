import React from 'react'
import DashboardHeader from '../DashboardHeader'
import Sidebar from '../Sidebar'

const DashbordLayout = ({ children }) => {
    const [show, setShow] = React.useState(false);
    const onToggle = () => {
        setShow(!show);
    }

    return (
        <div className="main-wrapper">
            <Sidebar show={show} onToggle={onToggle} />
            <div className="main-content">
                <DashboardHeader onToggle={onToggle} />
                <div className="p-4">
                    {children}
                </div>
            </div>
        </div>
    )
}

export default DashbordLayout
