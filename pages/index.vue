<template>
  <section class="container">
    <div class="logo">
      <h1 class="title">Rostik</h1>
      <img src="~assets/img/logo.svg">
    </div>
    <p class="desc">
      Следи за своим ростом удобно
    </p>
    <nuxt-link to="/register">
      <button class="button filled">Регистрация</button>
    </nuxt-link>
    <nuxt-link to="/login">
      <button class="button">Вход</button>
    </nuxt-link>
  </section>
</template>

<script>
export default {
  head () {
    return {
      title: 'Rostik: Следи за своим ростом удобно'
    }
  }
}
</script>

<style scoped>
.logo .title {
  color: #2329D6;
  font-size: 120px;
  display: inline-block;
  vertical-align: bottom;
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
  text-align: center;
}

@media screen and (max-width: 500px) {
  .logo img{
    display: block;
    margin: 0 auto;
  }

  .logo .title {
    font-size: 72px;
    display: block;
  }
}
</style>
