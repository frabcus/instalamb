function _hideExploreType(type) {
    let found = document.querySelectorAll(`div > svg[aria-label="${type}"]`)
    if (found.length === 0) {
        return;
      }
    
    found.forEach(reelSvg => {
        const holder = reelSvg.parentElement.parentElement.parentElement.parentElement;
        holder.style.display = "none";
    });
      
    console.log(`Instalamb: Shifted ${found.length} "${type}" elements off screen`);
}


function hideExploreReels() {
    _hideExploreType("Reel")
}

function hideExploreCarousels() {
    _hideExploreType("Carousel")
}

// There are also individual photos, but there isn't a nice aria-type to catch them by
