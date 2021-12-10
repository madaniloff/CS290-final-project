window.addEventListener('DOMContentLoaded', function() {
    var suggestionButton = document.getElementById('add-suggestion')
    
    if(suggestionButton)
        suggestionButton.addEventListener('click', openSuggestionModal)

    var cancelButton = document.getElementById('cancel-post')

    if (cancelButton)
        cancelButton.addEventListener('click', closeSuggestionModal)

    var submitButton = document.getElementById('submit-post')
    
    if (submitButton)
        submitButton.addEventListener('click', addPost)
})

function openSuggestionModal() {
    var backdrop = document.getElementById('backdrop')
    var openSugBox = document.getElementById('suggestion-box')

    openSugBox.classList.remove('hide')
    backdrop.classList.remove('hide')
}

function closeSuggestionModal() {
    var backdrop = document.getElementById('backdrop')
    var openSugBox = document.getElementById('suggestion-box')
    clearTextBox()

    openSugBox.classList.add('hide')
    backdrop.classList.add('hide')
}

function clearTextBox() {
    var textboxes = document.getElementsByClassName('suggestion-input')
    
    for (let i = 0; i < textboxes.length; i++) {
        textboxes[i].value = ""
    }
}

function addPost() {
    var textboxes = document.getElementsByClassName('suggestion-input')
    var title = textboxes[0].value.trim()
    var textBox = textboxes[1].value.trim()

    if (!textBox || !title)
        alert("Please enter text in all fields.")
    else {
        var pagePath = window.location.pathname
        var pageType = pagePath.substring(1)
        var req = new XMLHttpRequest();
        var url = '/suggestion/add';
        req.open('POST', url);

        var suggestionObj = {
            type: pageType,
            link: title,
            description: title,
            content: textBox
        }

        var reqBody = JSON.stringify(suggestionObj)

        req.addEventListener('load', function(event) {
            if (event.target.status === 200)
                location.reload()
            else
                alert("Error posting suggestion.")
        })

        req.setRequestHeader('Content-Type', 'application/json')
        req.send(reqBody)
    }

    clearTextBox()
    closeSuggestionModal()
}