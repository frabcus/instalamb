function hideUseTheApp() {
    let found = findElement('button', 'Use the app')
    if (!found) {
        return;
    }

    const holder = found.parentElement.parentElement.parentElement
    shiftElementOutTheWay(holder);
    console.log('Instalamb: Shifted "Use the app" off screen');
}