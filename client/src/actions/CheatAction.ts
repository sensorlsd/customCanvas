import {TestAction} from "../actions/TestAction";
import {Utils} from "../utils/Utils";

export class CheatAction extends TestAction {
    private readonly _cheatsArray: Array<Array<number>>;

    constructor(array: Array<Array<number>>) {
        super();
        this._cheatsArray = array;
    }

    protected start(): void {
        console.log(`==> CheatAction | ${JSON.stringify(this._cheatsArray)}`);
        Utils.getWrapper().cheat.inputField.value = JSON.stringify(this._cheatsArray);
        Utils.getWrapper().cheat.sendCheat();
        this.runNext();
    }
}
