import { Injectable} from "@angular/core";
import { BehaviorSubject, Observable } from "rxjs";
import { USERSNAP_GLOBAL_API_KEY } from "src/constants";

declare const window: Window & { onUsersnapCXLoad?: (api: any) => void }

@Injectable()
export class UsersnapService {
    private script: HTMLScriptElement | null = null;
    public usersnapApi: any | null = null;

    initialize(initParams = {}) {
        return new Promise<any>(resolve => {
            window.onUsersnapCXLoad = (api: any) => {
                api.init(initParams)
                this.usersnapApi = api;
                resolve(api)
            }
            this.script = document.createElement("script")
            this.script.defer = false
            this.script.type = "text/javascript"
            this.script.src = `https://widget.usersnap.com/global/load/${USERSNAP_GLOBAL_API_KEY}?onload=onUsersnapCXLoad`
            document.body.appendChild(this.script);
        })
    }

    ngOnDestroy() {
        if (this.usersnapApi) {
            this.usersnapApi.destroy();
        }
        this.script?.remove();
    }

}
