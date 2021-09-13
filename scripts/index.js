function playlistDuration(id) {
    let answer = 0
    const playlists = player.playlists
    playlists.forEach((playlist) => {
        if (playlist.id === id) {
            playlist.songs.forEach((songNumber) => {
                player.songs.forEach((song) => {
                    // finds songs that match the numbers in the array 'songs' of playlist object
                    if (song.id === songNumber) {
                        answer += song.duration
                    }
                })
            })
        }
    })
    return answer
}

function durationConverter(time) {
    if (typeof time === "string") {
        const arr = time.split(":")
        const seconds = +arr[0] * 60 + +(+arr[1])
        return seconds
    } else {
        let newFormat = new Date(time * 1000).toISOString().substr(14, 5)
        return newFormat
    }
}
/**
 * Plays a song from the player.
 * Playing a song means changing the visual indication of the currently playing song.
 *
 * @param {String} songId - the ID of the song to play
 */

function playSong(songId) {
    // make sure it can only be playing 1 at a time:
    const resetSongs = document.querySelectorAll(".song-element")
    resetSongs.forEach((song) => {
        song.setAttribute("style", "background-color: rgb(118, 201, 204)")
    })
    player.songs.forEach((song) => {
        if (song.id === songId) {
            const soughtSong = document.querySelector(".song" + songId)
            soughtSong.setAttribute("style", "background-color: rgb(96, 150, 163)")
            soughtSong.setAttribute("style", "cursor: pointer")
            soughtSong.classList.add("current-song")
            alert(`${song.title} is playing`)
        }
    })
}

function setColors (songArray) {
    for (let i = 0; i < songArray.length; i++) {
            const soughtSong = document.querySelector(`.song${songArray[i].id}`)
            if (songArray[i].duration < 421 && songArray[i].duration > 119) {
                const color = (421 - songArray[i].duration) * (120/420)
                soughtSong.setAttribute("style", `background-color: hsl(${color}, 100%, 25%)`)
            } else if (songArray[i].duration < 120) {
                soughtSong.setAttribute("style", `background-color: green`)
            } else { soughtSong.setAttribute("style", `background-color: red`)}
    }
}
/**
 * Creates a song DOM element based on a song object.
 */
function createSongElement({ id, title, album, artist, duration, coverArt }) {
    const children = []
    const classes = ["song-element"]
    const attrs = { onclick: `playSong(${arguments[0]})`}
    const ul = document.createElement("ul")
    const image = document.createElement("img")
    image.src = arguments[5]
    image.alt = 'cover-photo'
    for (let i = 1; i < arguments.length - 1; i++) {
        if (i === 4) {
            arguments[4] = durationConverter(arguments[4])
        }
        const li = document.createElement("li")
        li.innerText = arguments[i]
        ul.append(li)
    }
    ul.appendChild(image)
    children.push(ul)
    return createElement("div", children, classes, attrs)
}
/**
 * Creates a playlist DOM element based on a playlist object.
 */
function createPlaylistElement({ id, name, songs }) {
    id = arguments[0]
    const children = []
    const classes = [arguments[1] + '-playlist']
    const attrs = { id }
    const ul = document.createElement("ul")
    for (let i = 1; i < arguments.length; i++) {
        const li = document.createElement("li")
        li.innerText = arguments[i]
        ul.append(li)
    }
    children.push(ul)
    return createElement("div", children, classes, attrs)
}

/**
 * Creates a new DOM element.
 *
 * Example usage:
 * createElement("div", ["just text", createElement(...)], ["nana", "banana"], {id: "bla"})
 *
 * @param {String} tagName - the type of the element
 * @param {Array} children - the child elements for the new element.
 *                           Each child can be a DOM element, or a string (if you just want a text element).
 * @param {Array} classes - the class list of the new element
 * @param {Object} attributes - the attributes for the new element
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

// You can write more code below this line

// creating a ul with nested li for songs:
const songs = document.getElementById("songs")
const playlists = document.getElementById("playlists")
const siteHeader = document.createElement("header")
const headerContent = document.createElement("h1")
headerContent.innerText = `Gabby's MP3 Player`
const songHeader = document.createElement("h2")
songHeader.innerText = `Songs`
siteHeader.append(headerContent, songHeader)
document.body.insertBefore(siteHeader, songs)
const playlistHeader = document.createElement("h2")
playlistHeader.innerText = `Playlists:`
document.body.insertBefore(playlistHeader, playlists)

function appendToSongsDiv() {
    player.songs.forEach((song) => {
        const { id, title, album, artist, duration, coverArt } = song
        const newSong = createSongElement(id, title, album, artist, duration, coverArt)
        newSong.classList.add("song" + id)
        songs.append(newSong)
    })
}
appendToSongsDiv()

function appendToPlaylistsDiv() {
    player.playlists.forEach((playlist) => {
        const { id, name, songs } = playlist
        const newPlaylist = createPlaylistElement(id, name, songs)
        playlists.append(newPlaylist)
        const playListTime = document.createElement("li")
        playListTime.innerText = durationConverter(playlistDuration(id))
        newPlaylist.append(playListTime)
    })
}
appendToPlaylistsDiv()

// paint songs on load:
setColors(player.songs)
