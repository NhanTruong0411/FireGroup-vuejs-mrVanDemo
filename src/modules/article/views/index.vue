<template>
  <div>
    List Article
    <div>
      <router-link :to="{ name : 'CreateArticle'}">
          CreateArticle
      </router-link>
    </div>

  </div>
</template>

<script>
  export default {
    name : 'About',
    methods:{
      onClick(){
        this.$router.push({
          name : 'CreateArticle'
        })
      }
    },
    created(){
      console.log(this.$route.query);
    },
    beforeRouteEnter(to, from, next) {
      console.log('beforeRouteEnter');
      next()
    },
    beforeRouteUpdate(to, from, next) {
      console.log('beforeRouteUpdate');
      next()
    },
    beforeRouteLeave(to, from, next) {
      console.log('beforeRouteLeave');
      next()
    }
  }
</script>

<style lang="scss" scoped>

</style>