import axios from "axios"

export const UPDATE_PLAYLIST = "UPDATE_PLAYLIST"

export const createPlaylist = (userId: number, title: string, description: string) => {
  return async (dispatch) => {
    try {

        const body = {
            title: title,
            description: description,
            userId: userId,
        };

        const response = await axios.post(`https://spotifiuba-contenido.herokuapp.com/playlists/`,
        body,
            {
            headers: {
                'Content-Type': 'application/json',
                'accept': 'application/json'
                },
            });
          dispatch({
            type: UPDATE_PLAYLIST,
          })
      } catch(error) {
        console.error(error);
      }
      
  }
}

export const updatePlaylist = (playlistId: number, title: string, description: string) => {
  return async (dispatch) => {
    try {

      let body = {
        title: title,
        description: description,
      };

      const response = await axios.put(`https://spotifiuba-contenido.herokuapp.com/playlists/${playlistId}`,
      body,
        {
          headers: {
            'Content-Type': 'application/json',
            'accept': 'application/json'
            },
        });
          dispatch({
            type: UPDATE_PLAYLIST,
          })
      } catch(error) {
        console.error(error);
      }
      
  }
}

export const addSongToPlaylist = (songId: number, playlistId: number) => {
  return async (dispatch) => {
    try {



        const response = await axios.put(`https://spotifiuba-contenido.herokuapp.com/playlists/add_song/${playlistId}/${songId}`,
            {
            headers: {
                'Content-Type': 'application/json',
                'accept': 'application/json'
                },
            });
            dispatch({
              type: UPDATE_PLAYLIST,
            })
      } catch(error) {
        console.error(error);
      }
      
  }
}

export const removeSongFromPlaylist = (songId: number, playlistId: number) => {
  return async (dispatch) => {
    try {



        const response = await axios.put(`https://spotifiuba-contenido.herokuapp.com/playlists/remove_song/${playlistId}/${songId}`,
            {
            headers: {
                'Content-Type': 'application/json',
                'accept': 'application/json'
                },
            });
            dispatch({
              type: UPDATE_PLAYLIST,
            })
      } catch(error) {
        console.error(error);
      }
      
  }
}

export const deletePlaylist = (playlistId: number) => {
    return async (dispatch) => {
      try {
          const response = await axios.delete(`http://spotifiuba-contenido.herokuapp.com/playlists/{playlists_id}?playlist_id=${playlistId}`,
          {
            headers: {
              'Content-Type': 'application/json',
              'accept': 'application/json'
              },
          });
            dispatch({
              type: UPDATE_PLAYLIST,
            })
        } catch(error) {
          console.error(error);
        }
        
    }
}


