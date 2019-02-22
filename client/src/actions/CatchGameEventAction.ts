import {TestAction} from "../actions/TestAction";

export class CatchGameEventAction extends TestAction {
    private readonly _eventName: string;

    constructor(eventName: string) {
        super();
        this._eventName = eventName;
    }

    protected start(): void {
        console.log(`==> start CatchGameEventAction, ${this._eventName}`);
        this.tryToRun();
    }

    protected tryToRun(): void {
        if (this.hasSomeView()) {
            this.run();
        } else {
            setTimeout(() => {
                this.tryToRun();
            }, 500);
        }
    }

    protected run(): void {
        this.getCurrentViewComponent().dispatcher.addListener(/*name, fn, context*/
            this._eventName,
            () => {
                console.log(`==> executed CatchGameEventAction, ${this._eventName}`);
                this.runNext();
            },
            this
        );
    }

    private hasSomeView(): boolean {
        return !!this.getCurrentViewComponent();
    }

    private getCurrentViewComponent(): any {
        return window['c_gameSceneMobile'] || window['c_gameSceneDesktop'] || window['c_startScene'] || window['c_sceneGroup'];
    }
}
