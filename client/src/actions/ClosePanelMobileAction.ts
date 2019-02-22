import {TestAction} from "../actions/TestAction";
import {PanelMobileTarget} from "../enum/PanelMobileTarget";

export class ClosePanelMobileAction extends TestAction {
    private _target: string;
    private _isLandscape: boolean;

    constructor(targetPanel: string) {
        super();
        this._target = targetPanel;
    }

    protected start(): void {
        console.log(`==> ClosePanelMobileAction: ${this._target} start`);
        this._isLandscape = window['c_bottomBar'].isLandscape;
        this.openTargetPanel();
        this.runNext();
    }

    protected openTargetPanel(): void {
        switch (this._target) {
            case PanelMobileTarget.TOTAL_BET: {
                window['c_bottomBar'].closeTotalBet(this._isLandscape, this._isLandscape);
                break;
            }
            case PanelMobileTarget.AUTO_PLAY: {
                window['c_bottomBar'].closeAutoPlay(this._isLandscape, this._isLandscape);
                break;
            }
        }
        console.log(`==> ClosePanelMobileAction executed`);
    }
}
