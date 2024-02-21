console.log('Instalamb: Loading');

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

// Right sidebar of home page at desktop widths
function hideHomeSuggestedForYou() {
    var found = find('span', 'Suggested for you', '@dir="auto"')
    if (!found) {
        return;
    }

    const holder = found.parentElement.parentElement.parentElement
    shiftElemenOutTheWay(holder);
    console.log('Instalamb: Shifted "Suggested for you" off screen');
}

// When scrolling in feed, it has a div "You're all caught up, You've seen all new posts from the past 7 days."
// This removes all posts after that, stopping infinite scroll. The posts are all HTML <article> elements.
function hideHomeSuggestedPosts() {
    var suggestedPosts = find('span','Suggested Posts');
    if (!suggestedPosts) {
        return;
    }
    shiftElemenOutTheWay(suggestedPosts);

    // "You're all caught up" section, at same level as the articles
    let caughtUp = suggestedPosts.parentElement.parentElement.parentElement.parentElement;

    // // Make large scrolling parent area smaller
    // let scrollArea = caughtUp.parentElement;
    // console.log("padding***", getComputedStyle(scrollArea).getPropertyValue('padding-bottom'));

    // Make sure earlier articles in front
    let prevArticle = caughtUp.previousElementSibling;
    while (prevArticle) {
        if (prevArticle.tagName == 'ARTICLE') {
            prevArticle.style.zIndex = null;
        }
        prevArticle = prevArticle.previousElementSibling;
    }

    // Put later articles at the back
    let nextArticle = caughtUp.nextElementSibling;
    while (nextArticle) {
        if (nextArticle.tagName == 'ARTICLE') {
            nextArticle.style.zIndex = '-10000';
        }
        nextArticle = nextArticle.nextElementSibling;
    }

    console.log('Instalamb: Hid suggested posts and prevented infinite scroll');
}

// Main entrypoint, when DOM changes
const observer = new MutationObserver(async mutations => {
    const pageCategory = detectPageCategory();
    console.log('Instalamb: Page is', pageCategory);

    settings = await browser.storage.sync.get(({
        "hideHomeStories": true,
        "hideHomeSuggestedForYou": true,
        "hideHomeSuggestedPosts": true
    }));

    if (pageCategory == 'user') {
    } else if (pageCategory == 'home') {
        if (settings.hideHomeStories) {
            hideHomeStoriesMenu();
        }
        if (settings.hideHomeSuggestedForYou) {
            hideHomeSuggestedForYou();
        }
        if (settings.hideHomeSuggestedPosts) {
            hideHomeSuggestedPosts();
        }
    }
});

// Could optimise this more
observer.observe(document, { childList: true, subtree: true });
