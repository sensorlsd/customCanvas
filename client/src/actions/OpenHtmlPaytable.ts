import {TestAction} from "../actions/TestAction";
import {Utils} from "../utils/Utils";

export class OpenHtmlPaytable extends TestAction {
    protected _target: string;
    protected _isMobile: boolean;

    constructor(target: string) {
        super();
        this._target = target;
        this._isMobile = this._target === 'mobile';
    }

    execute(): void {
        console.log(`==> autotest | OpenHtmlPaytable (${this._isMobile ? 'mobile' : 'desktop'}) | execute`);
        const wrapper = Utils.getWrapper();
        const htmlPaytableButton = this.getHtmlTargetButton(wrapper);
        let wrapperEventClick = wrapper.device.event.click;

        if (this._isMobile) {
            wrapper.openMenu();
            wrapperEventClick = wrapper.device.event.up;
        }

        setTimeout(() => {
            htmlPaytableButton.dispatchEvent(new Event(wrapperEventClick));

            console.log(`==> autotest | OpenHtmlPaytable | execute | opened`);
            this.runNext();
        }, 1000);
    }

    protected getHtmlTargetButton(wrapper: any): any {
        if (this._isMobile) {
            return wrapper.menu.mobileElements.paytableButton;
        } else {
            return wrapper.menu.infoButton;
        }
    }
}
