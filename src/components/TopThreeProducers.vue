<template>
<div class="producers">
    <div class="producerscontainer" v-for="[key, val] in song_state.top_three_producers" :key="key">

            <img class="producercontainer__image" :src="val.img_url">
            <a :href="val.genius_url" target="_blank"><div class="producrcontainer__name">{{val.name}}</div></a>
            <div class="producercontainer__songs">{{val.songs.length}} songs</div>
            <SongComponent v-for="song in val.songs.slice(0,3)" v-bind:song='song' :key="song.id" />
            </div>
</div>
</template>

<script>
import SongComponent from './SongComponent.vue'

export default {
  name: 'TopThreeProducers',
  props: ['song_state'],
  components:{
      SongComponent
  }

}
</script>

<style scoped>
.producers{
    background: #f7f7f7;
    width:900px;
    margin: 1em auto;
    padding:1em;
    display: flex;
    flex-direction: row;
}

.producerscontainer{
    width:300px;
    padding:1em;
    display: flex;
    flex-direction: column;
}

.producercontainer__image{
    align-self: center;
    object-fit: cover;
    border-radius: 100%;
    height: 200px;
    width:200px;
    margin-bottom: 1em;
    box-shadow: 0px 0px 9px 0px rgba(0,0,0,0.1);

}
.producercontainer__name{
    font-size: 20px;
    margin-bottom: 0.2em;

}
.producercontainer__songs{
    font-size: 15px;
    margin-bottom: 1em;

}
.producercontainer__size{
    font-size: 10px;
}

</style>