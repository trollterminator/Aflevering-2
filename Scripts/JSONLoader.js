import { Album } from "../Objects/Objects.js";

//Get the Albums
let albums = await fetchAndStoreJSONData();

setupHTML(albums);


//The initial attempt, works and shows the information, just not as fancy-looking.
// setupHTML();
// function setupHTML() {


//     let containerElement = document.getElementById("jsContainer");
//     albums.forEach(album => {
//         containerElement.innerHTML += `
//         <p> ${album.id} </p> ` +
//             `<p> ${album.albumName} </p>  ` +
//             `<p> ${album.artistName} </p>` +
//             `<p> ${album.artistWebiste} </p>` +
//             `<p> ${album.productionYear} </p>`;


//             containerElement.innerHTML += `<p> Songs for album <b> ${album.albumName} </b> </p>`;
//             album.trackList.forEach(track => {

//             containerElement.innerHTML += `<p> ${track.trackNumber} </p>` + ` <p> ${track.trackTitle} </p> ` + `<p> ${track.trackTimeInSeconds} </p>`
//         });
//     });
// } 

//assistance from ChatGPT To Prettyfy my initial code/attempt
function setupHTML(albumObjects) {
    const container = document.createElement('div');
    container.className = 'album-container';

    albumObjects.forEach(album => {
        // Create the album card
        const albumCard = document.createElement('div');
        albumCard.className = 'album-card';

        // Album title
        const title = document.createElement('h2');
        title.textContent = album.albumName;
        albumCard.appendChild(title);

        // Artist name
        const artist = document.createElement('p');
        artist.textContent = `Artist: ${album.artistName}`;
        albumCard.appendChild(artist);

        // Artist website link
        const link = document.createElement('a');
        link.href = album.artistWebsite;
        link.textContent = 'Visit Artist Website';
        link.target = '_blank';
        albumCard.appendChild(link);

        // Button to toggle tracklist
        const toggleButton = document.createElement('button');
        toggleButton.textContent = 'Show Tracks';
        toggleButton.className = 'toggle-button';
        albumCard.appendChild(toggleButton);

        // Tracklist container (hidden initially)
        const trackList = document.createElement('ul');
        trackList.className = 'tracklist hidden';

        album.trackList.forEach(track => {
            const trackItem = document.createElement('li');
            trackItem.textContent = ` ${track.trackTitle} (${track.trackTimeInSeconds}s)`;
            trackList.appendChild(trackItem);
        });

        albumCard.appendChild(trackList);
        container.appendChild(albumCard);

        // Add event listener to toggle tracklist visibility
        toggleButton.addEventListener('click', () => {
            trackList.classList.toggle('hidden');
            toggleButton.textContent = trackList.classList.contains('hidden') ? 'Show Tracks' : 'Hide Tracks';
        });
    });

    document.body.appendChild(container);  // Or append to a specific element in your HTML
}

//Method for fetching the JSON Data and storing it as JavaScript Objects
async function fetchAndStoreJSONData() {
    let albumObjects = [];

    await fetchContent("../JSON/albums.json").then((albums) => {
        console.log(albums);

        for (let index = 0; index < albums.length; index++) {

            const albumToAdd = MapJSONToAlbum(albums[index])

            albumObjects.push(albumToAdd);
        }

    });

    console.log(albumObjects.length)
    return albumObjects;
}



//Magic spell from Thomas: Three steps:
//1. Fetch the data and return a promise/request
//2. wait for the response of the request to be converted to JSON
//3. return the JSON
async function fetchContent(url) {
    let request = await fetch(url);
    let json = await request.json();
    return json;
}

function MapJSONToAlbum(ObjectJSON) {
    return new Album(
        ObjectJSON.id,
        ObjectJSON.albumName,
        ObjectJSON.artistName,
        ObjectJSON.artistWebsite,
        ObjectJSON.productionYear,
        ObjectJSON.trackList
    );
}
