import React from 'react'
import { useAuth } from '../Auth/AuthProvider'

import { Navigate, useNavigate, useLocation } from 'react-router-dom'

function User() {
    const { auth } = useAuth()
    const navigate = useNavigate()
    let location = useLocation()

    // make a call to /user/:id
const source = location.state?.from?.pathname || "/user" 


                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                
if (auth) {
    return <Navigate to={source} />
  }
}

export default User