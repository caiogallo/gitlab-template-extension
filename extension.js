
html().addTemplateItem()

function html(){
    function addTemplateItem(){
        const issueDescription = document.getElementById('issue_description');
        const ulList = document.getElementsByClassName('nav nav-tabs nav-links clearfix');

        onClickTemplateAction = function () {
            storage().restore(issueDescription, 'template')
        }    

        let lastChild = ulList[0].children[2];
        ulList[0].removeChild(lastChild)
        
        let newListItem = document.createElement('li');
        newListItem.onclick = onClickTemplateAction;
        newListItem.appendChild(document.createTextNode('Template'))
        ulList[0].appendChild(newListItem)
        ulList[0].appendChild(lastChild)
    }

    return {
        addTemplateItem
    }
    
}

function storage() {
    function restore(field, storageKey) {
        function set(result) {
            field.value = result.settings[storageKey];
        }

        function onError(error) {
            console.log(`Error: ${error}`);
        }

        let settings = browser.storage.sync.get("settings");
        settings.then(set, onError);
    }

    return{
        restore
    }
}

