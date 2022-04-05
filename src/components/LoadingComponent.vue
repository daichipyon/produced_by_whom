<template>
  <div class="loading">
    <img :src="require('../assets/loading.gif')" alt="" class="w-24 m-auto" />
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
    justify-content: center;
    
}

</style>