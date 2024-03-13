console.log('Instalamb: Welcome loading');

function askHostPermissions() {
    browser.permissions.request({
        origins: ['https://www.instagram.com/*']
    }).then(function(granted) {
        if (granted) {
            console.log('Instalamb: Host permissions granted');
            window.location.href = "https://www.instagram.com/";
        } else {
            console.log('Instalamb: Host permissions not granted');
        }
    });
}

const button = document.getElementById("permissions-button");
button.addEventListener("click", askHostPermissions);
