<template>
    <HeaderComponent />
        <div v-if="!(isexist)">
            <div class="name-form">
            <form @submit.prevent="fetch_rapper_id()">
                <div class="field">
                    <div class="name-form__label">調べたいラッパーの名前をいれてね</div>
                    <input
                        type="text"
                        placeholder=""
                        v-model='input_artist_name'
                        required
                    />
                    <button type="submit" class="name-form__button">
                        Go (^^)/
                    </button>
                </div>
            </form>
            </div>
        </div>
        <div v-else>
            <RapperStatus :state="state"/>
            <div v-if="loading">
                <LoadingComponent />
            </div>
            <div v-else>
                <h1>Top 3 Producers</h1>
                <TopThreeProducers :song_state="song_state"/>
                <h1>Other Producers</h1>
                <OtherProducers :song_state='song_state'/>
            </div>
        </div>

</template>
<script>
import {computed, reactive, ref } from 'vue'
import {getArtistIdByArtistname,getSongsByArtistIdWithSongInfo, getArtistinfoByArtistID} from '../functions/genius'

import HeaderComponent from './HeaderComponent.vue'
import RapperStatus from './RapperStatus.vue'
import TopThreeProducers from './TopThreeProducers.vue'
import OtherProducers from './OtherProducers.vue'
import LoadingComponent from './LoadingComponent.vue'

export default ({
  components: {
    HeaderComponent,
    RapperStatus,
    TopThreeProducers,
    OtherProducers,
    LoadingComponent
  },
    setup() {
        const state = reactive({
            rapper_id:'',
            name:"",
            genius_url:"",
            img_url:"",
            })

        const song_state = reactive({
            raw_songs:[],
            orderd_songs:computed(()=>{
                const oreder_songs =  song_state.raw_songs.slice().sort(function (a, b) {return new Date(b.release_date) - new Date(a.release_date)})
                return oreder_songs
            }),
            producers: computed(()=> {
                const producers_raw = groupBy(song_state.raw_songs, song =>song.producer_artists)
                const producers = Array.from(producers_raw)
                const orederd_producers = producers.slice().sort(function (a, b) {return b[1].songs.length - a[1].songs.length})
                return orederd_producers}),
            top_three_producers :computed(()=>{
                return song_state.producers.slice(0,3)
            }),
            other_producers:computed(()=>{
                return song_state.producers.slice(4)
            })
            })

        const isexist = ref(false)
        const input_artist_name = ref('')
        const loading = ref(true)


        const fetch_rapper_id = async() => {
            const rapper_id =  await getArtistIdByArtistname(input_artist_name.value)
            state.rapper_id = rapper_id
            await fetch_rapper()
        }
        const fetch_rapper = async() => {
            const artist_info =  await getArtistinfoByArtistID(state.rapper_id)
            if (artist_info.isexist === true){
                state.rapper_id = artist_info.data.id
                state.name = artist_info.data.name
                state.genius_url = artist_info.data.genius_url
                state.img_url = artist_info.data.img_url
                isexist.value = true
            }

            const page_array = [...Array(10)].map((v, i)=> i+1) //[1,2,3,4,5,6,7,8,9,10]
            const ret_vals  = await Promise.all(page_array.map(async(n) => {
                const dummy = await getSongsByArtistIdWithSongInfo(state.rapper_id,50,n)
                return dummy
                })).then(values => values)
            
            console.log(ret_vals)
            // Add Songs
            ret_vals.forEach(primary_songs => primary_songs.forEach(song=> song_state.raw_songs.push(song)))
            loading.value = false;

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
    return {state,song_state,input_artist_name,fetch_rapper_id, fetch_rapper,isexist,loading}
    },
})
</script>

<style>
.name-form {
    background: #f7f7f7;
    width:900px;
    margin: 1em auto;
    padding:1em;
    display: flex;
    flex-direction: column;
    align-items: center;
}
.name-form__label {
    color: black;
}
.name-form__button {
    border-radius: 2px;
    background:white;
    color: black;
    margin:0.5em 2em;
}
h1{
    text-align: center;
    font-size:2em;
}
</style>>
