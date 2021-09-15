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

// ..psuedo :
// replace playSong with setTimeout (playSong, songDuration that matches id)
// at the end of playSong function increment index++
// keep index like this:
// setTimeout(func, 2500, par1, par2)
// let tempId = null
// const arrayOfIds = [4,5,7,6,3,2,1]
// function testFunc (duration, id) {
//    id
//     setTimeout(playSong, duration, arrayOfIds[index])
//     index++
// }
// let index = 0
// function engulfingFunction (songId, duration) {
//     index = arrayOfIds.indexOf(songId)
//     const doesSomething = setTimeout(playSong,duration*1000, songId)
// }

function originalPlaySong(songId) {
    const resetSongs = document.querySelectorAll(".song-element")
    resetSongs.forEach((song) => {
        song.setAttribute("style", "background-color: rgb(118, 201, 204)")
    })
    player.songs.forEach((song) => {
        if (song.id == songId) {
            const soughtSong = document.querySelector(".song" + songId)
            soughtSong.setAttribute("style", "background-color: rgb(96, 150, 163)")
            soughtSong.setAttribute("style", "cursor: pointer")
            soughtSong.classList.add("current-song")
            alert(`${song.title} is playing`)
        }
    })
    // index++
    // clearInterval(doesSomething)
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
    const attrs = {onclick: 'console.log("this is an old functionality within createSongElement func located index.js")' } // onclick: `playSong(${id})` 
    const ul = document.createElement("ul")
    const image = document.createElement("img")
    const playButton = document.createElement('button')
    playButton.classList.add('play-button', 'play-button' + id)
    playButton.append('Play')
    const removeButton = document.createElement('button')
    removeButton.classList.add('remove-button', 'remove-button' + id)
    removeButton.append('Remove')
    image.src = coverArt
    image.alt = 'cover-photo'
    for (let key in arguments[0]) {
        if (key === 'id' || key === 'coverArt') {
            continue
        }
        if (key === 'duration') {
            const li = document.createElement("li")
            li.innerText = durationConverter(arguments[0][key])
            ul.append(li)
        } else {
        const li = document.createElement("li")
        li.innerText = arguments[0][key]
        ul.append(li)
        }
    }
    ul.appendChild(image)
    ul.append(playButton)
    ul.append(removeButton)
    children.push(ul)
    return createElement("div", children, classes, attrs)
}
/**
 * Creates a playlist DOM element based on a playlist object.
 */
function createPlaylistElement({ id, name, songs }) {
    // const newId = arguments[0]
    // console.log(arguments[0]);
    const children = []
    const classes = [name + '-playlist']
    const attrs = { id }
    const ul = document.createElement("ul")
    for (let key in arguments[0]) {
        const li = document.createElement("li")
        li.innerText = arguments[0][key]
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
const timeLeft = document.createElement('h3')
timeLeft.innerText = 'Time Left will be displayed here'
document.body.insertBefore(timeLeft, songs)
const playlistHeader = document.createElement("h2")
playlistHeader.innerText = `Playlists:`
document.body.insertBefore(playlistHeader, playlists)

function appendToSongsDiv() {
    player.songs.forEach((song) => {
        const newSong = createSongElement(song)
        newSong.classList.add("song" + song.id)
        songs.append(newSong)
    })
}
appendToSongsDiv()

function appendToPlaylistsDiv() {
    player.playlists.forEach((playlist) => {
        const newPlaylist = createPlaylistElement(playlist)
        playlists.append(newPlaylist)
        const playListTime = document.createElement("li")
        playListTime.innerText = durationConverter(playlistDuration(playlist.id))
        newPlaylist.append(playListTime)
    })
}
appendToPlaylistsDiv()

// paint songs on load:
setColors(player.songs)
