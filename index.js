    /***** GLOBAL VARIABLES *****/

let currentUser;
let allMoods;

    /***** DOM ELEMENTS *****/

const sidebarDiv = document.querySelector("#sidebar-wrapper");
const mainPageDiv = document.querySelector(".container-fluid");
const mainPageWrapper = document.querySelector("#page-content-wrapper")

    /***** EVENT LISTENERS *****/

sidebarDiv.addEventListener("click", handleSidebarClick)


    /***** EVENT HANDLERS *****/

// handles clicking a link in the sidebar
function handleSidebarClick(event) {
    switch(event.target.id) {
        case "create-entry":
            mainPageDiv.className = "center-form";
            renderEntryForm();
            break;
        case "entries":
            mainPageWrapper.className = "";
            mainPageDiv.className = "center-form";
            getAllEntriesForUser();
            break;
        case "moods":
            mainPageDiv.className = "center-form";
            renderMoodData();
            break;
        case "my-account":
            mainPageDiv.className = "center-form";
            renderAccountInfo();
            break;
        case "log-out":
            localStorage.currentUser = "";
            allUserEntries = [];
            renderSidebar();
            checkLoggedInUser();
            break;
    };
};

// handles submitting the log in form
function handleLogInFormSubmit(event) {
    event.preventDefault();

    loggedInUsername = event.target["username"].value;
    getLoggedInUserFetch(loggedInUsername)
};

// handles submitting the form to create a user
function handleCreateUserformSubmit(event) {
    event.preventDefault();

    const newUserUsername = event.target["username"].value
    const newUserFirstName = event.target["firstName"].value
    const newUserLocation = event.target["location"].value
    const newUserProfilePic = event.target["profilePic"].value

    const newUserObj = {
        username: newUserUsername,
        first_name: newUserFirstName,
        location: newUserLocation,
        profile_pic: newUserProfilePic
    }

    postNewUserFetch(newUserObj);
};

// handles clicking the edit account button
function handleEditAccountBtn(event) {
    renderEditAccountForm();
};

// handles submitting the edit account form
function handleEditAccountFormSubmit(event) {
    event.preventDefault();

    const updateUserUsername = event.target["username"].value;
    const updateUserFirstName = event.target["firstName"].value;
    const updateUserLocation = event.target["location"].value;
    const updateUserProfilePic = event.target["profilePic"].value;

    const updatedUserObj = {
        username: updateUserUsername,
        first_name: updateUserFirstName,
        location: updateUserLocation,
        profile_pic: updateUserProfilePic
    };
    patchUpdatedUserInfo(updatedUserObj);
};

// handles clicking the delete account button
function handleDeleteAccountBtn(event) {
    deleteUserAccountFetch();
    localStorage.currentUser = "";
    renderSidebar();
    checkLoggedInUser();
};

    /***** RENDER FUNCTIONS *****/

// renders sidebar dynamically based on if a user is logged in
function renderSidebar() {
    if (localStorage.currentUser === "") {
    sidebarDiv.innerHTML = `
    <div class="sidebar-heading">
        <h1 class="logo-animation-happy"><strong>TODAY</strong>  <canvas width="30" height="30"></canvas></h1>
        <div id="clock-div"></div>
    </div>
    <div class="list-group list-group-flush">
            <p class="list-group-item list-group-item-action bg-light">Welcome to <strong>TODAY</strong>, an intimate daily journal app.<br><br>
            Here you can track your daily thoughts, moods, and so much more!</p>
            <p class="sidebar-footer">Made with ❤️in NYC<br>
            by <a href="https://annieliao.com" target=_blank>Annie</a> & <a href="https://github.com/SeanWelshBrown" target=_blank>Sean</a> © 2020
            </p>
    </div>` 
    } else {
        sidebarDiv.innerHTML = `
        <div class="sidebar-heading">
            <h1 class="logo-animation-happy"><strong>TODAY</strong>  <canvas width="30" height="30"></canvas></h1>
            
            <div id="clock-div"></div>
        </div>
        <div class="list-group list-group-flush">
            <a href="#" class="list-group-item list-group-item-action bg-light" id="create-entry">Create Entry</a>
            <a href="#" class="list-group-item list-group-item-action bg-light" id="entries">Entries</a>
            <a href="#" class="list-group-item list-group-item-action bg-light" id="moods">Moods</a>
            <a href="#" class="list-group-item list-group-item-action bg-light" id="my-account">My Account</a>
            <a href="#" class="list-group-item list-group-item-action bg-light" id="log-out">Log Out</a>
            <p class="sidebar-footer">Made with ❤️in NYC<br>
            by <a href="https://annieliao.com" target=_blank>Annie</a> & <a href="https://github.com/SeanWelshBrown" target=_blank>Sean</a> © 2020
            </p>
        </div>`
    };
};

