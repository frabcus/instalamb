
// Fully remove whole line "3 likes" - just removing the number is a bit odd looking
function hidePostLikeCounts() {
    const nodes = findAllXPath("//span[text()[contains(., 'likes')]]/span[contains(@class,'html-span')]/ancestor::section[1]");
    nodes.forEach(node => {
        shiftElementOutTheWay(node);
    });
    console.log(`Instalamb: Hidden ${nodes.length} like counts`);
}

// Just remove the number (in the html-span) in lines "View all 3 comments"
function hideHomeCommentCounts() {
    const nodes = findAllXPath("//span[contains(text()[1], 'View') and contains(text()[last()], 'comment')]/span[contains(@class,'html-span')]");
    nodes.forEach(node => {
        shiftElementOutTheWay(node);
    });
    console.log(`Instalamb: Hidden ${nodes.length} comment counts`);
}

// Removes posts / followers / following counts
function hideProfileCounts() {
    const nodes = findAllXPath("//a[text()[last()]=' followers']/ancestor::ul");
    nodes.forEach(node => {
        shiftElementOutTheWay(node);
    });
    console.log(`Instalamb: Hidden ${nodes.length} profile counts`);
}