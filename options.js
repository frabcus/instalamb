console.log('Instalamb: Options loading');

var sync = ((typeof browser == 'undefined') ? chrome : browser).storage.sync;

function saveOptions(e) {
    sync.set({
        hideHomeStories: document.querySelector("#hideHomeStories").checked,
        hideHomeSuggestedForYou: document.querySelector("#hideHomeSuggestedForYou").checked,
        hideHomeSuggestedPosts: document.querySelector("#hideHomeSuggestedPosts").checked,

        hideNavHome: document.querySelector("#hideNavHome").checked,
        hideNavSearch: document.querySelector("#hideNavSearch").checked,
        hideNavExplore: document.querySelector("#hideNavExplore").checked,
        hideNavReels: document.querySelector("#hideNavReels").checked,
        hideNavMessages: document.querySelector("#hideNavMessages").checked,
        hideNavNotifications: document.querySelector("#hideNavNotifications").checked,
        hideNavCreate: document.querySelector("#hideNavCreate").checked,
        hideNavProfile: document.querySelector("#hideNavProfile").checked,
        hideNavThreads: document.querySelector("#hideNavThreads").checked,
        hideNavMore: document.querySelector("#hideNavMore").checked,
    });
}
  
function restoreOptions() {
    function setCurrentChoice(result) {
        document.querySelector("#hideHomeStories").checked = result.hideHomeStories;
        document.querySelector("#hideHomeSuggestedForYou").checked = result.hideHomeSuggestedForYou;
        document.querySelector("#hideHomeSuggestedPosts").checked = result.hideHomeSuggestedPosts;

        document.querySelector("#hideNavHome").checked = result.hideNavHome;
        document.querySelector("#hideNavSearch").checked = result.hideNavSearch;
        document.querySelector("#hideNavExplore").checked = result.hideNavExplore;
        document.querySelector("#hideNavReels").checked = result.hideNavReels;
        document.querySelector("#hideNavMessages").checked = result.hideNavMessages;
        document.querySelector("#hideNavNotifications").checked = result.hideNavNotifications;
        document.querySelector("#hideNavCreate").checked = result.hideNavCreate;
        document.querySelector("#hideNavProfile").checked = result.hideNavProfile;
        document.querySelector("#hideNavThreads").checked = result.hideNavThreads;
        document.querySelector("#hideNavMore").checked = result.hideNavMore;
    }

    function onError(error) {
        console.log(`Instalamb: Settings error - ${error}`);
    }

    let getting = sync.get({
        "hideHomeStories": true,
        "hideHomeSuggestedForYou": true,
        "hideHomeSuggestedPosts": true,

        "hideNavHome": false,
        "hideNavSearch": false,
        "hideNavExplore": false,
        "hideNavReels": false,
        "hideNavMessages": false,
        "hideNavNotifications": false,
        "hideNavCreate": false,
        "hideNavProfile": false,
        "hideNavThreads": false,
        "hideNavMore": false,
    });
    getting.then(setCurrentChoice, onError);
}

document.addEventListener("DOMContentLoaded", restoreOptions);

let checkboxes = document.querySelectorAll('input[type="checkbox"]');
checkboxes.forEach(function(checkbox) {
    checkbox.addEventListener('click', saveOptions);
});