// renders the log-in page
function renderLogIn() {
    mainPageWrapper.className = "animate-background"
    mainPageDiv.className = "center-form"
    mainPageDiv.innerHTML = `
    <h1 style="color:#19438B;">Welcome Back, Friend.</h1>
    <br>
    <h3 style="color:#19438B;">Enter Your Username:</h3>
    <form id="log-in-form">
        
        <input type="text" id="log-in-username" class="rounded-box" name="username"><br><br>
        <input type="submit" class="btn btn-primary" value="Log In">
    </form>
    <br>
    <h5 style="color:#19438B;">Don't have an account?<br> <a href="javascript:;" onclick="renderCreateAccount();">Click here</a> to create one!</h5>
    `
    const logInForm = document.querySelector("#log-in-form");
    logInForm.addEventListener("submit", handleLogInFormSubmit);
};

// renders the create account page
function renderCreateAccount() {
    mainPageDiv.className = "center-form"
    mainPageDiv.innerHTML = `
    <h1 style="color:#19438B;">Create Account</h1>
    <br>
    <form id="create-account-form">
        <label for="username" style="color:#19438B;"><b>Username:</b></label><br>
        <input type="text" name="username" class="rounded-box"><br><br>
        <label for="firstName" style="color:#19438B;"><b>First Name:</b></label><br>
        <input type="text" name="firstName" class="rounded-box"><br><br>
        <label for="location" style="color:#19438B;"><b>Location (city):</b></label><br>
        <input type="text" name="location" class="rounded-box"><br><br>
        <label for="profilePic" style="color:#19438B;"><b>Profile Picture (url):</b></label><br>
        <input type="text" name="profilePic" class="rounded-box" placeholder="Optional..."><br><br>
        <input type="submit" class="btn btn-primary" value="Create Account"><br>
    </form>
    <br>
    <h5>Already have an account?<br> <a href="javascript:;" onclick="renderLogIn();">Click here</a> to log in!</h5>
    `
    const createUserForm = document.querySelector("#create-account-form");
    createUserForm.addEventListener("submit", handleCreateUserformSubmit);
};



// renders the currentUser's account information
function renderAccountInfo() {
    currentUser = JSON.parse(localStorage.currentUser);
    mainPageWrapper.className = ""
    mainPageDiv.innerHTML = `
    <h1>Account Information</h1>
    <br>
    <img class="profile-picture" src="${currentUser.profile_pic}" style="border-radius: 50%;">
    <br><br>

    <div class="card-deck">
        <div class="card bg-light mb-5" style="max-width: 200px;">
        <div class="card-header"><strong>First Name</strong></div>
        <div class="card-body">
            <h3>${currentUser.first_name}</h3>
        </div>
        </div>

        <div class="card bg-light mb-5" style="max-width: 200px;">
        <div class="card-header"><strong>Username</strong></div>
        <div class="card-body">
            <h3>${currentUser.username}</h3>
        </div>
        </div>

        <div class="card bg-light mb-5" style="max-width: 200px;">
        <div class="card-header"><strong>Location</strong></div>
        <div class="card-body">
            <h3>${currentUser.location}</h3>
        </div>
        </div>
    </div>
    <button type="button" class="btn btn-primary" id="edit-user-btn">Edit Account Info</button>
    <button type="button" class="btn btn-danger" id="delete-user-btn">Delete Account</button>
    <br><br><br><br>
    `

    const editAccountButton = document.querySelector("#edit-user-btn");
    editAccountButton.addEventListener("click", handleEditAccountBtn);

    const deleteAccountButton = document.querySelector("#delete-user-btn");
    deleteAccountButton.addEventListener("click", handleDeleteAccountBtn);
};

// renders the edit account info form
function renderEditAccountForm() {
    currentUser = JSON.parse(localStorage.currentUser);

    mainPageDiv.innerHTML = `
    <h1>Edit Account Info</h1>
    <br>
    <form id="edit-account-form">
        <label for="username">Username:</label><br>
        <input type="text" name="username" value="${currentUser.username}"><br>
        <label for="firstName">First Name:</label><br>
        <input type="text" name="firstName" value="${currentUser.first_name}"><br>
        <label for="location">Location (city):</label><br>
        <input type="text" name="location" value="${currentUser.location}"><br>
        <label for="profilePic">Profile Picture (url):</label><br>
        <input type="text" name="profilePic" value="${currentUser.profile_pic}"><br><br>
        <input type="submit" class="btn btn-primary" value="Update Account">
    </form>
    `

    const editAccountForm = document.querySelector("#edit-account-form");
    editAccountForm.addEventListener("submit", handleEditAccountFormSubmit);
};

