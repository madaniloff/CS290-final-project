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
