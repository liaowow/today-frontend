    /***** GLOBAL VARIABLES *****/
let allUserEntries;

    /***** DOM ELEMENTS *****/
const modalContainer = document.querySelector(".modal-content")
const mainPageDiv2 = document.querySelector(".container-fluid");
    
    /***** EVENT LISTENERS *****/
mainPageDiv2.addEventListener("click", handleEntryCard)
mainPageDiv2.addEventListener("click", handleMoodButton)
modalContainer.addEventListener("click", handleEditEntry)
modalContainer.addEventListener("click", handleDeleteEntry)

    /***** EVENT HANDLERS *****/
function handleEntryCard(event) {
    if (event.target.id === "view-entry-btn") {
        let clickedEntryCard = event.target.closest("div");
        let clickedEntryID = parseInt(clickedEntryCard.id);
        let clickedEntry = allUserEntries.find( entry => entry.id === clickedEntryID );

        modalContainer.innerHTML = `
        <div class="modal-header">
        <h5 class="modal-title" id="exampleModalLongTitle">${clickedEntry.title}</h5>
        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
            <span aria-hidden="true">&times;</span>
        </button>
        </div>
        <div class="modal-body">
            <img class="card-img-top" src=${clickedEntry.image}>
            <br><br>
            <h5>Mood: <strong>${clickedEntry.current_mood}</strong></h5>
            <p>${clickedEntry.content}</p>
            <a href="${clickedEntry.song}" target=_blank>Song of My Day</a>
        </div>
        <div class="modal-footer">
            <div id="${clickedEntry.id}" style="display: none;"></div>
            <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
            <button type="button" id="edit-entry-btn" class="btn btn-primary">Edit Entry</button>
            <button type="button" id="delete-entry-btn" class="btn btn-danger" data-dismiss="modal">Delete Entry</button>
        </div>
        `


    }
}

function handleEditEntry(event) {

    if (event.target.id === "edit-entry-btn") {
        let clickedEntryID = parseInt(event.target.closest("div").querySelector("div").id);
        let clickedEntry = allUserEntries.find( entry => entry.id === clickedEntryID );
    
        modalContainer.innerHTML = `
        <div class="modal-header">
        <h5 class="modal-title" id="exampleModalLongTitle">Edit Entry</h5>
        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
            <span aria-hidden="true">&times;</span>
        </button>
        </div>
        <div class="modal-body">
            <form id="edit-entry-form">
                <label for="title">Title:</label><br>
                <input type="text" name="title" value="${clickedEntry.title}"><br>
                <label for="image">Image:</label><br>
                <input type="text" name="image" value="${clickedEntry.image}"><br>
                <label for="content">Content:</label><br>
                <textarea name="content" cols="50" rows="10">${clickedEntry.content}</textarea><br>
                <label for="song">Song:</label><br>
                <input type="text" name="song" value="${clickedEntry.song}"><br><br>
                <input type="submit" class="btn btn-primary" value="Save Entry">
            </form>
        </div>
        <div class="modal-footer">
        <div id="${clickedEntry.id}" style="display: none;"></div>
            <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>

        </div>
        `

        const editEntryForm = document.querySelector("#edit-entry-form")
        editEntryForm.addEventListener("submit", (e) => handleEditFormSubmit(e, clickedEntry))
    }
}

function handleEditFormSubmit(e, clickedEntry) {
    e.preventDefault();

    const updatedTitle = e.target["title"].value;
    const updatedImage = e.target["image"].value;
    const updatedContent = e.target["content"].value;
    const updatedSong = e.target["song"].value;
    // const updatedMood = e.target["mood"].value;

    const updatedEntryObj = {
        title: updatedTitle,
        image: updatedImage,
        content: updatedContent,
        current_mood: clickedEntry.current_mood,
        song: updatedSong,
        mood_id: clickedEntry.mood_id
    }

    patchUpdatedEntryFetch(updatedEntryObj, clickedEntry);

}

function handleDeleteEntry(event) {
    if (event.target.id === "delete-entry-btn") {
        let clickedEntryID = parseInt(event.target.closest("div").querySelector("div").id);
        let clickedEntry = allUserEntries.find( entry => entry.id === clickedEntryID );
        
        deleteEntryFetch(clickedEntry);
    }
}

