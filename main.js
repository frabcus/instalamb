console.log("hello lamb");
document.body.style.border = "5px solid green";

function findElementByText(text) {
    var found;
    for (const s of document.querySelectorAll("span")) {
      if (s.textContent.includes("Suggestions for you")) {
        found = s;
      }
    }
    return found;
}

// This doesn't work as DOM mutates with scrolling - maybe intercept API responses??
function hideSuggestedPosts() {
    var found = findElementByText("Suggested Posts");
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

function hideSuggestionsForYou() {
    var found = findElementByText("Suggestions for you");
    if (!found) {
        return;
    }

    let holder = found.parentElement.parentElement.parentElement.parentElement
    holder.style.position = "absolute";
    holder.style.top = "-9999px";
    holder.style.left = "-9999px";
    console.log("Instalamb: Shifted 'Suggestions for you' off screen");
}


const observer = new MutationObserver(mutations => {
    console.log("in the observer");
    hideSuggestionsForYou();
});

// Could optimise this more
observer.observe(document, { childList: true, subtree: true });
