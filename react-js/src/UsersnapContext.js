import React, { useEffect, useState, useContext } from "react";
import { loadSpace } from '@usersnap/browser'
import { USERSNAP_GLOBAL_API_KEY } from "./constants";

export const UsersnapContext = React.createContext(null);

export const UsersnapProvider = ({ initParams, children }) => {
    const [usersnapApi, setUsersnapApi] = useState(null);

    useEffect(() => {
        loadSpace(USERSNAP_GLOBAL_API_KEY).then((api) => {
            api.init(initParams)
            setUsersnapApi(api)
        })
    }, [initParams])


    return (
        <UsersnapContext.Provider value={usersnapApi}>
            {children}
        </UsersnapContext.Provider>
    )
}

export function useUsersnapApi() {
    return useContext(UsersnapContext)
}
