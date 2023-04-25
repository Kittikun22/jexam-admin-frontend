import React from 'react'
import MainDrawer from '../Components/MainDrawer'
import Approve from '../Components/Approve/Approve'

function ApprovePage() {
    return (
        <>
            <MainDrawer ContentComponent={Approve} topicName='การชำระเงิน' />
        </>
    )
}

export default ApprovePage