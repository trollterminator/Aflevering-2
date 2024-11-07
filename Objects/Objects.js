
//Album Object
export function Album(id, albumName, artistName, artistWebsite, productionYear, trackList) {
    this.id = id,
        this.albumName = albumName,
        this.artistName = artistName,
        this.artistWebsite = artistWebsite,
        this.productionYear = productionYear;
    this.trackList = [];

    //had some issues with the array being undefined, added some validation.
    if (Array.isArray(trackList)) {

        for (let index = 0; index < trackList.length; index++) {
            this.trackList.push(new Track(
                trackList[index].trackNumber,
                trackList[index].trackTitle,
                trackList[index].trackTimeInSeconds
            ));
        }
    }
    else {
        console.log(`array was empty for this album ${this.id}`)
    }

    return this;
}

//probably not necessary, since the trackList could just be saved without the mapping, but i think it makes it more readable.
export function Track(trackNumber, trackTitle, trackTimeInSeconds) {
    this.trackNumber = trackNumber,
        this.trackTitle = trackTitle,
        this.trackTimeInSeconds = trackTimeInSeconds
    return this;
}