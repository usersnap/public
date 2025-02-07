import { Injectable } from "@angular/core";
import { USERSNAP_SPACE_API_KEY } from "../constants";
import { loadSpace } from '@usersnap/browser'
import type { SpaceApi } from '@usersnap/browser'


@Injectable()
export class UsersnapService {
    private script: HTMLScriptElement | null = null;
    public usersnapApi: SpaceApi | null = null;

    initialize(initParams = {}) {
        return new Promise<SpaceApi>(resolve => {
            loadSpace(USERSNAP_SPACE_API_KEY).then((api) => {
                api.init(initParams)
                this.usersnapApi = api;
                resolve(api)
            })
        })
    }
}
