function _hideExploreType(type) {
    let found = document.querySelectorAll(`div > svg[aria-label="${type}"]`)
    if (found.length === 0) {
        return;
      }
    
    let count = 0
    found.forEach(reelSvg => {
        const holder = reelSvg.parentElement.parentElement.parentElement.parentElement;
        if (!holder.style.display != "none") {
            holder.style.display = "none";
            count++;
        }
    });
    
    if (count > 0) {        
        console.log(`Instalamb: Hid ${count} "${type}" elements`);
    }
}


function hideExploreReels() {
    _hideExploreType("Reel");
}

function hideExploreCarousels() {
    _hideExploreType("Carousel");
}

// There are also individual photos, but there isn't a nice aria-type to catch them by
