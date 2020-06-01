/**
* Save SomeBunny Bunny Page BunnyUI Class
* Author: jess@menidae.com
*/
class BunnyUI {

    static _SEX_SELECTOR_ID() { return 'bunny-sex-select'; }
    static _SIZE_SELECTOR_ID() { return 'bunny-size-select'; }

    constructor(
        containerElement, // DOMElement
        status           // String: adoptable or pending
    ) {

        if (!containerElement) { throw Error('Falsey container'); }
        if (!status) { throw Error('No status provided'); }

        const Self = BunnyUI;
        const self = this;

        this._containerElement = containerElement;
        this._status = status;
        this._bunnies = null;  // Optional[Bunnies]

        this._sexSelector = new BunnyDropdown(
            document.getElementById(Self._SEX_SELECTOR_ID()),
            this._updateBunnyDisplay.bind(self)
        );

        this._sizeSelector = new BunnyDropdown(
            document.getElementById(Self._SIZE_SELECTOR_ID()),
            this._updateBunnyDisplay.bind(self)
        );

        Bunnies.retrieve(this._receiveBunnies.bind(self));

        return;
    }

    _receiveBunnies(error, bunnies) {
        
        if (error) { throw Error('handle me'); return; }

        this._bunnies = bunnies;

        this._updateBunnyDisplay();
        
        return;

    }

    _updateBunnyDisplay() {

        const bunniesElement = this._bunnies.createBunniesDomElement(
            this._sexSelector.value,
            this._sizeSelector.value,
            this._status
        );

        while (this._containerElement.firstChild) {
            this._containerElement.removeChild(
                this._containerElement.lastChild
            );
            continue;
        }

        this._containerElement.appendChild(bunniesElement);

        return;

    }

    static fromElementId(elementId, status) {
        return new BunnyUI(document.getElementById(elementId), status);
    }

}