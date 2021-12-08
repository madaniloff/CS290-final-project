//Function to insert new links
function insertNewLink(description, link) {
    var context = {
        description: description,
        link: link
    }

    var newLink = Handlebars.templates.linkTemplate(context)
    var linkContainer = document.getElementsByClassName('contentLinks')
    linkContainer.insertAdjacentHTML('beforeend', newLink)
}



//+++++++++++++++++++++++++++++++++++++++++++++++++++

var postHolder = "";

//+++++++++++++++++++++++++++++++++++++++++++++++++++

// this waits until all elements are loaded into the dom.

function openSuggestionModal(){ // opens suggestion modal
    var backdrop = document.getElementById('backdrop')
    var openSugBox = document.getElementById('suggestion-box')

    openSugBox.classList.remove('hide')
    backdrop.classList.remove('hide')

}


function clearTextBox(){
    document.getElementById('text-area-class').value = ""
}


function closeSuggestionModal(){
    var backdrop2 = document.getElementById('backdrop')
    var openSugBox2 = document.getElementById('suggestion-box')
    clearTextBox()

    openSugBox2.classList.add('hide')
    backdrop2.classList.add('hide')

}
// ADD A POST 
function postSuggestion(){
    var textBox = document.getElementById('text-area-class').value.trim()
    console.log(textBox)

    if (!textBox){
        alert("Please enter text!!!!!")
    }
    else{

        var req = new XMLHttpRequest();
        var url = '/suggestion/add';
        req.open('POST', url);

        var suggestionObj = {
            suggestion: textBox
        }

        var reqBody = JSON.stringify(suggestionObj)

        console.log(reqBody)

        req.addEventListener('load', function(event){
            if(event.target.status === 200){
                var suggestionTemplate = Handlebars.templates.suggestion
                var newSuggestionHTML = suggestionTemplate(suggestionObj)
                var suggestionContainer = document.querySelector('suggestionContent')
                suggestionContainer.insertAdjacentHTML('beforeend', newSuggestionHTML)
            }
            else{
                alert("Error posting suggestion.")
            }
        })

        req.setRequestHeader('Content-Type', 'application/json')
        req.send(reqBody)
    }

    clearTextBox()
    closeSuggestionModal()
}

window.addEventListener('DOMContentLoaded', function(){

    var suggestionButton = document.getElementById('add-suggestion')
    
    if(suggestionButton){
        console.log('clicked')
        suggestionButton.addEventListener('click', openSuggestionModal)

    }

    var cancalButton = document.getElementById('cancal-post')
    if (cancalButton){
        cancalButton.addEventListener('click', closeSuggestionModal)
    }


    var submitSuggest = document.getElementById('submit-post')
    if (submitSuggest){
        submitSuggest.addEventListener('click',postSuggestion)
    }


})