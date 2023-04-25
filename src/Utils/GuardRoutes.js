import { Outlet } from 'react-router-dom'
import React, { useEffect, useState } from 'react'
import Axios from 'axios'
import Login from '../Components/Login-Dialog'

const GuardRoutes = () => {

    const [AuthToken, setAuthToken] = useState(null);
    const [openLogin, setOpenLogin] = useState(true);

    useEffect(() => {
        const accessToken = localStorage.getItem('accessToken')
        Axios.post('https://adminapi.jkorpor.com/authToken', {
            headers: {
                "Content-Type": "application/json",
                "Authorization": "Bearer " + accessToken
            }
        })
            .then((res) => {
                if (res.data.status === 'ok') {
                    setAuthToken(true)
                } else {
                    setAuthToken(false)
                }
            })
    }, [])

    if (AuthToken === true) {
        return <Outlet />
    }
    if (AuthToken === false) {
        return <Login openLogin={openLogin} setOpenLogin={setOpenLogin} />
    }
}
export default GuardRoutes;