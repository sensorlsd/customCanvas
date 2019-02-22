export class TestConfig {
    private _languageList: Array<string> = [];

    public get languageList(): Array<string> {
        return this._languageList;
    }

    public set languageList(value: Array<string>) {
        this._languageList = value;
    }

    private _currencyList: Array<string> = [];

    public get currencyList(): Array<string> {
        return this._currencyList;
    }

    public set currencyList(value: Array<string>) {
        this._currencyList = value;
    }
}
