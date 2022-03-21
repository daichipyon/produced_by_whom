<template>
    <div v-if="!(isexist)">
        <form @submit.prevent="fetch_rapper_id()">
            <div class="field">
                <div class="label">アーティスト名をいれてね</div>
                <input
                    type="text"
                    placeholder=""
                    v-model='input_artist_name'
                    required
                />
                <button type="submit" class="button is-link is-light">
                    Go (^^)/
                </button>
            </div>
        </form>
        <form @submit.prevent="fetch_rapper()">
            <div class="field">
                <div class="label">GeniusのアーティストIDをいれてね</div>
                <input
                    type="text"
                    placeholder=""
                    v-model='rapper.id'
                    required
                />
                <button type="submit" class="button is-link is-light">
                    Go (^^)/
                </button>
            </div>
        </form>
    </div>
    <div v-else>
        <h1 class="name"><a :src="rapper.genius_url">{{rapper.name}}</a></h1>
        <img :src='rapper.img_url'>
        <h1 class="producers">Producers</h1>
            <div v-for="[key, val] in Array.from(producers)" :key="key">
                <a :href="val.genius_url">{{val.name}}</a>   :   {{val.songs.length}}
            </div>
        <h1 class="songs">Songs</h1>
        <table>
            <tbody>
                <tr v-for="song in songs" :key="song.id">
                    <td>{{song.title}}</td>
                    <td>{{song.release_date}}</td>
                    <td v-if="song.producer_artists.length > 0">{{song.producer_artists[0].name}}</td>
                </tr>
            </tbody>
        </table>
     </div>
</template>
<script>
import {computed, reactive, ref } from 'vue'
import {getArtistIdByArtistname,getSongsByArtistIdWithSongInfo, getArtistinfoByArtistID} from '../functions/genius'

export default ({
    setup() {
        const rapper = reactive({id:'', name:"",genius_url:"", img_url:""})
        const songs = ref([])
        const isexist = ref(false)

        const input_artist_name = ref('')

        const fetch_rapper_id = async() => {
            const rapper_id =  await getArtistIdByArtistname(input_artist_name.value)
            rapper.id = rapper_id
            await fetch_rapper()
        }
        const fetch_rapper = async() => {
            const artist_info =  await getArtistinfoByArtistID(rapper.id)
            if (artist_info.isexist === true){
                rapper.id = artist_info.data.id
                rapper.name = artist_info.data.name
                rapper.genius_url = artist_info.data.genius_url
                rapper.img_url = artist_info.data.img_url
                isexist.value = true
            }

            const page_array = [...Array(10)].map((v, i)=> i+1) //[1,2,3,4,5,6,7,8,9,10]
            const ret_vals  = await Promise.all(page_array.map(async(n) => {
                const dummy = await getSongsByArtistIdWithSongInfo(rapper.id,50,n)
                return dummy
                })).then(values => values)
            
            console.log(ret_vals)
            ret_vals.forEach(primary_songs => primary_songs.forEach(song=> songs.value.push(song)))

            songs.value = songs.value.sort(function (a, b) {
                return new Date(b.release_date) - new Date(a.release_date);
            });
            
        }

        function groupBy(list, keyGetter) {
            const map = new Map();
            list.forEach((item) => {
                try{
                    const keyArray = keyGetter(item);
                    keyArray.forEach( (elm) => {
                        const id = elm.id
                        const name = elm.name
                        const genius_url = elm.url
                        const img_url = elm.image_url
                        const collection = map.get(id);
                        if (!collection) {
                            map.set(id, {songs:[item], name:name, genius_url:genius_url, img_url:img_url});
                        } else {
                            collection.songs.push(item);
                        }                        
                    })
                    
                }catch(e){
                    console.log(e)
                }
            });
            return map;
        }

        const producers = computed(()=> {
            const producers_raw = groupBy(songs.value, song =>song.producer_artists)
            const producers_out = new Map([...producers_raw.entries()].sort((a, b) => a[1].length < b[1].length ? 1 : -1));
            return producers_out
        }
        )

    return {rapper,songs,input_artist_name,fetch_rapper_id, fetch_rapper,isexist,producers}
    },
})
</script>
