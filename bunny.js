/**
* Save SomeBunny Bunny Page Bunny Class
* Author: jess@menidae.com
*/
class Bunny {
    constructor(
        status,     // string
        id,         // string
        name,       // string
        birthday,   // string
        weight,     // float
        sex,        // string
        images,      // optional array of k:v pairs
        description  // string
    ) {
        this._status = status;
        this._id = id;
        this._name = name;
        this._birthday = birthday;
        this._weight = weight;
        this._sex = sex;
        this._images = images;
        this._description = description;

        if (sex != 'MALE' && sex != 'FEMALE' && sex != 'OTHER' && sex != null) { 
            throw Error('unknown sex');
        }

        return;
    }

    get isAdoptable() {return (this._status == "ADOPTABLE");}
    get isPending() {return (this._status == "PENDING");}
    get hasImage() {
        return (this._images != undefined && this._images.length > 0);
    }
    get firstImageUrl() {
        return this._images[0]['url'];
    }
    get hasBirthday() {return (this._birthday);}

    get isFemale() { return this._sex === 'FEMALE'; }
    get isMale() { return this._sex === 'MALE'; }
    get isOther() { return (this._sex === 'OTHER' || this._sex == null); }
    get size() { return BunnySize.withMass(this._weight); }
    get sizeName() {
        if (!this.size) { return 'Unknown Size'; }
        return this.size.name;
    }

    hasSizeKey(key) {
        if (!this.size) { return false; }
        return this.size.hasSizeKey(key);
    }

    static decode(data) {
        return new Bunny(
            data['status'],
            data['pet']['id'],
            data['pet']['name'],
            data['pet']['estimated_birth_date'],
            data['pet']['weight_lbs'],
            data['pet']['gender'],
            data['pet']['images'],
            data['pet']['description']
        );
    }

    static decodeMany(data) {
        return data.map((b) => {return Bunny.decode(b);})
    }

    _calculateAge(birthdate) {
        const now = new Date();
        let difference =(now.getTime() - birthdate.getTime()) / 1000;
        difference /= (60 * 60 * 24 * 7 * 4);
        let months = Math.abs(Math.round(difference));
        let years = 0;
        let yString = " years ";
        let mString = " months";

        if (months > 11) {
            years = Math.floor(months/12);
            months = months%12;
        }

        if (years == 1) {
            yString = " year ";
        }

        if (months == 1) {
            mString = " month";
        }

        return (years + yString + months + mString);
    }

    createBunnyDomElement(modal) {

        const outerDiv = document.createElement('div');
        outerDiv.classList.add('bunny');
        outerDiv.id = this._id;

        const anchor = document.createElement('a');
        anchor.classList.add('bunny-image');

        outerDiv.appendChild(anchor);

        let image;
        if (this.hasImage) {
            image = this.firstImageUrl;
        } else {
            image = "https://www.savesomebunny.org/wp-content/uploads/2020/04/bunny_placeholder.jpg"
        }

        anchor.style.backgroundImage = 'url('+image+')';

        const lowerDiv = document.createElement('div');
        lowerDiv.classList.add('info');

        outerDiv.appendChild(lowerDiv);

        const leftDiv = document.createElement('div');
        leftDiv.classList.add('left-panel');

        lowerDiv.appendChild(leftDiv);

        const nameTag = document.createElement('h3');
        nameTag.innerText = this._name;

        leftDiv.appendChild(nameTag);

        const rightDiv = document.createElement('div');
        rightDiv.classList.add('right-panel');

        lowerDiv.appendChild(rightDiv);

        const details = document.createElement('ul');

        const birthday = document.createElement('li');
        let age = "Unknown Age";
        if (this.hasBirthday) {
            const d = new Date(this._birthday);
            age = this._calculateAge(d);
            birthday.innerText = age;
        } else {
            birthday.innerText = age;
        }

        details.appendChild(birthday);

        const sex = document.createElement('li');
        sex.innerText =  this._sex;

        details.appendChild(sex);

        const weight = document.createElement('li');
        weight.innerText = this.sizeName;

        details.appendChild(weight);

        rightDiv.appendChild(details);

        let desc;
        if (this._description == "" || this._description == " ") {
            desc = "Whoops! No information. Get in touch to learn more!";
        } else {
            desc = this._description;
        }

        const learnMore = document.createElement('a');
        learnMore.classList.add('card-button');
        learnMore.addEventListener(
            'click',
            () => { modal.show(
                image,
                this._name,
                this._sex,
                this.sizeName,
                age,
                desc
            ); return; }
        )
        learnMore.innerText = "LEARN MORE";

        leftDiv.appendChild(learnMore);

        // and so on...
        return outerDiv;
    }
 }