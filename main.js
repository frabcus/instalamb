console.log("Instalamb: Loading");

function hideSuggestionsForYou() {
    var found = findSpanByText("Suggestions for you");
    if (!found) {
        return;
    }

    const holder = found.parentElement.parentElement.parentElement.parentElement
    shiftElemenOutTheWay(holder);
    console.log("Instalamb: Shifted 'Suggestions for you' off screen");
}

function hideSuggestedForYou() {
    var found = findSpanByText("Suggested for you");
    if (!found) {
        return;
    }

    const holder = found.parentElement.parentElement.parentElement.parentElement.parentElement.parentElement
    shiftElemenOutTheWay(holder);
    console.log("Instalamb: Shifted 'Suggested for you' off screen");
}

// This doesn't work as DOM mutates with scrolling - maybe intercept API responses??
function hideSuggestedPosts() {
    var found = findSpanByText("Suggested Posts");
    if (!found) {
        return;
    }

    // Not really happy about counting up the parents like this, feels like will be flaky.
    // There isn't much else to go on in the DOM - could we match against styles?
    let nextArticle = found.parentElement.parentElement.parentElement.parentElement.nextElementSibling;
    while (nextArticle) {
        console.log("nextArticle", nextArticle);
        if (nextArticle.tagName == "ARTICLE") {
            nextArticle.style.border = "5px solid red";
            nextArticle.style.display = "none";
        }
        nextArticle = nextArticle.nextElementSibling;
    }
}

function hideStoriesMenu() {
    var found = document.querySelector('[role="menu"]');
    if (!found) {
        return;
    }
    
    const holder = found.parentElement.parentElement.parentElement;
    shiftElemenOutTheWay(holder);
    console.log("Instalamb: Shifted 'Stories menu' off screen");
}

const observer = new MutationObserver(mutations => {
    const pageCategory = detectPageCategory();
    console.log("Instalamb: Page is", pageCategory);

    if (pageCategory == "user") {
    } else if (pageCategory == "home") {
        hideStoriesMenu();
        hideSuggestionsForYou();
        hideSuggestedForYou();
    }
});

// Could optimise this more
observer.observe(document, { childList: true, subtree: true });
