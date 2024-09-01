
// Fully remove whole line "3 likes" - just removing the number is a bit odd looking.
// This is on both the main timeline and at the bottom of post pages.
function hidePostSummaryLikeCounts() {
    const nodes = findAllXPath("//span[text()[contains(., 'likes')]]/span[contains(@class,'html-span')]/ancestor::section[1]");
    let count = 0
    nodes.forEach(node => {
        if (!isElementOutTheWay(node)) {
            shiftElementOutTheWay(node);
            count++;
        }
    });
    if (count > 0) {
        console.log(`Instalamb: Hidden ${count} post like counts`);        
    }
}

// On post comments there are like counts on each comment, e.g. "12 likes"
function hideCommentLikeCounts() {
    //
    const nodes = findAllXPath("//span[contains(., ' like') and string-length(translate(substring-before(., ' like'), '1234567890', '')) = 0]");
    //and string-length(translate(substring-before(., ' '), '1234567890', '')) = 0]");
    let count = 0;
    nodes.forEach(node => {
        //node.style.backgroundColor = 'red';
        if (!isElementOutTheWay(node.parentElement)) {
            shiftElementOutTheWay(node.parentElement);
            count++;
        }
    });
    if (count > 0) {
        console.log(`Instalamb: Hidden ${count} comment like counts`);
    }
}

// Just remove the number (in the html-span) in lines "View all 3 comments"
function hideHomeCommentCounts() {
    const nodes = findAllXPath("//span[contains(text()[1], 'View') and contains(text()[last()], 'comment')]/span[contains(@class,'html-span')]");
    let count = 0;
    nodes.forEach(node => {
        if (!isElementOutTheWay(node)) {
            shiftElementOutTheWay(node);
            count++;
        }
    });
    if (count > 0) {
        console.log(`Instalamb: Hidden ${count} comment counts`);
    }
}

// Removes posts / followers / following counts
function hideProfileCountsDesktop() {
    const nodes = findAllXPath("//a[text()[last()]=' followers']/ancestor::ul");
    let count = 0;
    nodes.forEach(node => {
        if (!isElementOutTheWay(node)) {
            shiftElementOutTheWay(node);
            count++;
        }
    });
    if (count > 0) {
        console.log(`Instalamb: Hidden ${count} desktop profile counts`);
    }
}
function hideProfileCountsMobile() {
    const nodes = findAllXPath("//span[text()[last()]=' followers']/ancestor::ul");
    let count = 0;
    nodes.forEach(node => {
        if (!isElementOutTheWay(node)) {
            shiftElementOutTheWay(node);
            count++;
        }
    });
    if (count > 0) {
        console.log(`Instalamb: Hidden ${count} mobile profile counts`);
    }
}