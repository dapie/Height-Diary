<template>
  <section class="leaderboard">
    <Header active="2"></Header>
    <div class="average">
      <img class="icon" src="~/assets/img/line-chart.png"/>
      <div class="text">
        <h1 class="number">178<span>см</span></h1>
        <p class="desc">Средний рост пользователей сервиса</p>
      </div>
    </div>
  </section>
</template>

<script>
import axios from '~/plugins/axios'
import Header from '~/components/Header.vue'

export default {
  data () {
    return { 
      password: null,
      email: null,
      errors: null,
      emailEmpty: false,
      passwordEmpty: false
    }
  },
  components: {
    Header
  },
  head () {
    return {
      title: 'Rostik: топ-10'
    }
  },
  methods: {
    sendForm: async function (e) {
      e.preventDefault();
      this.emailEmpty = false;
      this.passwordEmpty = false;
      this.errors = null;

      if (!this.email) {
        this.emailEmpty = true;
      }
      if (!this.password) {
        this.passwordEmpty = true;
      }

      if(!this.emailEmpty && !this.passwordEmpty){
        try {
          await this.$store.dispatch('login', {
            email: this.email,
            password: this.password
          })
        } catch (error) {
          this.errors = error.message
        }
      }
    }
  },
  middleware: 'authenticated'
}
</script>

<style scoped>
.leaderboard{
  max-width: 1200px;
  min-width: 520px;
  padding: 20px 30px;
  margin: 0 auto;
}
.average{
  margin: 30px auto;
  text-align: center;
}
.average .icon, .text{
  display: inline-block;
}

.icon {
  width: 130px;
}
.text{
  text-align: left;
  color: #2329D6;
  vertical-align: middle;
}

.number{
  font-size: 72px;
  font-weight: bold;
}

.number span{
  font-size: 48px;
  margin-left: 10px;
}
</style>
