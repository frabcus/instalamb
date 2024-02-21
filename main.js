console.log('Instalamb: Loading');

// Right sidebar of home page at desktop widths
function hideHomeSuggestedForYou() {
    var found = find('span', 'Suggested for you', '@dir="auto"')
    if (!found) {
        return;
    }

    const holder = found.parentElement.parentElement.parentElement
    shiftElemenOutTheWay(holder);
}

// This doesn't work as DOM mutates with scrolling - maybe intercept API responses??
function hideSuggestedPosts() {
    var found = find('span','Suggested Posts');
    if (!found) {
        return;
    }

    // Not really happy about counting up the parents like this, feels like will be flaky.
    // There isn't much else to go on in the DOM - could we match against styles?
    let nextArticle = found.parentElement.parentElement.parentElement.parentElement.nextElementSibling;
    while (nextArticle) {
        console.log('nextArticle', nextArticle);
        if (nextArticle.tagName == 'ARTICLE') {
            nextArticle.style.border = '5px solid red';
            nextArticle.style.display = 'none';
        }
        nextArticle = nextArticle.nextElementSibling;
    }
}

// Row of circles with stories in at top of home page
function hideHomeStoriesMenu() {
    var found = document.querySelector('[role="menu"]');
    if (!found) {
        return;
    }
    
    const holder = found.parentElement.parentElement.parentElement;
    shiftElemenOutTheWay(holder);
    console.log('Instalamb: Shifted "Stories menu" off screen');
}

const observer = new MutationObserver(mutations => {
    const pageCategory = detectPageCategory();
    console.log('Instalamb: Page is', pageCategory);

    if (pageCategory == 'user') {
    } else if (pageCategory == 'home') {
        hideHomeStoriesMenu();
        hideHomeSuggestedForYou();
    }
});

// Could optimise this more
observer.observe(document, { childList: true, subtree: true });
