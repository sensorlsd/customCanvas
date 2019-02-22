export class DisplayTreeHelper {

    private static instance: DisplayTreeHelper;
    private snapshot = [];
    private elements = [];
    private oldElements = [];
    private element: any;

    static getInstance() {
        if (!DisplayTreeHelper.instance) {
            DisplayTreeHelper.instance = new DisplayTreeHelper();
        }
        return DisplayTreeHelper.instance;
    }

    addHelper() {

        document.addEventListener('keydown', (event) => {
            if (event.key === 'l') {
                console.log('//////////////////////////////////////OBJECTS///////////////////////');
                const tempSnapshot = [];
                this.elements = [];

                for (const prop in window) {

                    if (prop.startsWith('c_', 0)) {
                        this.elements.push(prop);

                        tempSnapshot.push(prop + " visible:" + window[prop].visible + " " +
                            ("added:" + window[prop].addedToScene + " ") +
                            ("interactive:" + window[prop].interactive + " ") +
                            ("parent:" + window[prop].parent));

                        console.log("%c" + prop + " %cvisible:" + window[prop].visible + " " +
                            ("added:" + window[prop].addedToScene + " ") +
                            ("interactive:" + window[prop].interactive + " ") +
                            ("parent:" + window[prop].parent), 'background: #19595b', 'background: #584b3a');
                    }
                }


                console.log('-------------------------DIFF-------------------------------------------');
                const difArr = tempSnapshot.filter((x) => {
                    return !(this.snapshot.indexOf(x) > -1);
                });
                console.log("%c " + difArr.join('\n'), 'background: #123456');
                this.snapshot = tempSnapshot;
                this.showUI();

            } else if (event.key === 'k' && this.element) {
                document.body.removeChild(this.element);
                this.element = null;
            }
        });
    }

    showUI() {
        if (this.element) {
            document.body.removeChild(this.element);
        }
        this.element = document.createElement('div');
        this.element.style.backgroundColor = 'grey';
        this.element.style.position = 'relative';
        this.element.style.zIndex = '1000';
        this.element.style.width = '300px';
        this.element.style.height = '600px';
        this.element.style.overflow = 'scroll';

        let str = '';
        for (let i = 0; i < this.elements.length; i++) {

            str += this.getItemTemplate(i);
        }
        this.element.innerHTML = str;
        document.body.appendChild(this.element);
        this.oldElements = this.elements;
    }

    private getItemTemplate(i: number) {
        return `<div 
style="background-color: ${this.getBGColor(this.elements[i])}; 
margin: 5px; 
padding: 5px; 
font-family: Arial;
font-weight: ${this.getFontWeight(this.elements[i])};
color: ${this.getFontColor(this.elements[i])};
font-style: ${this.getFontStyle(this.elements[i])}" onclick="ci(window['${this.elements[i]}'])">` + this.elements[i] + "</div>";
    }

    private getBGColor(element: string): string {
        return this.oldElements.indexOf(element) > -1 ? 'aquamarine' : 'aqua';
    }

    private getFontWeight(element: string): string {
        return window[element].addedToScene ? 'bold' : 'normal';
    }

    private getFontColor(element: string): string {
        return window[element].visible ? 'black' : 'grey';
    }

    private getFontStyle(element: string): string {
        return window[element].parent ? 'normal' : 'oblique';
    }
}
