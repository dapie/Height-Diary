<template>
  <section class="container">
    <nuxt-link to='/'>
      <div class="logo">
        <h1 class="title">Rostik</h1><img src="~assets/img/logo.svg" alt="">
      </div>
    </nuxt-link>
    <p class="pagename">
      Регистрация
    </p>
    <form name="contact" action="" method="post" id="register-form">
      <label class="form-label" for="name">
        Имя
      </label>
      <input class="form-field" name="name" id="name" placeholder="Наруто Узумаки" />
      <label class="form-label" for="email">
        Email
      </label>
      <input class="form-field" name="email" id="email" placeholder="example@email.com" />
      <label class="form-label" for="email" type="email">
        Пароль
      </label>
      <input class="form-field" name="password" id="password" type="password" placeholder="hardPassword"/>
      <button class="button" type="submit">Зарегистрироваться</button>
    </form>
    </div>
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
  font-size: 40px;
  display: inline-block;
  vertical-align: bottom;
}

.logo img {
  display: inline-block;
  padding-bottom: 5px;
  width: 40px;
}

.logo {
  text-align: center;
  margin-bottom: 10px;
}

input {
  display: block;
  width: 100%;
  margin: 8px 0;
}

#register-form {
  margin: 0 auto;
  width: 300px;
}

.button {
  float: right;
  margin-top: 5px;
}

</style>
