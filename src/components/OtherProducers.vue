<template>
<div class="producerscontainer">
    <table class='other-producers'>
      <thead>
        <tr>
          <th colspan="2">Producer</th>
          <th>Songs</th>
        </tr>
      </thead>
        <tbody>
            <tr v-for="[key, val] in song_state.other_producers" :key="key">
                <td class="table-data"><img class="table-data__image" :src="val.img_url"></td>
                <td class="table-data"><a :href="val.genius_url" target="_blank"><div class="table-data__name">{{val.name}}</div></a></td>
                <td class="table-data">
                    <div class="table-data__songwrapper">
                        <SongComponent  v-for="song in val.songs" v-bind:song='song' :key="song.id" />
                    </div>
                </td>
            </tr>
        </tbody>
    </table>
</div>
</template>

<script>
import SongComponent from './SongComponent.vue'

export default {
  name: 'OtherProducers',
  components:{
    SongComponent
  },
  props: ['song_state']

}
</script>

<style scoped>
.other-producers{
    width:900px;
    margin:auto;
    border-spacing: 0px;
}

.table-data{
    border-bottom: solid 1px black;
    padding-top: 10px;

}
.table-data__name{
    margin: 3em 0;
}

.table-data__image{
    max-height: 100px;
    margin: 10px;
}
.table-data__songwrapper{
    display: grid;
    grid-template-columns: 1fr 1fr 1fr;
    column-gap: 10px;
    row-gap: 10px;
}
th{
    position:sticky;
    top:0;
    background: #fff;
    font-size:1.5em;
    padding:10px;
    border-bottom: solid 2px rgba(0, 0, 0, 0.1);
}
</style>