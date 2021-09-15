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
function removeSong(event) {
    // locate the div in which the click was made:
    const songDiv = event.target.closest('.song-element');

    const removeButton = event.target.closest('.remove-button');

    if (!removeButton) return // if this is not the remove button get outta dodge;
    // if you got to this line then the user clicked on a remove button button;
    songDiv.remove();
}
// adding an event listener to call removeSong function:
document.addEventListener('click', eventHandler);
// this next line shouldn't be? it should all be called in 1 class
// with a constructor?

/* document.addEventListener('click', removeSong); */

// My idea is to substitute this with calling a helper function
// the helper function will contain something like this:
// if (removeButton) {removeSong()}
// if (playButton) {playSong()}
// alternative will be to use methods and dataset and class methods.
function eventHandler (event) {
    const removeButton = event.target.closest('.remove-button');
    const playButton = event.target.closest('.play-button');
    const addButton = event.target.closest('.add-button') // later will add this

    if (removeButton)  return removeSong(event)
    if (playButton)  return playSong(event)
}


/**
 * Adds a song to the player, and updates the DOM to match.
 */
function addSong({ title, album, artist, duration, coverArt }) {
    // Your code here
}

/**
 * Acts on a click event on an element inside the songs list.
 * Should handle clicks on play buttons and remove buttons of songs.
 *
 * @param {MouseEvent} event - the click event
 */
function handleSongClickEvent(event) {
    // Your code here
}

/**
 * Handles a click event on the button that adds songs.
 *
 * @param {MouseEvent} event - the click event
 */
function handleAddSongEvent(event) {
    // Your code here
}

/**
 * Creates a song DOM element based on a song object.
 */
function createSongElement({ id, title, album, artist, duration, coverArt }) {
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