function handleMoodButton(event) {
    const happyBtn = document.querySelector("#happy-button")
    const sadBtn = document.querySelector("#sad-button")
    const angryBtn = document.querySelector("#angry-button")
    const calmBtn = document.querySelector("#calm-button")
    let moodBtnArray = [happyBtn, sadBtn, angryBtn, calmBtn];

    switch(event.target.id) {
        case "happy-button":
            happyBtn.className = "btn btn-secondary";
            moodBtnArray.slice(1).forEach( btn => btn.className = "btn btn-primary");
            renderHappyMoodSelect();
            break;
        case "sad-button":
            sadBtn.className = "btn btn-secondary";
            (moodBtnArray.slice(0,1).concat(moodBtnArray.slice(2))).forEach( btn => btn.className = "btn btn-primary");
            renderSadMoodSelect();
            break;
        case "angry-button":
            angryBtn.className = "btn btn-secondary";
            (moodBtnArray.slice(0,2).concat(moodBtnArray.slice(3))).forEach( btn => btn.className = "btn btn-primary");
            renderAngryMoodSelect();
            break;
        case "calm-button":
            calmBtn.className = "btn btn-secondary";
            moodBtnArray.slice(0,3).forEach( btn => btn.className = "btn btn-primary");
            renderCalmMoodSelect();
            break;
    }
};

function handleCreateEntry(event) {
    event.preventDefault();

    let newEntryTitle = event.target["title"].value;
    let newEntryImage = event.target["image"].value;
    let newEntryCurrentMood = event.target["currentMood"].value;
    let newEntryContent = event.target["content"].value;
    let newEntrySong = event.target["song"].value;

    let newEntryMoodID = extractMoodID(newEntryCurrentMood);

    let currentUserID = JSON.parse(localStorage.currentUser).id;

    const newEntryObj = {
        title: newEntryTitle,
        content: newEntryContent,
        current_mood: newEntryCurrentMood,
        image: newEntryImage,
        song: newEntrySong,
        user_id: currentUserID,
        mood_id: newEntryMoodID
    };

    postNewEntryFetch(newEntryObj);
};

    /***** RENDER FUNCTIONS *****/
// renders the form to create a new entry
function renderEntryForm() {
    currentUser = JSON.parse(localStorage.currentUser);

    mainPageWrapper.className = ""
    mainPageDiv.innerHTML = `
    <h1>Create a New Entry, ${currentUser.first_name ? currentUser.first_name : "friend"}:</h1><br>
    <form id="create-entry-form">
        <label for="title">Give your entry a title:</label><br>
        <input type="text" name="title"><br><br>
        <label for="image">Give it an image (Please enter an URL):</label><br>
        <input type="text" name="image"><br><br>
        <label for="moodCategory">How do you feel today?<br>
        <em>(Please select a category:)</em></label><br>
            <button type="button" id="happy-button" class="btn btn-primary">
            Happy
            </button>
            <button type="button" id="sad-button" class="btn btn-primary">
            Sad
            </button>
            <button type="button" id="angry-button" class="btn btn-primary">
            Angry
            </button>
            <button type="button" id="calm-button" class="btn btn-primary">
            Calm
            </button>
            <br><br>
        <label for="currentMood"><em>(...then select a mood from the dropdown menu that best describes your feelings today:)</em></label>
        <br>
        <select name="currentMood" id="select-mood" class="select-css">
            <option>Pick a word or emoji</option>
            <option>Happy</option>
            <option>Excited</option>
            <option>Great</option>
            <option>Upbeat</option>
            <option>Euphoric</option>
            <option>😀</option>
            <option>🥳</option>
            <option>🤪</option>
        </select><br><br>
        <label for="content">Write down anything you want:</label><br>
        <textarea name="content" cols="50" rows="10"></textarea><br><br>
        <label for="song">Add a song URL to sum up your day:</label><br>
        <input type="text" name="song"><br><br>
        <input type="submit" class="btn btn-primary" value="Submit Entry"><br><br>
    </form>
    `
    const createEntryForm = document.querySelector("#create-entry-form");
    createEntryForm.addEventListener("submit", handleCreateEntry);

}

