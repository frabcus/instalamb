console.log('Instalamb: Main loading');

function detectPageCategory() {
    if (findElement('div', 'Message')) {
        return 'user';
    }
    return 'home';
}


// Main entrypoint, when DOM changes
const observer = new MutationObserver(async mutations => {
    const pageCategory = detectPageCategory();
    console.log('Instalamb: Page is', pageCategory);

    var sync = ((typeof browser == 'undefined') ? chrome : browser).storage.sync
    settings = await sync.get(({
        "hideHomeStories": true,
        "hideHomeSuggestedForYou": true,
        "hideHomeSuggestedPosts": true,

        "defaultNavPage": "home",
        "hideNavHome": false,
        "hideNavSearch": false,
        "hideNavExplore": false,
        "hideNavReels": false,
        "hideNavMessages": false,
        "hideNavNotifications": false,
        "hideNavCreate": false,
        "hideNavProfile": false,
        "hideNavThreads": false,
        "hideNavMore": false,

        "hideMetricsLikes": false,
        "hideCommentCounts": false
    }));

    // Navigation
    if (settings.hideNavHome) {
        hideNavHome();
    }
    if (settings.hideNavSearch) {
        hideNavSearch();
    }
    if (settings.hideNavExplore) {
        hideNavExplore();
    }
    if (settings.hideNavReels) {
        hideNavReels();
    }
    if (settings.hideNavMessages) {
        hideNavMessages();
    }
    if (settings.hideNavNotifications) {
        hideNavNotifications();
    }
    if (settings.hideNavCreate) {
        hideNavCreate();
    }
    if (settings.hideNavProfile) {
        hideNavProfile();
    }
    if (settings.hideNavThreads) {
        hideNavThreads();
    }
    if (settings.hideNavMore) {
        hideNavMore();
    }

    if (pageCategory == 'user') {
    } else if (pageCategory == 'home') {
        // Navigation from home timeline
        switchNavDefaultPage(settings.defaultNavPage);

        // Feed on home page
        if (settings.hideHomeStories) {
            hideHomeStoriesMenu();
        }
        if (settings.hideHomeSuggestedForYou) {
            hideHomeSuggestedForYou();
        }
        if (settings.hideHomeSuggestedPosts) {
            hideHomeSuggestedPosts();
        }

        // Metrics on home page
        if (settings.hideMetricsLikes) {
            hideHomeLikeCounts();
        }
        if (settings.hideCommentCounts) {
            hideHomeCommentCounts();
        }
    }
});

// Could optimise this more
observer.observe(document, { childList: true, subtree: true });
