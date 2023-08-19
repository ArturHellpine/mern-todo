import { useCallback, useEffect, useState } from "react";

export const useAuth = () => {
    const [token, setToken] = useState(null)
    const [userId, setUserId] = useState(null)
    const [fullName, setFullName] = useState(null)
    const [isReady, setIsReady] = useState(false)

    const login = useCallback((jwtToken, id, name) => {
        setToken(jwtToken)
        setUserId(id)
        setFullName(name)
        localStorage.setItem('userData', JSON.stringify({
            userId: id,
            token: jwtToken,
            fullName: name
        }))
    }, [])

    const logout = () => {
        setToken(null)
        setUserId(null)
        setFullName(null)
        localStorage.removeItem('userData')
    }

    useEffect(() => {
        const data = JSON.parse(localStorage.getItem('userData'))
        if(data && data.token) {
            login(data.token, data.userId, data.fullName)
        }
        setIsReady(true)
    }, [login])

    return { login, logout, token, userId, isReady, fullName }
}