// render a user's average mood data
function renderMoodData() {
    currentUser = JSON.parse(localStorage.currentUser);
    let entryCount = allUserEntries.length;

    let happyCount = (allUserEntries.filter( entry => entry.mood_id === 1 )).length;
    let sadCount = (allUserEntries.filter( entry => entry.mood_id === 2 )).length;
    let angryCount = (allUserEntries.filter( entry => entry.mood_id === 3 )).length;
    let calmCount = (allUserEntries.filter( entry => entry.mood_id === 4 )).length;

    let averageMoodCounts = [];
    //happy [0] in array
    averageMoodCounts.push(happyCount / entryCount);
    //sad [1] in array
    averageMoodCounts.push(sadCount / entryCount);
    //angry [2] in array
    averageMoodCounts.push(angryCount / entryCount);
    //calm [3] in array
    averageMoodCounts.push(calmCount / entryCount);

    let maxNumber = Math.max(...averageMoodCounts);
    let maxIndex = averageMoodCounts.findIndex( index => index === maxNumber );


    if (entryCount === 0) {
        mainPageDiv.innerHTML = `
        <h1>Hi ${currentUser.first_name ? currentUser.first_name : "there"}.</h1>
        <br>
        <p>You don't have any entries yet. Go create some!</p>`
    } else if (entryCount === 1) {
        mainPageDiv.innerHTML = `
        <h1>Hi ${currentUser.first_name}.</h1>
        <br>
        <p>You only have one entry. Go create some more!</p>`
    } else {
        mainPageDiv.innerHTML = `
        <div id="color-gradient-div">
            <h1>Hi ${currentUser.first_name}.</h1>
            <br>
            <h5>Based on your past ${entryCount} entries, your average mood is:</h5>
            <div id="emoji-display"></div>
            <h5>Entry Mood Counts:</h5>
            <br>
            <div id="mood-count-div" class="card-deck"></div>
        </div>
        `
        // const colorGradientDiv = mainPageDiv.querySelector("#color-gradient-div")
        const emojiDisplayDiv = mainPageDiv.querySelector("#emoji-display");
        switch(maxIndex) {
            case 0:
                mainPageWrapper.className = "color-animation-happy"
                emojiDisplayDiv.innerHTML = `<img class="emoji-display" src="../frontend/img/emoji-happy.png">
                <h6 style="color: grey">(Happy)</h6>
                <br>`
                // colorGradientDiv.className = "color-animation-happy"
                break;
            case 1:
                mainPageWrapper.className = "color-animation-sad"
                emojiDisplayDiv.innerHTML = `<img class="emoji-display" src="../frontend/img/emoji-sad.png">
                <h6>(Sad)</h6>
                <br>`
                // colorGradientDiv.className = "color-animation-sad"
                break;
            case 2:
                mainPageWrapper.className = "color-animation-angry"
                emojiDisplayDiv.innerHTML = `<img class="emoji-display" src="../frontend/img/emoji-angry.png">
                <h6>(Angry)</h6>
                <br>`
                // colorGradientDiv.className = "color-animation-angry"
                break;
            case 3:
                mainPageWrapper.className = "color-animation-calm"
                emojiDisplayDiv.innerHTML = `<img class="emoji-display" src="../frontend/img/emoji-calm.png">
                <h6 style="color: grey">(Calm)</h6>
                <br>`
                // colorGradientDiv.className = "color-animation-calm"
                break;
        };
        const moodCountDiv = mainPageDiv.querySelector("#mood-count-div");
        moodCountDiv.innerHTML = `
        <div class="card bg-light mb-3" style="max-width: 100px;">
        <div class="card-header"><strong>Happy</strong></div>
        <div class="card-body">
            <h3>${happyCount}</h3>
        </div>
        </div>
        <div class="card bg-light mb-3" style="max-width: 100px;">
        <div class="card-header"><strong>Sad</strong></div>
        <div class="card-body">
            <h3>${sadCount}</h3>
        </div>
        </div>
        <div class="card bg-light mb-3" style="max-width: 100px;">
        <div class="card-header"><strong>Angry</strong></div>
        <div class="card-body">
            <h3>${angryCount}</h3>
        </div>
        </div>
        <div class="card bg-light mb-3" style="max-width: 100px;">
        <div class="card-header"><strong>Calm</strong></div>
        <div class="card-body">
            <h3>${calmCount}</h3>
        </div>
        </div>`
    };
};

    /***** MISC. FUNCTIONS *****/

// render the time in the header of the sidebar
let update = function() {
    document.querySelector("#clock-div").innerHTML = 
    `
    <h5 style="color:#19438B;">${moment().format('MMMM Do YYYY, h:mm:ss a')}</h5>
    `;
};

// checks if someone is currently logged in on initialize
function checkLoggedInUser() {
    if (localStorage.currentUser === "") {
        renderLogIn();
    } else if (localStorage.currentUser === undefined) {
        localStorage.currentUser = ""
        renderLogIn();
    } else {
        getAllEntriesToUserArray()
        renderEntryForm();
    }
}

    /***** INITIAL RUNNER FUNCTIONS *****/

// renders sidebar
renderSidebar();
// renders weather icon
getWeatherFetch();
setInterval(getWeatherFetch, 300000 * 6);
// checks if user is logged in and renders page
checkLoggedInUser();
// adds time to sidebar
update();
setInterval(update, 1000);
// get all moods
getAllMoodsFetch();