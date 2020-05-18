function recieveBunnies(
    error,
    bunnies
) {
    const container = document.getElementById('bunny-container');

    if (error != null) {
        const errorText = document.createElement('p');
        errorText.innerText = 'Unable to retrieve bunnies';
        container.appendChild(errorText);
        return;
    }

    container.appendChild(bunnies.createDomElement());
    return;
}

Bunnies.retrieve(recieveBunnies);