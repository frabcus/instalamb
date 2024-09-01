// Row of circles with stories in at top of home page
function hideHomeStoriesMenu() {
    let found = document.querySelector('[role="menu"]');
    if (!found) {
        return;
    }
    
    const holder = found.parentElement;
    if (!isElementOutTheWay(holder)) {
        shiftElementOutTheWay(holder);
        console.log('Instalamb: Shifted "Stories menu" off screen');
    }
}

// Right sidebar of home page at desktop widths
function hideHomeSuggestedForYou() {
    let found = findElement('span', 'Suggested for you', '@dir="auto"')
    if (!found) {
        return;
    }

    const holder = found.parentElement.parentElement.parentElement
    if (!isElementOutTheWay(holder)) {
        shiftElementOutTheWay(holder);
        console.log('Instalamb: Shifted "Suggested for you" off screen');
    }
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

    // Make articles before the div visible
    // (we match any articles, or an divs with article children because sponsored posts are article children
    // of a div)
    let article = findElement('article');
    let count_before_caught_up = 0;
    while (article && article.matches("article, :has(article)")) {
        // console.log("showing", article);
        if (article.style.display != "") {
            count_before_caught_up++;
            article.style.display = "";
        }
        article = article.nextElementSibling;
    }
    if (count_before_caught_up > 0) {
        console.log(`Instalamb: Shown ${count_before_caught_up} following posts in infinite scroll`);
    }

    // Skip the <div> which contains the "You're all caught up"
    if (article) {
        // console.log("skipping", article);
        article.style.paddingBottom = "10000px";
        article = article.nextElementSibling;
    }

    // Hide articles after the "You've all caught up" div
    let count_after_caught_up = 0;
    while (article && article.matches("article, :has(article)")) {
        // console.log("hiding", article);
        if (article.style.display != "none") {
            count_after_caught_up++;
            article.style.display = "none";
        }
        article = article.nextElementSibling;
    }
    if (count_after_caught_up > 0) {
        console.log(`Instalamb: Hidden ${count_after_caught_up} suggested posts in infinite scroll`);
    }
}