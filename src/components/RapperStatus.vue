<template>
<div class="rapper-status">
    <img class="rapper-status__image" :src='state.img_url'>
    <div class= "rapper-status__text">
        <a :href="state.genius_url"><p class="rapper-status__name">{{state.name}}</p></a>
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
    border-radius: 100%;
    box-shadow: 0px 0px 9px 0px rgba(0,0,0,0.1);
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