import React from 'react'
import Dashboard from '../Components/Dashboard/Dashboard'
import MainDrawer from '../Components/MainDrawer'

function DashboardPage() {
    return (
        <MainDrawer  ContentComponent={Dashboard} topicName='แดชบอร์ด'/>
    )
}

export default DashboardPage