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
    console.log(`song is playing`);
}

/**
 * Removes a song from the player, and updates the DOM to match.
 *
 * @param {Number} songId - the ID of the song to remove
 */
function removeSong(id) {
    document.querySelector('.song' + id).remove()
}

/**
 * Adds a song to the player, and updates the DOM to match.
 */
function addSong({ title, album, artist, duration, coverArt }) {
    // Your code here
    const newSong = createSongElement(arguments[0]);
    songs.append(newSong)
    // sortSongsAndPlaylists() // just want to see how this looks without

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
        const id = removeButton.className[removeButton.className.length-1];
        return removeSong(id)
    }
    if (playButton)  {
        const id = playButton.className[playButton.className.length-1];
        return originalPlaySong(id)
    }
}

document.addEventListener('click', handleAddSongEvent)

/**
 * Handles a click event on the button that adds songs.
 *
 * @param {MouseEvent} event - the click event
 */
function handleAddSongEvent(event) {
    // Your code here
    const addBtn = event.target.closest('#add-button')
    if (!addBtn) return; // Get outa here if this isn't add button;

    const arrayOfInputs = document.querySelectorAll('input')
    const songObject = {
        title: arrayOfInputs[0].value,
        album: arrayOfInputs[1].value,
        artist: arrayOfInputs[2].value,
        duration: Number(arrayOfInputs[3].value),
        coverArt: arrayOfInputs[4].value
    }
    for (let i = 0; i < arrayOfInputs.length; i++) {
        if (arrayOfInputs[i].value === '') {
            throw alert(arrayOfInputs[i].placeholder + ` can't be an empty input`)
        }
    }
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
// commenting this out for now:
// document.getElementById("add-button").addEventListener("click", handleAddSongEvent)
