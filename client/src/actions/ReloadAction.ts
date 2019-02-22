import {TestAction} from "../actions/TestAction";

import {Utils} from "../utils/Utils";
import {TestModel} from "../model/TestModel";
import {TestConfig} from "../model/TestConfig";

export class ReloadAction extends TestAction {
    protected _config: TestConfig;

    constructor(config: TestConfig) {
        super();
        this._config = config;
    }

    public replaceUrlParam(url, paramName, paramValue) {
        if (paramValue == null) {
            paramValue = '';
        }
        const pattern = new RegExp('\\b(' + paramName + '=).*?(&|#|$)');
        if (url.search(pattern) >= 0) {
            return url.replace(pattern, '$1' + paramValue + '$2');
        }
        url = url.replace(/[?#]$/, '');
        return url + (url.indexOf('?') > 0 ? '&' : '?') + paramName + '=' + paramValue;
    }

    protected start(): void {
        console.log(`==> autotest | ReloadAction | execute`);
        const wrapper = Utils.getWrapper();
        const newLang: string = this.setNewLang(wrapper);
        const newCurrency: string = this.setNewCurrency(wrapper);
        if (newLang) {
            window.location.href = this.setNewUrlString("lang", newLang, window.location.href);
        } else {
            if (newCurrency) {
                window.location.href = this.setNewUrlString("currency", newCurrency, window.location.href);
            }
        }
    }

    private setNewLang(wrapper: any): string {
        const currentLang: string = wrapper.device.getParams['lang'];
        return this.setNewString(currentLang, this._config.languageList);
    }

    private setNewCurrency(wrapper: any): string {
        const currentCurrency: string = wrapper.device.getParams['currency'];
        return this.setNewString(currentCurrency, this._config.currencyList);
    }

    private setNewString(str: string, list: Array<string>): string {
        let newString: string = null;
        if (str) {
            const index: number = list.indexOf(str);
            if (index === list.length - 1) {
                return null;
            }
            newString = list[index + 1];
        } else {
            newString = list[0];
        }

        return newString;
    }

    private setNewUrlString(type: string, str: string, currentHref: string): string {
        let newUrl: string = null;
        //type lang

        if (currentHref.indexOf(type) === -1) {
            newUrl = currentHref + `&${type}=${str}&ses=${TestModel.getInstance().session}`;
        } else {
            newUrl = this.replaceUrlParam(currentHref, type, str);
        }

        return newUrl;
    }
}
