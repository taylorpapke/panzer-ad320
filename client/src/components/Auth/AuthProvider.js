import React, { useState } from 'react'
import axios from 'axios'
import jwt from 'jwt-decode'

const AuthContext = React.createContext(null)

const AuthProvider = ({ children }) => {
    const [auth, setAuth] = useState(null)

    const login = async (email, password, callback) => { 
        console.log("[Login]")
        try{
            const authResponse = await axios.post(
                'http://localhost:8000/auth/login', 
                { email: email, password: password }, 
                { 'content-type': 'application/json' }
            )
            const decoded = jwt(authResponse.data.token)
            setAuth({ token: authResponse.data.token, user: decoded.user })

            callback()
        } catch (err) {
            console.log(`Login error ${err}`)
            alert('incorrect login. Try again.')
        }
    }

    const register = async (email, password, callback) => { 
        try {
            const registerResponse = await axios.post(
                'http://localhost:8000/auth/register',
                { email: email, password: password }, 
                { 'content-type': 'application/json' }
            )
            const something = jwt(registerResponse.data.token)
            console.log("register response", registerResponse.data)
            setAuth({ token: registerResponse.data.token, user: something.user})
            callback()
        }  catch (err) {
            console.log(`register error ${err}`)
            alert('register failed. Try again.')
        }
    }

    const authCtx = {
        auth: auth,
        login: login,
        register: register
    }

    return (
        <AuthContext.Provider value={authCtx}>
            {children}
        </AuthContext.Provider>
    )
}

export function useAuth() {
    const authContext = React.useContext(AuthContext)
    return authContext
}

export default AuthProvider