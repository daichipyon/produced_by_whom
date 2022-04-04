<template>
<div class="rapper-status">
    <img class="rapper-status__image" :src='state.img_url'>
    <div class= "rapper-status__text">
        <p class="rapper-status__name"><a :src="state.genius_url">{{state.name}}</a></p>
        <p class="rapper-status__sns">Instagram</p>
    </div>
</div>
</template>

<script>
export default {
  name: 'RapperStatus',
  props: ['state']

}
</script>

<style scoped>
.rapper-status{
    background: #f7f7f7;
    width:900px;
    margin: 1em auto;
    padding:1em;
    display: flex;
    flex-direction: row;
}

.rapper-status__image{
    width:300px;
    margin-left:1em;
}
.rapper-status__text{
    width:600px;
    padding-left: 1.5em;
}

.rapper-status__name{
    font-size: 30px;
}
.rapper-status__sns{
    font-size: 20px;
}
</style>