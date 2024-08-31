console.log('Instalamb: Main loading');

function detectPageCategory() {
    const url = new URL(window.location.href);

    // No reliable URL to distinguish this, use the tooltip on the + person button
    const similarAccounts = document.querySelector('svg[aria-label="Similar accounts"]');
    // Similarly on the user's profile page
    const viewArchive = findElement('a', "View archive");
    
    let page;
    if (url.pathname.startsWith('/p/')) {
        page = "post";
    } else if (url.pathname.startsWith('/explore/')) {
        page = "explore";
    } else if (similarAccounts || viewArchive) {
        page = 'profile';
    } else if (url.pathname == '/') {
        page = 'home';
    } else {
        page = 'unknown';
    }
    console.log(`Instalamb: Page type detected "${page}"`);
    return page;
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
        "hideNavExplore": true,
        "hideNavReels": true,
        "hideNavMessages": false,
        "hideNavNotifications": true,
        "hideNavCreate": false,
        "hideNavProfile": false,
        "hideNavThreads": true,
        "hideNavMore": false,

        "hideMetricsLikes": true,
        "hideMetricsCommentCounts": true,
        "hideMetricsProfileCounts" : true
    }));

    // Alway hide the "use the app"
    hideUseTheApp();

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

    if (pageCategory == 'post') {
        if (settings.hideMetricsLikes) {
            hidePostSummaryLikeCounts();
            hideCommentLikeCounts();
        }
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
            hidePostSummaryLikeCounts();
        }
        if (settings.hideMetricsCommentCounts) {
            hideHomeCommentCounts();
        }
    } else if (pageCategory == 'profile') {
        if (settings.hideMetricsProfileCounts) {
            hideProfileCountsDesktop();
            hideProfileCountsMobile();
        }
    }
});

// Could optimise this more
observer.observe(document, { childList: true, subtree: true });
