console.log('Instalamb: Main loading');

// Row of circles with stories in at top of home page
function hideHomeStoriesMenu() {
    let found = document.querySelector('[role="menu"]');
    if (!found) {
        return;
    }
    
    const holder = found.parentElement;
    shiftElementOutTheWay(holder);
    console.log('Instalamb: Shifted "Stories menu" off screen');
}

// Right sidebar of home page at desktop widths
function hideHomeSuggestedForYou() {
    let found = findElement('span', 'Suggested for you', '@dir="auto"')
    if (!found) {
        return;
    }

    const holder = found.parentElement.parentElement.parentElement
    shiftElementOutTheWay(holder);
    console.log('Instalamb: Shifted "Suggested for you" off screen');
}

// When scrolling in feed, it has a div "You're all caught up, You've seen all new posts from the past 7 days."
// This removes all posts after that, stopping infinite scroll. The posts are all HTML <article> elements, with
// one <div> in their siblings which has the "You're caught up" part in it.
function hideHomeSuggestedPosts() {
    const suggestedPosts = findElement('span','Suggested Posts') || findElement('span','Suggested posts');

    // If we found it, hide the suggested posts part
    if (!suggestedPosts) {
        return;
    }
    shiftElementOutTheWay(suggestedPosts);

    // Make articles before the div into 
    let article = findElement('article')
    while (article && article.tagName == 'ARTICLE') {
        // console.log("showing", article);
        article.style.display = null;
        article = article.nextElementSibling;
    }

    // Skip the <div> which contains the "You're all caught up"
    if (article) {
        // console.log("skipping", article);
        article.style.paddingBottom = "10000px";
        article = article.nextElementSibling;
    }

    // Hide articles after the "You've all caught up" div
    while (article && article.tagName == 'ARTICLE') {
        // console.log("hiding", article);
        article.style.display = "none";
        article = article.nextElementSibling;
    }

    console.log('Instalamb: Hid suggested posts in infinite scroll');
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
