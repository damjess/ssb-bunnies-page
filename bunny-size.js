class BunnySize {

    constructor(
        minMassLbs,
        maxMassLbs,
        friendlyName,
        key
    ) {

        this._minMassLbs = minMassLbs;
        this._maxMassLbs = maxMassLbs;
        this._friendlyName = friendlyName;
        this._key = key;

        return

    }

    get name() { return this._friendlyName; }
    get key() { return this._key; }

    hasSizeKey(
        key  // String
    ) {
        if (this._key === key) { return true; }
        return false;
    }

    static decode(data) {
        return BunnySize.withMass(data)
    }

    static get SMALL() {
        return new BunnySize(
            1,
            4,
            'Small (3 to 4lbs)',
            'small'
        );
    }

    static get MEDIUM() {
        return new BunnySize(
            4,
            7,
            'Medium (4 to 7lbs)',
            'medium'
        )
    }

    static get LARGE() {
        return new BunnySize(
            7,
            30,
            'Large (7 to 12lbs)',
            'large'
        )
    }

    static withKey(
        key  // String
    ) {
        if (key === 'small') { return BunnySize.SMALL; }
        if (key === 'medium') { return BunnySize.MEDIUM; }
        if (key === 'large') { return BunnySize.LARGE; }
        throw Error('Unknown bunny size key ' + key);
    }

    static withMass(
        mass  // Integer pounds
    ) {
        if (mass < 1) { return null; }
        if (mass >= 1 && mass < 4) { return BunnySize.SMALL; }
        if (mass >= 4 && mass < 7) { return BunnySize.MEDIUM; }
        if (mass >= 7) { return BunnySize.LARGE; }
        throw Error('Bunny mass out of bounds ' + mass);
    }

}