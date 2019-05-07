<template>
  <section class="container">
    <div class="logo">
      <h1 class="title">Rostik</h1>
      <img src="~assets/img/logo.svg" alt="">
    </div>
    <p class="desc">
      Следи за своим ростом удобно
    </p>
    <button class="button filled">Регистрация</button>
    <button class="button">Вход</button>
    <ul class="users">
      <li v-for="(user, index) in users" :key="index" class="user">
        <nuxt-link :to="{ name: 'id', params: { id: index }}">
          {{ user.name }}
        </nuxt-link>
      </li>
    </ul>
  </section>
</template>

<script>
import axios from '~/plugins/axios'

export default {
  async asyncData () {
    try {
      let { data } = await axios.get('/api/height')
      console.log(data);
      return { users: data }
    } catch (e) {
      console.log(e);
    }
  },
  head () {
    return {
      title: 'Rostik: Следи за своим ростом удобно'
    }
  }
}
</script>

<style scoped>
.title {
  color: #2329D6;
  font-size: 120px;
  display: inline-block;
  vertical-align: bottom;
  margin: 0;
  padding: 0;
}

.logo img {
  display: inline-block;
  padding-bottom: 16px;
}

.desc {
  color: #2329D6;
  font-size: 36px;
  margin: 10px 0 30px 0;
}

.filled{
  margin-right: 10px;
}

.container {
  min-width: 500px;
  position: absolute;
  top: 50%;
  -ms-transform: translateY(-50%);
  transform: translateY(-50%);
}
</style>
