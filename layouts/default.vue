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
  width: 100%;
  text-align: center;
}

footer{
  position: fixed;
  bottom: 20px;
}
</style>
