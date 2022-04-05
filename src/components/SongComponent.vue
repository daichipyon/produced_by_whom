<template>
<div class="songscontainer">
    <a :href="song.url" target="_blank"><div class="songscontainer__col1"><img class="songscontainer__image" :src="song.song_art_image_thumbnail_url"></div></a>
    <div class="songscontainer__col2">
        <a :href="song.url" target="_blank"><div class="songscontainer__title">{{song.title}} <div class="songscontainer__faet">{{song.title_with_featured.replace(song.title,"")}}</div></div></a>
        <div class="songscontainer__release">{{song.release_date}}</div>
    </div>
</div>
</template>

<script>
export default {
  name: 'SongsComponent',
  props: ['song']

}
</script>

<style scoped>
.songscontainer {
  background: #ffffff;
  max-width: 300px;
  height: 70px;
  box-shadow: 0px 0px 9px 0px rgba(0,0,0,0.1);
  margin-bottom: 10px;
  display:flex;
}
.songscontainer__col1 {
    flex-basis: 70px;
}
.songscontainer__col2 {
    flex-basis: 230px;
    display: flex;
    flex-direction: column;
}
.songscontainer__title{
    padding-top: 5px;
    padding-left: 5px;
    font-size: 16px;
    height:50px;
}

.songscontainer__image{
  object-fit: cover;
  height: 70px;
  width: 70px;

}
.songscontainer__faet{
    font-size: 12px;
    display: inline;
}
.songscontainer__release{
    font-size:12px;
    padding-right: 5px;
    align-self: flex-end;
    color: #9c9797;
}

</style>