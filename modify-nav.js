
function _hideNavByAria(name) {
    let found = document.querySelector(`[aria-label="${name}"]`)
    if (!found) {
        return;
    }
    
    const holder = found.parentElement.parentElement.parentElement.parentElement.parentElement.parentElement.parentElement.parentElement;
    shiftElementOutTheWay(holder);
    console.log(`Instalamb: Shifted "${name}" menu off screen`);
}

function _hideNavByAriaBottom(name) {
    let found = document.querySelector(`[aria-label="${name}"]`)
    if (!found) {
        return;
    }
    
    const holder = found.parentElement.parentElement.parentElement.parentElement.parentElement.parentElement.parentElement;
    shiftElementOutTheWay(holder);
    console.log(`Instalamb: Shifted "${name}" menu off screen`);
}

function _hideNavByName(name) {
    let found = findElement('span', name);
    if (!found) {
        return;
    }
    
    const holder = found.parentElement.parentElement;
    shiftElementOutTheWay(holder);
    console.log(`Instalamb: Shifted "${name}" menu off screen`);
}

function _hideNavByUrl(name, url) {
    let found = document.querySelector(`[href="${url}"]`)

    if (!found) {
        return;
    }
    
    const holder = found.parentElement.parentElement.parentElement;
    shiftElementOutTheWay(holder);
    console.log(`Instalamb: Shifted "${name}" menu off screen`);
}


// Top part of navigation
function hideNavHome() {
    _hideNavByAria("Home");
}
function hideNavSearch() {
    _hideNavByAria("Search");
}
function hideNavExplore() {
    _hideNavByAria("Explore");
}
function hideNavReels() {
    _hideNavByAria("Reels");
}
function hideNavMessages() {
    _hideNavByAria("Direct");
}
function hideNavNotifications() {
    _hideNavByAria("Notifications");
}
function hideNavCreate() {
    _hideNavByAria("New post");
}
function hideNavProfile() {
    _hideNavByName("Profile");
}

// Bottom part of navigation
function hideNavThreads() {
    _hideNavByUrl("Threads", "https://www.threads.net/");
}
function hideNavMore() {
    _hideNavByAriaBottom("Settings");
}
