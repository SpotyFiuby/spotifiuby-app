export default {
    id: '1',
    name: 'Album',
    by: 'Spotify',
    numberOfLikes: 23,
    imageUri: 'https://i.scdn.co/image/ab67616d0000b273328e973ede81069ff83d552e',
    artistsHeadline: 'Los palmeras',
    songs: [{
        id: '1',
        imageUri: 'https://www.cmtv.com.ar/tapas-cd/0825697001573678353.jpg',
        title: 'Sabalero',
        artist: 'Los palmeras',
        album: 'Cumbia',
        mp3: require("../assets/songs/LosPalmeras.mp3")
      }, {
        id: '2',
        imageUri: 'https://www.elciudadanoweb.com/wp-content/uploads/2019/06/los-palmeras.jpg',
        title: 'El Bombón',
        artist: 'Los palmeras',
        album: 'Cumbia',
        mp3: require("../assets/songs/elbombon.mp3")
      }, {
        id: '3',
        imageUri: 'https://i.scdn.co/image/ab67616d0000b273328e973ede81069ff83d552e',
        title: 'Olvídala',
        artist: 'Los palmeras',
        album: 'Cumbia',
        mp3: require("../assets/songs/olvidala.mp3")
      },{
        id: '4',
        imageUri: 'https://i1.sndcdn.com/artworks-000135126611-qxj5bq-t500x500.jpg',
        title: 'La Chola',
        artist: 'Los palmeras',
        album: 'Cumbia',
        mp3: require("../assets/songs/loquequierelachola.mp3")
      }]
}