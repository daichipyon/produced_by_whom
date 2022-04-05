<template>
  <div class="loading">
    <img  :src="require('../assets/loading.gif')" alt="" class="loading_icon" />
    <div class='loading__text'>It takes 20 ~ 30 miniutes to show, because loading all songs. Please wait a bit!</div>
  </div>
</template>

<script>
export default {
  name: 'LoadingComponent',
}
</script>

<style scoped>
.loading{
    background: #f7f7f7;
    width:900px;
    margin: 1em auto;
    padding:1em;
    display: flex;
    align-content: center;
    flex-direction: column;
    align-items:center;
    
}
.loading__icon{
  height: 300px;
}
.loading__text{
  font-size:20px;
}

</style>