// render all user entries
function renderAllEntriesForUser(allUserEntries) {
    mainPageDiv.innerHTML = `
    <h1 style="text-align: center;">Your Entries</h1>
    <br>
    <div class="card-columns"></div>
    `
    allUserEntries.forEach(entry => renderOneEntry(entry))
}

// render one entry
function renderOneEntry(entry) {
    // let currentEntry = entry;
    const entryCard = document.createElement("div")
    entryCard.className = "card"
    entryCard.style = "width: 18rem;"
    entryCard.innerHTML = `
    <img src="${entry.image}" class="card-img-top" alt="...">
    <div class="card-body" id=${entry.id}>
        <h5 class="card-title">${entry.title}</h5>
        <p class="card-text">${entry.content.substring(0, 150)}</p>
        <!-- Button trigger modal -->
        <button type="button" id="view-entry-btn" class="btn btn-primary" data-toggle="modal" data-target="#exampleModalLong">
        View Full Entry
        </button>
    </div>
    `

    const cardColumns = document.querySelector(".card-columns")
    cardColumns.append(entryCard)
};

// functions to render different select dropdowns based off of which mood button was clicked
function renderHappyMoodSelect() {
    const selectMood = document.querySelector("#select-mood")
    selectMood.innerHTML = `
    <option>Pick a word or emoji</option>
    <option>Happy</option>
    <option>Excited</option>
    <option>Great</option>
    <option>Upbeat</option>
    <option>Euphoric</option>
    <option>😀</option>
    <option>🥳</option>
    <option>🤪</option>
    `
};
function renderSadMoodSelect() {
    const selectMood = document.querySelector("#select-mood")
    selectMood.innerHTML = `
    <option>Pick a word or emoji</option>
    <option>Sad</option>
    <option>Somber</option>
    <option>Melancholic</option>
    <option>Deflated</option>
    <option>Lugubrious</option>
    <option>😔</option>
    <option>😭</option>
    <option>😫</option>
    `
};
function renderAngryMoodSelect() {
    const selectMood = document.querySelector("#select-mood")
    selectMood.innerHTML = `
    <option>Pick a word or emoji</option>
    <option>Angry</option>
    <option>Furious</option>
    <option>Bitter</option>
    <option>Resentful</option>
    <option>Irritated</option>
    <option>😡</option>
    <option>🤬</option>
    <option>😤</option>
    `
};
function renderCalmMoodSelect() {
    const selectMood = document.querySelector("#select-mood")
    selectMood.innerHTML = `
    <option>Pick a word or emoji</option>
    <option>Calm</option>
    <option>Peaceful</option>
    <option>Pensive</option>
    <option>Neutral</option>
    <option>Chill</option>
    <option>🧘‍♂️</option>
    <option>😎</option>
    <option>😶</option>
    `
};

    /***** MISC. FUNCTIONS *****/

// finds the mood_id of the mood object associated with the currentMood in a created/updated entry
function extractMoodID(currentMood) {
    let foundMood;

    allMoods.forEach( mood => {
        let moodWords = mood.words.split(",");
        let moodEmojis = mood.emojis.split(",");
    
        if (moodWords.includes(currentMood)) {
        foundMood = mood;
        } else if (moodEmojis.includes(currentMood)) {
        foundMood = mood;
        };
    })
    return foundMood.id;
};






// EDIT MOOD CODE
{/* <label for="mood">Mood:</label><br>
                <button type="button" id="happy-button" class="btn btn-primary">
                Happy
                </button>
                <button type="button" id="sad-button" class="btn btn-primary">
                Sad
                </button>
                <button type="button" id="angry-button" class="btn btn-primary">
                Angry
                </button>
                <button type="button" id="calm-button" class="btn btn-primary">
                Calm
                </button>
                <br><br>
                <select name="currentMood" id="select-mood" class="select-css" value="${clickedEntry.current_mood}">
                    <option>Pick a word or emoji</option>
                    <option>Happy</option>
                    <option>Excited</option>
                    <option>Great</option>
                    <option>Upbeat</option>
                    <option>Euphoric</option>
                    <option>😀</option>
                    <option>🥳</option>
                    <option>🤪</option>
                </select><br></br> */}