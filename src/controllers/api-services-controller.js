//spotify
// Authorization token that must have been created previously. See : https://developer.spotify.com/documentation/web-api/concepts/authorization
const token = 'BQAeXSOwSaTOYxoaLtU_nkj77KWIIP5TDJxP77tvgPQar7zTrnvOSWRS07G2kofniuVQkbnnJFTzsagvSAxyYcyas2B-oTheDvEHYbxkHM7hPHDf1SZpTMUkwEIdH8qeJG35GRyponeCRVO2yAhhE1IT5pf7rpBSW1MiotSxnrikOcL78rrUopQ0IxJ45jtIMuHDArbuH_noKfmOjcHlanOI88-cQEJ2MFPcrumLxpBSZdpa0oFio1ATDg-dAirvw_FEVAUUtHViP39teUTSz5tV7jL6XIG00-3qimzHUpNRLjp-LgxAt_tTRrDKbJ5e0gC1KSr9P1D3IRchYvuGrhSkSFUgi7v2NT9OuGwyAaBZHN8';
async function fetchWebApi(endpoint, method, body) {
    const res = await fetch(`https://api.spotify.com/${endpoint}`, {
        headers: {
            Authorization: `Bearer ${token}`,
        },
        method,
        body: JSON.stringify(body)
    });
    return await res.json();
}

async function getTopTracks() {
    // Endpoint reference : https://developer.spotify.com/documentation/web-api/reference/get-users-top-artists-and-tracks
    return (await fetchWebApi(
        'v1/me/top/tracks?time_range=short_term&limit=5', 'GET'
    )).items;
}

const topTracks = await getTopTracks();
console.log(
    topTracks?.map(
        ({ name, artists }) =>
            `${name} by ${artists.map(artist => artist.name).join(', ')}`
    )
);



// Recommended tracks

const topTracksIds = [
    '1yIl4e5t3VKeGAeKextW58','76gjg6ji0U65IxynbdN2KO','42vb6qHyBdsIOCJY0UQ53s','3BUjgjs6DCpu0pYT7PWEr8','4o44rgYIaQjghqt8obRqEV'
  ];
  
  async function getRecommendations(){
    // Endpoint reference : https://developer.spotify.com/documentation/web-api/reference/get-recommendations
    return (await fetchWebApi(
      `v1/recommendations?limit=5&seed_tracks=${topTracksIds.join(',')}`, 'GET'
    )).tracks;
  }
  
  const recommendedTracks = await getRecommendations();
  console.log(
    recommendedTracks.map(
      ({name, artists}) =>
        `${name} by ${artists.map(artist => artist.name).join(', ')}`
    )
  );




  //Save songs in a user playlist

  // Authorization token that must have been created previously. See : https://developer.spotify.com/documentation/web-api/concepts/authorization
//const token = 'BQAeXSOwSaTOYxoaLtU_nkj77KWIIP5TDJxP77tvgPQar7zTrnvOSWRS07G2kofniuVQkbnnJFTzsagvSAxyYcyas2B-oTheDvEHYbxkHM7hPHDf1SZpTMUkwEIdH8qeJG35GRyponeCRVO2yAhhE1IT5pf7rpBSW1MiotSxnrikOcL78rrUopQ0IxJ45jtIMuHDArbuH_noKfmOjcHlanOI88-cQEJ2MFPcrumLxpBSZdpa0oFio1ATDg-dAirvw_FEVAUUtHViP39teUTSz5tV7jL6XIG00-3qimzHUpNRLjp-LgxAt_tTRrDKbJ5e0gC1KSr9P1D3IRchYvuGrhSkSFUgi7v2NT9OuGwyAaBZHN8';
async function fetchWebApi(endpoint, method, body) {
  const res = await fetch(`https://api.spotify.com/${endpoint}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
    method,
    body:JSON.stringify(body)
  });
  return await res.json();
}

const tracksUri = [
  'spotify:track:1yIl4e5t3VKeGAeKextW58','spotify:track:6KgMXgKzxDJlvbTRytLEx8','spotify:track:76gjg6ji0U65IxynbdN2KO','spotify:track:4UEDuwc0x4pvhs4V6RkMJ5','spotify:track:42vb6qHyBdsIOCJY0UQ53s','spotify:track:5c4k6F2MeqAth0zGH2wI0j','spotify:track:3BUjgjs6DCpu0pYT7PWEr8','spotify:track:24NK3wy2Apbej4xo2S7PJd','spotify:track:4o44rgYIaQjghqt8obRqEV','spotify:track:6lfZkpwrr9E3eDSKnMvJJN'
];
const user_id = '31sx2nbkljfnyjjgtldgli3e32fq';

async function createPlaylist(tracksUri){
  return await fetchWebApi(
    `v1/users/${user_id}/playlists`, 'POST', {
      "name": "My recommendation playlist",
      "description": "Playlist created by the tutorial on developer.spotify.com",
      "public": false
  }).then(playlist => {
    fetchWebApi(
      `v1/playlists/${playlist.id}/tracks?uris=${tracksUri.join(',')}`,
      'POST'
    );
    return playlist;
  })
}

const createdPlaylist = await createPlaylist(tracksUri);
console.log(createdPlaylist.name, createdPlaylist.id);





//play songs
const playlistId = '7ysQiH2rSMlMvA4UIPI1Fg';

<iframe
  title="Spotify Embed: Recommendation Playlist "
  src={`https://open.spotify.com/embed/playlist/7ysQiH2rSMlMvA4UIPI1Fg?utm_source=generator&theme=0`}
  width="100%"
  height="100%"
  style={{ minHeight: '360px' }}
  frameBorder="0"
  allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
  loading="lazy"
/>