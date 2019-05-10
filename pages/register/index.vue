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
    <p v-if="errors" class="error">
      {{errors}}
    </p>
    <form id="register-form" @submit="sendForm">
      <label for="name">
        Имя
      </label>
      <input name="name" id="name" placeholder="Наруто Узумаки" v-model="name" v-bind:class="{ red: nameHasError }"/>
      <label for="email">
        Email
      </label>
      <input name="email" id="email" placeholder="example@email.com" v-model="email" v-bind:class="{ red: emailHasError }"/>
      <label for="email" type="email">
        Пароль (минимум 8 символов)
      </label>
      <input name="password" id="password" type="password" placeholder="∙∙∙∙∙∙∙∙∙∙" v-model="password" v-bind:class="{ red: passwordHasError }"/>
      <button class="button" type="submit">Зарегистрироваться</button>
    </form>
  </section>
</template>

<script>
import axios from '~/plugins/axios'

export default {
  data () {
    return { 
      name: null,
      password: null,
      email: null,
      nameHasError: false,
      emailHasError: false,
      passwordHasError: false,
      errors: null,
    }
  },
  async asyncData () {
  },
  head () {
    return {
      title: 'Rostik: Регистрация'
    }
  },
  methods: {
    sendForm: async function (e) {
      e.preventDefault();
      this.nameHasError = false;
      this.emailHasError = false;
      this.passwordHasError = false;
      this.errors = null;

      var emailValid = /^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
      var nameValid = /^[a-zA-Zа-яА-я ]+$/;

      if (!this.name || !nameValid.test(this.name)) {
        this.nameHasError = true;
        this.errors
      }
      if (!emailValid.test(this.email)) {
        this.emailHasError = true;
      }
      if (!this.password || this.password.length < 8) {
        this.passwordHasError = true;
      }
      if(!this.nameHasError&& !this.emailHasError && !this.passwordHasError){
        try {
          let { data } = await axios.post('/api/register', {
            name: this.name,
            email: this.email,
            password: this.password
          })
          data.error ? this.errors = data.error : null;
        } catch (error) {
          console.log(error);
        }
      }
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
  display: block;
}

.button {
  float: right;
  margin-top: 5px;
  display: inline-block;
}

.red {
  border: 1px solid #ff0000;  
}

.error {
  color: #ff0000;
  text-align: center;
  margin-bottom: 10px;
}

</style>
