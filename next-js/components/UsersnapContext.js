import React, { useEffect, useState, useRef, useContext } from "react";
import { USERSNAP_GLOBAL_API_KEY } from "../constants";

export const UsersnapContext = React.createContext(null);

export const UsersnapProvider = ({ initParams = {}, children }) => {
    const usersnapApiRef = useRef(null)
    const [usersnapApi, setUsersnapApi] = useState(null);

    useEffect(() => {
        window.onUsersnapCXLoad = function(api) {
            api.init(initParams);
            usersnapApiRef.current = api
            setUsersnapApi(api)
        }
        var script = document.createElement('script');
        script.defer = 1;
        script.src = `https://widget.usersnap.best/global/load/${USERSNAP_GLOBAL_API_KEY}?onload=onUsersnapCXLoad`;
        document.getElementsByTagName('head')[0].appendChild(script);

        return () => {
            if (usersnapApiRef.current) {
                usersnapApiRef.current.destroy();
            }
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
