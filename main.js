console.log('Instalamb: Main loading');

// Row of circles with stories in at top of home page
function hideHomeStoriesMenu() {
    let found = document.querySelector('[role="menu"]');
    if (!found) {
        return;
    }
    
    const holder = found.parentElement;
    shiftElemenOutTheWay(holder);
    console.log('Instalamb: Shifted "Stories menu" off screen');
}

// Right sidebar of home page at desktop widths
function hideHomeSuggestedForYou() {
    let found = findElement('span', 'Suggested for you', '@dir="auto"')
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
    let suggestedPosts;
    let caughtUp; // "You're all caught up" section, at same level as the articles

    // Desktop
    suggestedPosts = findElement('span','Suggested Posts');
    if (suggestedPosts) {
        caughtUp = suggestedPosts.parentElement.parentElement.parentElement.parentElement;
    }

    if (!suggestedPosts) {
        // Mobile
        suggestedPosts = findElement('span','Suggested posts');
        if (suggestedPosts) {
            caughtUp = suggestedPosts.parentElement.parentElement.parentElement;
        }
    }

    // If we found it, hide the suggested posts part
    if (!suggestedPosts) {
        return;
    }
    shiftElemenOutTheWay(suggestedPosts);

    // // Make large scrolling parent area smaller
    // let scrollArea = caughtUp.parentElement;
    // console.log("padding***", getComputedStyle(scrollArea).getPropertyValue('padding-bottom'));

    // Make sure earlier articles visible
    let prevArticle = caughtUp.previousElementSibling;
    while (prevArticle) {
        // console.log("prevArticle", prevArticle)
        if (prevArticle.tagName == 'ARTICLE') {
            prevArticle.style.visibility = null;
        }
        prevArticle = prevArticle.previousElementSibling;
    }

    // Hide later articles
    let nextArticle = caughtUp.nextElementSibling;
    while (nextArticle) {
        // console.log("nextArticle", nextArticle)
        if (nextArticle.tagName == 'ARTICLE') {
            nextArticle.style.visibility = "hidden";
        }
        nextArticle = nextArticle.nextElementSibling;
    }

    console.log('Instalamb: Hid suggested posts and prevented infinite scroll');
}

// Main entrypoint, when DOM changes
const observer = new MutationObserver(async mutations => {
    const pageCategory = detectPageCategory();
    console.log('Instalamb: Page is', pageCategory);

    var sync = ((typeof browser == 'undefined') ? chrome : browser).storage.sync
    settings = await sync.get(({
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
