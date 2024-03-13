console.log('Instalamb: Background loading');

browser.runtime.onInstalled.addListener(function(details) {
    console.log('Instalamb: First install', details);

    browser.permissions.contains({
        origins: ['https://www.instagram.com/*']
    }).then(function(granted) {
        if (!granted) {
            // Open tab with page for user to give addon permissions
            const url = browser.runtime.getURL("welcome.html");
            browser.tabs.create({ url: url });
        } else {
            console.log('Instalamb: Host permissions already granted');
        }
    });
});