const searchSong = () => {                         //const searchSong = async() => {
    const searchText = document.getElementById('search_field').value;
    const url = `https://api.lyrics.ovh/suggest/${searchText}`;
    fetch(url)                                     //const res = await fetch(url);
    .then(res => res.json())                       //const data = await res.json();
    .then(data => displaySong(data.data))           //displaySong(data.data);
    .catch(error => displayError('Something went wrong!! Please Try again.'));
}

const displaySong = songs => {
    const songContainer = document.getElementById('song_container');
    songContainer.innerHTML = ''

    songs.forEach( song => {
        const songDiv = document.createElement('div');
        songDiv.className = 'single-result row align-items-center my-3 p-3';

        songDiv.innerHTML = `
            <div class="col-md-9">
                <h3 class="lyrics-name">${song.title}</h3>
                <p class="author lead">Album by <span>${song.artist.name}</span></p>

                <audio controls>
                    <source src="${song.preview}" type="audio/mpeg">
                </audio>
            </div>
            <div class="col-md-3 text-md-right text-center">
                <button onclick="getLyric('${song.artist.name}' , '${song.title}')" class="btn btn-success">Get Lyrics</button>
            </div>
        `
        songContainer.appendChild(songDiv);
    });
}

const getLyric = async( artist, title ) => {
    const url = `https://api.lyrics.ovh/v1/${artist}/${title}`
    try{                                 // if use fetch then no need to use try catch
        const res = await fetch(url);    //fetch(url)
    const data = await res.json();       //.then(res => res.json())
    displayLyrics(data.lyrics);           //.then(data => displayLyrics(data.lyrics))
    }
    catch(error){
       displayError('Sorry!!! Something went wrong we cannot load lyrics!! Please try again')
    }
}

const displayLyrics = lyrics => {
    const lyricsDiv = document.getElementById('song_lyrics');

    lyricsDiv.innerText = lyrics;

}

const displayError = error =>{
    const errorMessage = document.getElementById('error_message');
    errorMessage.innerText = error;
}