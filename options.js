console.log('Instalamb: Options loading');

function saveOptions(e) {
    browser.storage.sync.set({
        hideHomeStories: document.querySelector("#hideHomeStories").checked,
        hideHomeSuggestedForYou: document.querySelector("#hideHomeSuggestedForYou").checked,
        hideHomeSuggestedPosts: document.querySelector("#hideHomeSuggestedPosts").checked,
    });
}
  
function restoreOptions() {
    function setCurrentChoice(result) {
        document.querySelector("#hideHomeStories").checked = result.hideHomeStories;
        document.querySelector("#hideHomeSuggestedForYou").checked = result.hideHomeSuggestedForYou;
        document.querySelector("#hideHomeSuggestedPosts").checked = result.hideHomeSuggestedPosts;
    }

    function onError(error) {
        console.log(`Instalamb Settings Error: ${error}`);
    }

    let getting = browser.storage.sync.get({
        "hideHomeStories": true,
        "hideHomeSuggestedForYou": true,
        "hideHomeSuggestedPosts": true
    });
    getting.then(setCurrentChoice, onError);
}

document.addEventListener("DOMContentLoaded", restoreOptions);

var checkboxes = document.querySelectorAll('input[type="checkbox"]');
checkboxes.forEach(function(checkbox) {
    checkbox.addEventListener('click', saveOptions);
});
//document.querySelector("form").addEventListener("submit", saveOptions);