import {TestAction} from "../actions/TestAction";

export class ScrollPaytableByStepAction extends TestAction {
    protected _scrollSteps: number;

    constructor(scrollSteps: number) {
        super();
        this._scrollSteps = scrollSteps;
    }

    protected start(): void {
        console.log(`==> autotest | ScrollPaytableAction | execute`);

        if (window['c_scroller']) {
            const scrollValueY: number = window['c_scroller']['scrollStep'] * this._scrollSteps;
            window['c_scroller']['setContentPos'](0, -scrollValueY);
            console.log(`==> autotest | ScrollPaytableAction | executed at ${this._scrollSteps} scroll steps`);
        } else if (document.getElementsByClassName('window-content')[0]) {
            let pageOffsetHeight = document.getElementsByClassName('window-content')[0]['offsetHeight'];
            pageOffsetHeight = Math.max(0, pageOffsetHeight - 100);
            document.getElementsByClassName('window-content')[0].scrollTop += pageOffsetHeight;

            console.log(`==> autotest | ScrollPaytableAction | executed at ${pageOffsetHeight}px`);
        }

        this.runNext();
    }

}
