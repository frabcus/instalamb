console.log('Instalamb: Main loading');

function detectPageCategory() {
    const url = new URL(window.location.href);
    const metaOgType = document.querySelector('meta[property="og:type"]');
    let ogType = "";
    if (metaOgType) {
        ogType = metaOgType.getAttribute('content');
    }
    
    let page;
    if (url.pathname.startsWith('/p/')) {
        page = "post";
    } else if (url.pathname.startsWith('/explore/')) {
        page = "explore";
    } else if (ogType == 'profile') {
        page = 'profile';
    } else {
        page = 'home';
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
            hideProfileCounts();
        }
    }
});

// Could optimise this more
observer.observe(document, { childList: true, subtree: true });
