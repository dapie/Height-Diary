<template>
  <section class="container">
    <nuxt-link to='/'>
      <div class="logo">
        <h1 class="title">Rostik</h1><img src="~assets/img/logo.svg" alt="">
      </div>
    </nuxt-link>
    <p class="pagename">
      Вход в аккаунт
    </p>
    <p v-if="errors" class="error">
      {{errors}}
    </p>
    <form id="login-form" @submit="sendForm">
      <label class="form-label" for="email">
        Email
      </label>
      <input class="form-field" name="email" id="email" placeholder="example@email.com" v-model="email" v-bind:class="{ red: emailEmpty }"/>
      <label class="form-label" for="email" type="email">
        Пароль
      </label>
      <input class="form-field" name="password" id="password" type="password" placeholder="∙∙∙∙∙∙∙∙∙∙" v-model="password" v-bind:class="{ red: passwordEmpty }"/>
      <button class="button" type="submit">Войти</button>
    </form>
    </div>
  </section>
</template>

<script>
import axios from '~/plugins/axios'

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
  head () {
    return {
      title: 'Rostik: Вход в аккаунт'
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
          let { data } = await axios.post('/api/login', {
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

#login-form {
  margin: 0 auto;
  width: 300px;
}

.button {
  float: right;
  margin-top: 5px;
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
