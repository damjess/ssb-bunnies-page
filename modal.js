class Modal {

    static get _CLASS() { return 'modal'; }
    static get _CLOSE_BUTTON_STYLE() { return 'button-light'; }
    static get _CLOSE_BUTTON_CLASS() { return 'modal-close-button'; }
    static get _PRIMARY_BUTTON_CLASS() { return 'button-standard'; }
    static get _HIDDEN_CLASS() { return 'modal-hidden'; }
    static get _ANIMATION_TIME() { return 160; } // milliseconds
    static get _CATCHER_CLASS() { return 'modal-catcher'; }
    static get _CATCHER_HIDE_CLASS() { return 'modal-catcher-hidden'; }
    static get _HIDE_BUTTON() { return 'modal-close'; }

    constructor(
        element,
        destroyOnClose=false,
        allowClose=true
    ) {

        this._element = element;
        this._catcher = this._createCatcher();
        this._destroyOnClose = destroyOnClose;
        if (!element) { throw Error("element missing"); }
        this._imageElement = element.getElementsByClassName('modal-img')[0];
        this._nameElement = element.getElementsByClassName('name-info')[0];
        this._ageElement = element.getElementsByClassName('age-info')[0];
        this._sexElement = element.getElementsByClassName('sex-info')[0];
        this._weightElement = element.getElementsByClassName('weight-info')[0];
        this._descriptionElement = element.getElementsByClassName('description')[0];

        const closeButtons = this._element.getElementsByClassName(
            Modal._CLOSE_BUTTON_CLASS
        );

        const self = this;

        if (allowClose === false) { return }

        for (let i = 0; i < closeButtons.length; i++) {
            closeButtons[i].addEventListener('click', this.close.bind(self));
        }

        if (closeButtons.length < 1) {
            console.warn('Modal initialised with no close buttons');
        }

        return;
    }

    registerCloseButtons(closeButtons) {
        const self = this;

        for (let i = 0; i < closeButtons.length; i++) {
            closeButtons[i].addEventListener('click', this.close.bind(self));
        }
        return;
    }

    show(image, name, sex, weight, age, description) {
        this._imageElement.src = image;
        this._nameElement.innerText = name;
        this._sexElement.innerText = sex;
        this._weightElement.innerText = weight;
        this._ageElement.innerText = age;
        this._descriptionElement.innerText = description;
        this._catcher.classList.remove(Modal._CATCHER_HIDE_CLASS);
        this._element.classList.remove(Modal._HIDDEN_CLASS);
        return;
    }

    close() {
        this._catcher.classList.add(Modal._CATCHER_HIDE_CLASS);
        this._element.classList.add(Modal._HIDDEN_CLASS);
        if (this._destroyOnClose === true) { this.destroy() }
        return;
    }

    destroy() {
        this._element.parentElement.removeChild(this._catcher);
        this._element.parentElement.removeChild(this._element);
        return;
    }

    close_and_destroy() {
        this.close();
        if (this._destroyOnClose === true) { return }
        this.destroy();
        return;
    }

    _createCatcher() {
        const element = document.createElement('div');
        element.classList.add(Modal._CATCHER_CLASS);
        element.classList.add(Modal._CATCHER_HIDE_CLASS);
        const body = document.getElementsByTagName('body')[0];
        body.appendChild(element);
        const self = this;
        element.addEventListener('click', this.close.bind(self));
        return element;
    }

    static _createEmpty(
        destroyOnClose=false,
        suppressCloseButton=false
    ) {

        const element = Modal.manufactureContainer();

        const description = document.createElement('p');
        description.innerText = "";
        element.appendChild(description);

        const footer = document.createElement('div');
        footer.classList.add(Modal._FOOTER_CLASS);
        element.appendChild(footer);

        if (suppressCloseButton === false) {
            const closeButton = document.createElement('button');
            closeButton.innerText = 'Close';
            closeButton.classList.add(Modal._CLOSE_BUTTON_STYLE);
            closeButton.classList.add(Modal._CLOSE_BUTTON_CLASS);

            footer.appendChild(closeButton);
        }

        const body = document.getElementsByTagName('body')[0];
        body.appendChild(element);

        return new Modal(
            element,
            destroyOnClose,
            !suppressCloseButton
        );

    }

}