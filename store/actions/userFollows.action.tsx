import axios from "axios"

export const FOLLOW_ALBUM = "FOLLOW_ALBUM"
export const UNFOLLOW_ALBUM = "UNFOLLOW_ALBUM"
export const FOLLOW_SONG = "FOLLOW_SONG"
export const UNFOLLOW_SONG = "UNFOLLOW_SONG"
export const SET_FOLLOWS = "SET_FOLLOWS"


export const followAlbum = (albumId: number, userId: number) => {
  return async (dispatch) => {
    try {
        const response = await axios.put(`http://spotifiuba-contenido.herokuapp.com/albums/album_favourites/${albumId}`,
        null,
          {
            params: {
                user_id: userId,
              },
          });
          dispatch({
            type: FOLLOW_ALBUM,
            payload: {newAlbum: response.data.id}
          })
      } catch(error) {
        console.error(error);
      }
      
  }
}

export const unfollowAlbum = (albumId: number, userId: number) => {
    return async (dispatch) => {
      try {
          const response = await axios.put(`http://spotifiuba-contenido.herokuapp.com/albums/album_favourites/${albumId}/${userId}`,
          null,
          {
            headers: {
              'Content-Type': 'application/json',
              'accept': 'application/json'
              },
          });
            dispatch({
              type: UNFOLLOW_ALBUM,
              payload: {album: albumId}
            })
        } catch(error) {
          console.error(error);
        }
        
    }
}

export const followSong = (songId: number, userId: number) => {
  return async (dispatch) => {
    try {
        const response = await axios.put(`http://spotifiuba-contenido.herokuapp.com/songs/song_favourites/${songId}`,
        null,
          {
            params: {
                user_id: userId,
              },
          });
          dispatch({
            type: FOLLOW_SONG,
            payload: {newSong: response.data.id}
          })
          
      } catch(error) {
        console.error(error);
      }
      
  }
}

export const unfollowSong = (songId: number, userId: number) => {
    return async (dispatch) => {
      try {
          const response = await axios.put(`http://spotifiuba-contenido.herokuapp.com/songs/song_favourites/${songId}/${userId}`,
          null,
          {
            headers: {
              'Content-Type': 'application/json',
              'accept': 'application/json'
              },
          });
            dispatch({
              type: UNFOLLOW_SONG,
              payload: {song: songId}
            })
        } catch(error) {
          console.error(error);
        }
        
    }
  }


export const setUserFollows = (userId: number) => {
return async (dispatch) => {
    try {
        const albumsResponse = await axios.get(`http://spotifiuba-contenido.herokuapp.com/users/favourite_albums/${userId}`);
        const songsResponse = await axios.get(`http://spotifiuba-contenido.herokuapp.com/users/favourite_songs/${userId}`);
        dispatch({
            type: SET_FOLLOWS,
            payload: {songs: songsResponse.data.map((song: { id: number }) => song.id), albums: albumsResponse.data.map((album: { id: number }) => album.id)}
        })
    } catch(error) {
        console.error(error);
    }
    
}
}