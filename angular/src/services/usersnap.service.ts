import { Injectable} from "@angular/core";
import { BehaviorSubject, Observable } from "rxjs";
import { USERSNAP_GLOBAL_API_KEY } from "src/constants";

declare const window: Window & { onUsersnapCXLoad?: (api: any) => void }

@Injectable()
export class UsersnapService {
    private _usersnapApi: BehaviorSubject<any> = new BehaviorSubject(null);

    public readonly usersnapApi: Observable<any> = this._usersnapApi.asObservable();

    initialize(initParams = {}) {
        return new Promise(resolve => {
            window.onUsersnapCXLoad = (api: any) => {
                api.init(initParams)
                this._usersnapApi.next(api)
                resolve(api)
            }
            var script = document.createElement("script")
            script.defer = false
            script.type = "text/javascript"
            script.src = `https://widget.usersnap.com/global/load/${USERSNAP_GLOBAL_API_KEY}?onload=onUsersnapCXLoad`
            document.body.appendChild(script);
        })
    }

    ngOnDestroy() {
        const usersnapApi = this._usersnapApi.getValue();
        if (usersnapApi) {
            usersnapApi.destroy();
        }
    }

}
