
save = function(e){
    settingStorage.save(e)
    changeContentScript();
}

restore = function(){
    settingStorage.restore();
    
}

const settingStorage = storage();
document.addEventListener("DOMContentLoaded", restore);
document.querySelector("form").addEventListener("submit", save);

function storage(){

    function save(e) {
        e.preventDefault();

        browser.storage.sync.set({
            settings: {
                template: document.getElementById('template').value,
                matchField: document.getElementById('matchField').value
            }
        });
    }

    function restore() {
        function set(result) {
            Object.keys(result.settings).forEach(key =>{
                document.getElementById(key).value = result.settings[key];
            });            

            register(result.settings.matchField);
        }

        function onError(error) {
            console.log(`Error: ${error}`);
        }

        let settings = browser.storage.sync.get("settings");
        settings.then(set, onError);
    }

    return {
        save,
        restore
    }

}

function changeContentScript(){
    browser.permissions.request({
        origins: ['https://git.acclabs.com.br/*']
    }, granted => {
        if (granted) {
            register(document.getElementById('matchField').value);
        }
    });
}


async function register(url) {
    registered = await browser.contentScripts.register({
        matches: [url],
        js: [{ file: 'extension.js' }]
    });

}


