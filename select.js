class BunnyDropdown {
    constructor(
        domElement,      // DOM element (select)
        onChangeAction   // function that takes string value
    ) {
        this._domElement = domElement;
        this._onChangeAction = onChangeAction;

        const self = this;
        this._domElement.addEventListener(
            "change", 
            this._onChangeAction.bind(self)
        );

        return;
    }

    get value() { return this._retrieveValue(); }

    _retrieveValue() {
        const index = this._domElement.selectedIndex;
        const value = this._domElement.options[index].value;
        if (value === 'nil') { return null; }
        return value;
    }
}
