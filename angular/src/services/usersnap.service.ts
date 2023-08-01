import { Injectable} from "@angular/core";
import { USERSNAP_GLOBAL_API_KEY } from "src/constants";
import { loadSpace } from '@usersnap/browser'

declare const window: Window & { onUsersnapCXLoad?: (api: any) => void }

@Injectable()
export class UsersnapService {
    private script: HTMLScriptElement | null = null;
    public usersnapApi: any | null = null;

    initialize(initParams = {}) {
        return new Promise<any>(resolve => {
            loadSpace(USERSNAP_GLOBAL_API_KEY).then((api) => {
                api.init(initParams)
                this.usersnapApi = api;
                resolve(api)
            })
        })
    }
}
