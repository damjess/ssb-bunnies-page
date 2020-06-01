/**
* Save SomeBunny Bunny Page Bunnies Class
* Author: jess@menidae.com
*/
class Bunnies {
    constructor(
        bunnies    // Array<Bunny>
    ) {
        this._bunnies = bunnies;
        return;
    }

    static retrieve(
        callback    // function(error?, Bunnies?)
    ) {
        const request = new XMLHttpRequest();
        request.onreadystatechange = () => {
            const status = request.status;
            const state = request.readyState;

            if (state == 4 && status == 200) {
                const rawText = request.responseText;
                const rawJson = JSON.parse(rawText);
                const bunnies = Bunnies.decode(rawJson);
                callback(null, bunnies);
            } else if (state == 4 && status != 200) {
                const error = new Error('Request failed');
                callback(error, null);
            }

            return;
        }

        request.open('GET', 'https://www.savesomebunny.org/response.json');
        request.send();
        return;
    }

    static decode(data) {
        return new Bunnies(
            Bunny.decodeMany(data['data']['organization_pets'])
        );
    }

    filterBunnies(
        sex=null,  // String: male, female, other
        size=null  // String: small, medium, or large
    ) {

        const bunnyList = new Array();

        for (let i=0; i < this._bunnies.length; i++) {
            const candidate = this._bunnies[i];

            if (sex === 'female' && (candidate.isMale || candidate.isOther)
                ){ continue; }
            if (sex === 'male' && (candidate.isFemale || candidate.isOther)
                ){ continue; }
            if (sex === 'other' && (candidate.isFemale || candidate.isMale)
                ){ continue; }
            if (size != null) {
                if (!candidate.hasSizeKey(size)) { continue; }
            }

            bunnyList.push(candidate);
            continue;

        }

        return bunnyList;

    }

    createBunniesDomElement(
        sex=null,  // String: male, female, other
        size=null,  // String: small, medium, or large
        status      // String: adoptable or pending
    ) {
        const outerDiv = document.createElement('div');
        outerDiv.classList.add('bunnies');

        const bunnies = this.filterBunnies(sex, size);

        const modal = new Modal(
            document.getElementById('bunny-modal')
        );

        bunnies.map((b) => {
            if (status == "adoptable") {
                if (b.isAdoptable) {
                    outerDiv.appendChild(b.createBunnyDomElement(modal));
                }
            } else if (status == "pending") {
                if (b.isPending) {
                    outerDiv.appendChild(b.createBunnyDomElement(modal));
                }
            }
        })
        return outerDiv;
    }
}
