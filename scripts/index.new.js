// adding an event listener to call other functions:
document.addEventListener('click', handleSongClickEvent);

/**
 * Plays a song from the player.
 * Playing a song means changing the visual indication of the currently playing song.
 *
 * @param {Number} songId - the ID of the song to play
 */
function playSong(songId) {
    // using activateSong
}

/**
 * Removes a song from the player, and updates the DOM to match.
 *
 * @param {Number} songId - the ID of the song to remove
 */
function removeSong(id) {
    document.querySelector('.song' + id).remove()
    // this makes sure they aren't re-added when you add a newSong
    for (let i = 0; i < player.songs.length; i++) {
        if (player.songs[i].id == id) {
            player.songs.splice(i, 1)
        }
    }
    for (let i = 0; i < player.playlists.length; i++) {
        // if the playlisted is deleted jump to the next
        // one/ get out of the loop
        if (!player.playlists[i]) continue
        if (player.playlists[i].songs.includes(+id)) {
            player.playlists[i].songs.splice(
                player.playlists[i].songs.indexOf(+id), 1
            )
        }
        if (player.playlists[i].songs.length < 1) {
            delete player.playlists[i]
        }
    }
    appendToPlaylistsDiv()
}

function generateNewId () {
    const arrayOfSongs = document.querySelectorAll('.song-element');
    const arrayOfIds = [];
    for (let song of arrayOfSongs) {
        arrayOfIds.push(song.className.match(/(\d+)/)[0])
    }
    const newId = Math.max(...arrayOfIds) + 1;
    return newId
}
/**
 * Adds a song to the player, and updates the DOM to match.
 */
function addSong({id, title, album, artist, duration, coverArt }) {
    const newSong = createSongElement(arguments[0]);
    newSong.classList.add('song' + id)
    appendToSongsDiv();
}

/**
 * Acts on a click event on an element inside the songs list.
 * Should handle clicks on play buttons and remove buttons of songs.
 *
 * @param {MouseEvent} event - the click event
 */
function handleSongClickEvent(event) {
    const removeButton = event.target.closest('.remove-button');
    const playButton = event.target.closest('.play-button');

    if (removeButton)  {
        // this next line takes the id of the song:
        const id = removeButton.className.match(/(\d+)/)[0];
        return removeSong(id)
    }
    if (playButton)  {
        const id = playButton.className.match(/(\d+)/)[0];
        return activateSong(id)
    }
}

/**
 * Handles a click event on the button that adds songs.
 *
 * @param {MouseEvent} event - the click event
 */
function handleAddSongEvent(event) {
    const arrayOfInputs = document.querySelectorAll('input')
    const songObject = {
        id: generateNewId(),
        title: arrayOfInputs[0].value,
        album: arrayOfInputs[1].value,
        artist: arrayOfInputs[2].value,
        duration: arrayOfInputs[3].value,
        coverArt: arrayOfInputs[4].value
    }
    for (let i = 0; i < arrayOfInputs.length; i++) {
        if (arrayOfInputs[i].value === '') {
            throw alert(arrayOfInputs[i].placeholder + ` can't be an empty input`)
        }
        if (!arrayOfInputs[3].value.includes(':')) {
            throw alert('Invalid time format')
        }
    }
    // push the song into the player object
    // then it is easy to sort them by their names
    player.songs.push(songObject)
    // making sure the song is painted in correlation with its duration
    player.songs[player.songs.length-1].duration = durationConverter(arrayOfInputs[3].value)
    addSong(songObject)
}

/**
 * Creates a song DOM element based on a song object.
 */
function createSongElement2({ id, title, album, artist, duration, coverArt }) {
    // using old createSongElement function
}

/**
 * Creates a playlist DOM element based on a playlist object.
 */
function createPlaylistElement({ id, name, songs }) {
    // using old createSongElement function
}

/**
 * Creates a new DOM element.
 *
 * Example usage:
 * createElement("div", ["just text", createElement(...)], ["nana", "banana"], {id: "bla"}, {click: (...) => {...}})
 *
 * @param {String} tagName - the type of the element
 * @param {Array} children - the child elements for the new element.
 *                           Each child can be a DOM element, or a string (if you just want a text element).
 * @param {Array} classes - the class list of the new element
 * @param {Object} attributes - the attributes for the new element
 * @param {Object} eventListeners - the event listeners on the element
 */

function createElement(tagName, children = [], classes = [], attributes = {}) {
    const element = document.createElement(tagName)
    children.forEach((child) => element.append(child))
    element.classList = classes.join(" ")
    for (const attr in attributes) {
        element.setAttribute(attr, attributes[attr])
    }
    return element;
}
/**
 * Inserts all songs in the player as DOM elements into the songs list.
 */
function generateSongs() {
    /// using appendToSongsDiv
}

/**
 * Inserts all playlists in the player as DOM elements into the playlists list.
 */
function generatePlaylists() {
    // using appendToPlaylistsDiv
}

// Creating the page structure
// generateSongs()
// generatePlaylists()

// Making the add-song-button actually do something
document.getElementById("add-button").addEventListener("click", handleAddSongEvent)

function makeProgressBar () {
    const myProgress = document.createElement('div');
    const myBar = document.createElement('div');
    myProgress.setAttribute("class", "myProgress");
    myBar.setAttribute("class", "myBar");
    myProgress.append(myBar);
    return myProgress
}


function activateSong(id) {
    const duration = getSongDuration(id)
    let tempVar = 0;
    function progress () {
    if (tempVar == 0) { 
        tempVar = 1;
        const myBar = document.querySelector(".myBar");
        if (!myBar.getAttribute("style")) {
        }
        else {
            document.querySelector('.myBar').remove()
            document.body.insertBefore(makeProgressBar(), songs)
            activateSong(id)
        }
        originalPlaySong(id) // keep old playsong alive still
        let width = 1;
        const interval = setInterval(frame, 10*duration); // progress slowly incrementing
        function frame() {
        if (width >= 100) { // (if bar is full) stop the function and reset the bar to empty
            clearInterval(interval);
            tempVar = 0;
        } else {
            width++;
            myBar.style.width = width + "%";
        }
        }
    }
    }
    progress()

}

function getSongDuration (id) {
    let duration;
    player.songs.forEach(song => {
        if (song.id == id) {
            duration = song.duration
        }
    })
    return duration
}

document.querySelector('.click-to-add').addEventListener('click', showInputs)
function showInputs () {
    const inputDiv = document.querySelector('#inputs')
    const addButton = document.querySelector('#add-button')
    if (inputDiv.style.visibility === 'hidden' || (!inputDiv.getAttribute("style"))) {
        inputDiv.style.visibility = 'visible'
        addButton.style.visibility = 'visible'
    } else {
        inputDiv.style.visibility = 'hidden'
        addButton.style.visibility = 'hidden'
    }
    
}