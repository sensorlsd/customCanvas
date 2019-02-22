import {TestAction} from "../actions/TestAction";
import {TestTypeEnum} from "../enum/TestTypeEnum";
import {Utils} from "../utils/Utils";
import {TestModel} from "../model/TestModel";

export class PayoutCheckAction extends TestAction {
    private _type: string;
    private _value: number;

    constructor(type: string, value: number) {
        super();
        this._type = type;
        this._value = value;
    }

    protected start(): void {
        const wrapper = Utils.getWrapper();
        this.stopDWBAnimation(wrapper);
        setTimeout(() => {
            const readDWBValue: number = this.getDWBAmount();
            const readBalanceValue: number = this.getBalance(wrapper);
            if (this._type === TestTypeEnum.PayoutCheckAction) {
                const isPayoutExpected: boolean = this.checkPayout(readDWBValue, readBalanceValue);
                setTimeout(() => {
                    if (isPayoutExpected) {
                        this.runNext();
                    } else {
                        console.log(`==> ALARM!!11: ${isPayoutExpected}`);
                    }
                }, 1000);
            } else {
                console.log(`==> DWB amount = ${readDWBValue}`);
                console.log(`==> Balance = ${readBalanceValue}`);
                setTimeout(() => {
                    this.runNext();
                }, 200);
            }
        }, 200);
    }

    private getDWBAmount(): number {
        const winAmountText: string = window["c_winBox"]["winBoxLabel"].visible ? window["c_winBox"]["winBoxLabel"]["text"].replace(/[^\d.-]/g, '') : 0;
        return parseFloat(winAmountText) || 0;
    }

    private getBalance(wrapper: any): number {
        return wrapper["viewBalance"];
    }

    private stopDWBAnimation(wrapper: any): void {
        const deviceClickEventName = wrapper.device.event.click;
        const event = this.createClickOnScreenEvent(deviceClickEventName);
        document.getElementById("canvas").dispatchEvent(event);
    }

    private createClickOnScreenEvent(clickEvent: any): UIEvent {
        const event = new UIEvent(clickEvent);
        event["touches"] = [{
            identifier: Date.now(),
            pageX: 100,
            pageY: 100,
            screenX: 100,
            screenY: 100,
            clientX: 100,
            clientY: 100
        }];
        event["changedTouches"] = [{
            identifier: Date.now() + 1,
            pageX: 101,
            pageY: 101,
            screenX: 101,
            screenY: 101,
            clientX: 101,
            clientY: 101
        }];
        return event;
    }

    private checkPayout(readDWBValue: number, readBalanceValue: number): boolean {
        if (TestModel.balanceAfterSpin !== (readBalanceValue - this._value)) {
            console.log(`==> Balance is not expected. Actual: ${readBalanceValue}, expected: ${TestModel.balanceAfterSpin + this._value}`);
            return false;
        }

        if (readDWBValue !== this._value) {
            console.log(`==> DWB amount is not expected. Actual: ${readDWBValue}, expected: ${this._value}`);
            return false;
        }

        return true;
    }
}
