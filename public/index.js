window.addEventListener("DOMContentLoaded", function() {
    var suggestionButton = document.getElementById("add-suggestion");
    
    if(suggestionButton)
        suggestionButton.addEventListener("click", openSuggestionModal);

    var cancelButton = document.getElementById("cancel-post");

    if (cancelButton)
        cancelButton.addEventListener("click", closeSuggestionModal);

    var submitButton = document.getElementById("submit-post");

    if (submitButton)
        submitButton.addEventListener("click", addPost);

    var input = document.getElementById("search-bar");

    input.addEventListener("search", search);
})

function search() {
    var input = document.getElementById("search-bar");
    var url = "/search/" + input.value;

    if (url != "/search/")
        location.assign(url);
}

function openSuggestionModal() {
    var backdrop = document.getElementById("backdrop")
    var openSugBox = document.getElementById("suggestion-box")

    openSugBox.classList.remove("hide")
    backdrop.classList.remove("hide")
}

function closeSuggestionModal() {
    var backdrop = document.getElementById("backdrop")
    var openSugBox = document.getElementById("suggestion-box")
    clearTextBox()

    openSugBox.classList.add("hide")
    backdrop.classList.add("hide")
}

function clearTextBox() {
    var textboxes = document.getElementsByClassName("suggestion-input")
    
    for (let i = 0; i < textboxes.length; i++) {
        textboxes[i].value = ""
    }
}

function addPost() {
    var currentSuggestions = document.getElementsByClassName("current-suggestions")
    var textboxes = document.getElementsByClassName("suggestion-input")
    var title = textboxes[0].value.trim().toLowerCase()
    var content = textboxes[1].value.trim()

    if (!title || !content)
        alert("Please enter text in all fields.")
    else {
        var pagePath = window.location.pathname
        var pageType = pagePath.substring(1)
        var req = new XMLHttpRequest();
        var url = "/" + pageType + "/add";
        req.open("POST", url);

        for (let i = 0; i < currentSuggestions.length; i++)
            if (currentSuggestions[i].textContent == title)
                var duplicate = true;
        
        if (!duplicate) {
            var suggestionObj = {
                type: pageType,
                title: title,
                link: title,
                content: content
            }
    
            var reqBody = JSON.stringify(suggestionObj)
    
            req.addEventListener("load", function(event) {
                if (event.target.status === 200)
                    location.reload()
                else
                    alert("Error posting suggestion.")
            })
    
            req.setRequestHeader("Content-Type", "application/json")
            req.send(reqBody)
        
            clearTextBox()
            closeSuggestionModal()
        }
        else
            alert("A suggestion with that name already exists.")
    }
}