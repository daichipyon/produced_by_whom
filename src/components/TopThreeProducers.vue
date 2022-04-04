<template>
<div class="producers">
    <div class="producers__container" v-for="[key, val] in song_state.top_three_producers" :key="key">
            <img class="producercontainer__image" :src="val.img_url">
            <div class="producercontainer__name">{{val.name}}</div>
            <div class="producercontainer__songs">{{val.songs.length}} songs</div>
            <div class="songs" v-for="song in val.songs.slice(0,3)" :key="song.id">
                <div class="col-1"><img class="song-image" :src="song.song_art_image_thumbnail_url"></div>
                <div class="col-2">{{song.title}} <div class="feat">{{song.title.replace("")}}</div></div>
            </div>
    </div>
</div>
</template>

<script>
export default {
  name: 'TopThreeProducers',
  props: ['song_state']

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

.producers__container{
    width:300px;
    padding:1em;
    display: inline;
}

.producercontainer__image{
    width:200px;
    margin-bottom: 1em;

}
.producercontainer__name{
    font-size: 20px;
}
.producercontainer__size{
    font-size: 10px;
}

.songs {
  background: #ffffff;
  max-width: 300px;
  height: 70px;
  box-shadow: 0px 0px 9px 0px rgba(0,0,0,0.1);
  margin-bottom: 10px;
  display:flex;
}
.col-1 {
    flex-basis: 70px;
}
.col-2 {
    flex-basis: 200px;
    font-size: 16px;
    padding: 5px;
}

.song-image{
    height: 70px;
}
</style>