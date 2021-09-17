// adding an event listener to call other functions:
document.addEventListener('click', handleSongClickEvent);

/**
 * Plays a song from the player.
 * Playing a song means changing the visual indication of the currently playing song.
 *
 * @param {Number} songId - the ID of the song to play
 */
function playSong(songId) {
    // Your code here
}

/**
 * Removes a song from the player, and updates the DOM to match.
 *
 * @param {Number} songId - the ID of the song to remove
 */
function removeSong(id) {
    document.querySelector('.song' + id).remove()
    for (let i = 0; i < player.playlists.length; i++) {
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
        arrayOfIds.push(song.className[song.className.length-1])
        if (arrayOfIds.length > 9) {
            arrayOfIds.push((String(arrayOfIds.length)[0] * 10) + 
            Number(song.className[song.className.length-1]))
        }
        
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
    // try calling the function each time, this way maybe it will reamin sorted.

    appendToSongsDiv();


    // appendToSongsDiv() // this re appends everything.
    // why is color off ?
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
    const addButton = event.target.closest('.add-button') // later will add this

    if (removeButton)  {
        // this next line takes the id of the song:
        const id = removeButton.className.match(/(\d+)/)[0];
        return removeSong(id)
    }
    if (playButton)  {
        const id = playButton.className.match(/(\d+)/)[0];
        return originalPlaySong(id)
    }
}

/**
 * Handles a click event on the button that adds songs.
 *
 * @param {MouseEvent} event - the click event
 */
function handleAddSongEvent(event) {
    // // Your code here
    // const addBtn = event.target.closest('#add-button')
    // if (!addBtn) return; // Get outa here if this isn't add button;

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
            throw alert('Invlid time format')
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
    const children = []
    const classes = []
    const attrs = {}
    const eventListeners = {}
    return createElement("div", children, classes, attrs, eventListeners)
}

/**
 * Creates a playlist DOM element based on a playlist object.
 */
function createPlaylistElement({ id, name, songs }) {
    const children = []
    const classes = []
    const attrs = {}
    const eventListeners = {}
    return createElement("div", children, classes, attrs, eventListeners)
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
function createElement(tagName, children = [], classes = [], attributes = {}, eventListeners = {}) {
    // Your code here
}

/**
 * Inserts all songs in the player as DOM elements into the songs list.
 */
function generateSongs() {
    // Your code here
}

/**
 * Inserts all playlists in the player as DOM elements into the playlists list.
 */
function generatePlaylists() {
    // Your code here
}

// Creating the page structure
generateSongs()
generatePlaylists()

// Making the add-song-button actually do something
document.getElementById("add-button").addEventListener("click", handleAddSongEvent)
