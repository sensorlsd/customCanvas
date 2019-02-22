import {TestAction} from "../actions/TestAction";
import {Utils} from "../utils/Utils";

export class CloseHtmlPopup extends TestAction {

    execute(): void {
        console.log(`==> autotest | CloseHtmlPopup | execute`);
        const wrapper = Utils.getWrapper();
        if (wrapper.isPopupOpened && wrapper.isPopupOpened()) {
            wrapper.popupManager.currentPopup.close();
            console.log(`==> autotest | CloseHtmlPopup | execute | closed`);
        }
        this.runNext();
    }
}
