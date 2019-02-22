export class TaskModel {
    public type: string;
    public target: string;
    public dataArray: Array<Array<number>>;
    public property: string;
    public value: any;

    constructor(data: any) {
        this.type = data.type;
        this.target = data.target;
        this.dataArray = data.dataArray;
        this.property = data.property;
        this.value = data.value;

    }
}
