<template>
  <div>
    <nuxt/>
    <Footer/>
  </div>
</template>

<script>
import Footer from '~/components/Footer.vue'

export default {
  components: {
    Footer
  }
}
</script>

<style>
.container{
  margin: 0;
  width: 100%;
  padding: 100px 0;
  text-align: center;
}

footer{
  position: fixed;
  bottom: 20px;
}
</style>
