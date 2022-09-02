
const defaultListTitle = document.getElementById("title").innerHTML;
const defaultImg = "https://images.unsplash.com/photo-1488646953014-85cb44e25828?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1935&q=80";

// Event listener for "Add to List" button
document.querySelector("#input-form").addEventListener("submit", formProcessing);

// Form processing function
function formProcessing(event) {

    let elements = event.target.elements;
    
    // Save form to variables
    let name        = elements["name"].value;
    let location    = elements["location"].value;
    let photo       = elements["photo"].value;
    let description = elements["description"].value;

    // Create new card
    let newCard = cardCreator(name,location,photo,description);
    
    // Post new card
    document.getElementById("list").appendChild(newCard);

    // Update title
    if (document.getElementById("title").innerHTML == defaultListTitle) {
        document.getElementById("title").innerHTML = "My Wish List";
    };

    // Clear form
    let j = 0;
    while ( j < event.target.length) {
        elements[j].value = "";
        j++;
    };

    document.getElementById("list-container").setAttribute("id", "list-container-new");
}



// Card creator function
function cardCreator(destName, destLocation, imgUrl, destDescription) {
    
    // Card div
    let card = document.createElement("div");
    card.setAttribute("class", "card");
    card.setAttribute("style", "background-color: #faf1f1;");
    card.style.height = "fit-content";
    card.style.margin = "15px;";

        // Image
        var img = document.createElement("img");
        img.setAttribute("class", "card-img-top");

        if (imgUrl.length == 0) {
            img.setAttribute("src", defaultImg);
        } 
        else {
            img.setAttribute("src", imgUrl);
        }
        img.setAttribute("alt", destName);

        card.appendChild(img);

        // Card body div
        var cardBody = document.createElement("div");
        cardBody.setAttribute("class", "card-body");

            // Title heading
            var cardTitle = document.createElement("h5");
            cardTitle.setAttribute("class", "card-title");
            cardTitle.innerText = destName;
            cardBody.appendChild(cardTitle);

            // Subtitle heading
            var cardSubtitle = document.createElement("h6");
            cardSubtitle.setAttribute("class", "card-subtitle mb-2 text-muted");
            cardSubtitle.innerText = destLocation;
            cardBody.appendChild(cardSubtitle);

            // Paragraph
            if (destDescription.length !== 0) {
                var cardDesc = document.createElement("p");
                cardDesc.setAttribute("class", "card-text");
                cardDesc.innerText = destDescription;
                cardBody.appendChild(cardDesc);
            }

            // Button div
            var buttonGroup = document.createElement("div");
            buttonGroup.setAttribute("class", "btn-group");
            
                // Buttons
                var deleteIcon = document.createElement("i");
                deleteIcon.setAttribute("class", "fa fa-trash");
                var deleteBtn = document.createElement("button");
                deleteBtn.setAttribute("class", "button btn btn-danger");
                deleteBtn.innerText = "Delete ";
                deleteBtn.addEventListener("click", deleteCard);
                deleteBtn.appendChild(deleteIcon);

                var editIcon = document.createElement("i");
                editIcon.setAttribute("class", "fa fa-pencil");
                var editBtn = document.createElement("button");
                editBtn.setAttribute("class", "button btn btn-warning");
                editBtn.innerText = "Edit ";
                editBtn.addEventListener("click", editCard);
                editBtn.appendChild(editIcon);
            
                buttonGroup.appendChild(editBtn);
                buttonGroup.appendChild(deleteBtn);

            cardBody.appendChild(buttonGroup);

        card.appendChild(cardBody);
  
    return card;
  }

// Edit card function
function editCard(event) {
    // Parent Elements
    let cardBody = event.target.parentElement.parentElement;
    let card = cardBody.parentElement;

    // Elements of card
    let url = card.children[0];
    // Elements of card body
    let title = cardBody.children[0];
    let subTitle = cardBody.children[1];
    let desc = cardBody.children[2];
  
    let newTitle = window.prompt("Enter new name");
    let newSubtitle = window.prompt("Enter new location");
    let newUrl = window.prompt("Enter new photo url");
    let newDesc = window.prompt("Enter new description");
  
    if (newTitle.length > 0) {
      title.innerText = newTitle;
    }
  
    if (newSubtitle.length > 0) {
      subTitle.innerText = newSubtitle;
    }
  
    if (newUrl.length > 0) {
      url.setAttribute("src", newUrl);
    }

    if (newDesc.length > 0) {
        desc.setAttribute("src", newUrl);
    }
}

// Remove card function
function deleteCard(event) {
    event.target.parentElement.parentElement.parentElement.remove();    
}




