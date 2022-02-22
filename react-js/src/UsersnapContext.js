import React, { useEffect, useState, useContext } from "react";
import { USERSNAP_GLOBAL_API_KEY } from "./constants";

export const UsersnapContext = React.createContext(null);

export const UsersnapProvider = ({ initParams = {}, children }) => {
    const [usersnapApi, setUsersnapApi] = useState(null);

    useEffect(() => {
        let usersnapApi = null
        window.onUsersnapCXLoad = function(api) {
            api.init(initParams);
            usersnapApi = api
            setUsersnapApi(api)
        }
        const script = document.createElement('script');
        script.defer = 1;
        script.src = `https://widget.usersnap.com/global/load/${USERSNAP_GLOBAL_API_KEY}?onload=onUsersnapCXLoad`;
        document.head.appendChild(script);

        return () => {
            if (usersnapApi) {
                usersnapApi.destroy();
            }
            script.remove();
        }
    }, [])


    return (
        <UsersnapContext.Provider value={usersnapApi}>
            {children}
        </UsersnapContext.Provider>
    )
}

export function useUsersnapApi() {
    return useContext(UsersnapContext)
}
