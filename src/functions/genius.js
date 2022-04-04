const axiosBase = require('axios');
const axios = axiosBase.create({
    baseURL: 'https://api.genius.com',
    headers: {
        'Authorization': 'Bearer' + ' ' + process.env.VUE_APP_API_KEY,
        'Access-Control-Allow-Origin': '*'
    },
    responseType: 'json'
});

export async function getArtistIdByArtistname(artistname) {
    try {
        const res = await axios.get('/search' + '/' + '?q=' + encodeURI(artistname))
        const artist_id = res.data.response.hits[0].result.primary_artist.id
        return (artist_id)
    } catch (error) {
        console.log(error)
    }
}
export async function getArtistinfoByArtistID(artistID) {
    try {
        const res = await axios.get('/artists' + '/' + artistID)
        const artist_info = res.data.response.artist
        return ({
            isexist: true,
            data: {
                id: artist_info.id,
                name: artist_info.name,
                genius_url: artist_info.url,
                img_url: artist_info.image_url
            }
        })
    } catch (error) {
        console.log(error)
    }
}

export async function getSongsByArtistID(artistID, per_page, page) {
    try {
        const res = await axios.get('/artists' + '/' + artistID + '/' + 'songs' + '?' + 'per_page=' + per_page + '&' + 'page=' + page)
        const songs = res.data.response.songs
        const primary_songs = songs.filter((song) => { return song.primary_artist.id === artistID })
        const next = res.data.response.next_page
        return { primary_songs, next }
    } catch (error) {
        console.log(error)
    }
}

export async function getAdditionalInfoBySongId(songId) {
    try {
        const res = await axios.get('/songs' + '/' + songId)
        const producer_artists = res.data.response.song.producer_artists
        const hot = res.data.response.song.stats.hot
        const release_date = res.data.response.song.release_date
        return {producer_artists,hot,release_date}
    } catch (error) {
        console.log(error)
    }
}

export async function getSongsByArtistIdWithSongInfo(artistID,per_page, page) {
    try {
        const ret_obj = await getSongsByArtistID(artistID, per_page, page)
        const primary_songs = ret_obj.primary_songs
        await Promise.all(primary_songs.map(async(song,i) => {
            const res = await getAdditionalInfoBySongId(song.id)
            primary_songs[i].producer_artists = res.producer_artists
            primary_songs[i].release_date = res.release_date
            primary_songs[i].hot = res.hot
        }))
        return primary_songs
    } catch (error) {
        console.log(error)
    }
}
