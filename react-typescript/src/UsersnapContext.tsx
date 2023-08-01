import React, { useEffect, useState, useContext } from "react";
import { InitOptions, loadSpace, SpaceApi } from '@usersnap/browser'
import { USERSNAP_GLOBAL_API_KEY } from "./constants";

export const UsersnapContext = React.createContext<SpaceApi | null>(null);

export const UsersnapProvider = ({ initParams, children } : UsersnapProviderProps)  => {
    const [usersnapApi, setUsersnapApi] = useState<SpaceApi | null>(null);

    useEffect(() => {
        loadSpace(USERSNAP_GLOBAL_API_KEY).then((api: SpaceApi) => {
            api.init(initParams);
            setUsersnapApi(api);
        })
    }, [initParams])

    return (
        <UsersnapContext.Provider value={usersnapApi}>
            {children}
        </UsersnapContext.Provider>
    )
}

interface UsersnapProviderProps {
    initParams?: InitOptions;
    children: React.ReactNode;
}

export function useUsersnapApi() {
    return useContext(UsersnapContext)
}
