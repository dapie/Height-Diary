<template>
  <section class="admin">
    <Header active="1"></Header>
    <transition name="fade">
      <div class="modal" v-if="showModal">
        <div class="modal-content">
          <p class="text"> Удалить аккаунт? </p>
          <button class="button delete" @click="deleteAccount">Удалить</button>
          <button class="button cancel" @click="toggleModal">Отмена</button>
        </div>
      </div>
   </transition>
    <div class="grid">
      <div class="column">
        <div class="profile-info">
          <h1 class="name">Пользователи</h1>
          <v-select v-model="selected" :options="options" class="search"></v-select>
          <select class="list" v-model="selectedHeight"  v-if="userinfo" multiple>
            <option class="list-element" v-if="heights" v-for="height in heights" v-bind:value="height.id">{{height.text}}</option>
          </select>
        </div>
      </div>
      <div class="column">
        <div class="profile-info" v-if="userinfo">
          <img src="~/assets/img/person.png">
          <h1 class="name">{{userinfo.name}} [{{userinfo.email}}]</h1>
        </div>
        <div v-if="userinfo" class="edits">
          <input class="nameInput" type="text" v-model="username"><br>
          <button class="button right" @click="changeName">Изменить имя</button>
          <button class="button delete" @click="toggleAdmin" v-if="userinfo.isAdmin && userinfo.email != $store.state.authUser.email">Убрать администратора</button>
          <button class="button" @click="toggleAdmin" v-if="!userinfo.isAdmin">Назначить администратором</button>
          <button class="button delete full" v-if="selectedHeight[0]" @click="deleteHeights">Удалить выделленые записи</button>
          <button class="button delete bottom" v-if="userinfo.email != $store.state.authUser.email" @click="toggleModal">Удалить аккаунт</button>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import axios from '~/plugins/axios'
import Header from '~/components/Header.vue'
import LineChart from '~/plugins/LineChart.js'
import VueSelect from '~/plugins/vue-select.js'

export default {
  components: {
    Header,
    LineChart,
    VueSelect
  },
  head () {
    return {
      title: 'Rostik: Панель администратора'
    }
  },
  data() {
    return {
      selected: 'Поиск',
      options: [],
      userinfo: null,
      selectedHeight: [],
      heights: [],
      username: "",
      showModal: false
    }
  },

  methods: {
    async getData() {
      await this.$store.dispatch('getUsers')
      var users = Object.values(JSON.parse(JSON.stringify(this.$store.state.users)))
      var options = []
      users.forEach(function(el){
        options.push({
          label: el.email + " <" + el.name + ">",
          id: el.id
        })
      })
      this.options = options
    },
    async getUserInfo(){
      await this.$store.dispatch('getUserInfo', {
        id: this.selected.id,
      })
      this.userinfo = this.$store.state.userinfo
      this.heights = []
      for(var id in this.userinfo.heights){
        this.heights.push({
          text: "["+this.userinfo.heights[id].timestamp+"] "+this.userinfo.heights[id].height,
          id: this.userinfo.heights[id].id
        })
      }
      this.username = this.userinfo.name
    },
    async toggleModal(){
      this.showModal = !this.showModal
    },
    async toggleAdmin(){
      await this.$store.dispatch('toggleAdmin', {
        email: this.userinfo.email,
      })
      this.getUserInfo()
    },
    async changeName(){
      await this.$store.dispatch('changeName', {
        email: this.userinfo.email,
        name: this.username
      })
      this.getUserInfo()
    },
    async deleteHeights(){
      await this.$store.dispatch('deleteHeights', {
        id: this.selectedHeight
      })
      this.getUserInfo()
    },
    async deleteAccount(){
      await this.$store.dispatch('deleteAccount', {
        email: this.userinfo.email
      })
      this.userinfo = null
      this.selected = "Поиск"
      this.toggleModal();
      this.getData()
    }
  },
  watch: {
    selected: function (val) {
      if(this.selected != null)
        this.selectedHeight = []
        this.getUserInfo()
    },
  },
  mounted(){
    this.getData(); 
  },
  middleware: 'administrator'
}
</script>

<style scoped>
.modal{
  width: 100%;
  height: 100vh;
  background: rgba(35,41,214,0.3);
  position: absolute;
  top: 0;
  left: 0;
  z-index: 999;
  transition: opacity .5s;
}

.modal-content{
  background: #fff;
  display: inline-block;
  padding: 30px 60px;
  text-align: center;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  border-radius: 10px;
}

.modal-content .button{
  margin-top: 10px;
}

.modal-content .button:last-child{
  margin-left: 10px;
}

.fade-enter-active, .fade-leave-active {
  transition: all .2s;
}
.fade-enter, .fade-leave-to{
  opacity: 0;
}

.admin{
  max-width: 1200px;
  padding: 20px 30px;
  margin: 0 auto;
}

.nameInput {
  width: 100%;
}

.grid{
  display: grid;
  grid-template-rows: 1fr;
  grid-template-columns: 1fr 1fr;
  grid-gap: 2vw;
  position: relative;
}

.search {
  display: block;
  margin-bottom: 20px;
}

.button.bottom{
  position: absolute;
  bottom: 20px;
  right: 0;
}

.edits {
  margin-top: 10px;
}

.full {
  width: 100%;
}

.edits .button{
  margin-top: 10px;
}

.right {
  float: right;
}

.list {
  background: #fff;
  border: 1px solid #EBEBFF;
  border-radius: 6px;
  height: 400px;
  display: block;
  width: 100%;
}

.list-element{
  border-bottom: 1px solid #EBEBFF;
  height: 40px;
  overflow: hidden;
}

.button.delete{
  border: 1px solid #FF5252;
  color: #FF5252;
}

.button.delete:hover{
  border: 1px solid #FF5252;
  background: #FF5252;
  color: #fff;
}

.profile-info{
  margin: 20px 0;
}

.profile-info img{
  display: inline-block;
  width: 50px;
}

.profile-info .name{
  display: inline-block;
  line-height: 50px;
  color: #2329D6;
  font-size: 24px;
  vertical-align: middle;
}

@media screen and (max-width: 980px){
  .button{
    width: 100%;
  }

  .button.bottom{
    position: relative;
    top: 10px;
  }
}

@media screen and (max-width: 680px) {
  .grid{
    display: block;
    padding-bottom: 40px;
  }

  .profile-info .name{
    font-size: 20px;
  }

  .profile-info img {
    vertical-align: middle;
    width: 32px;
  }

  #height-form{
    text-align: center;
  }
  
  #addHeight {
    display: block;
    margin: 10px 0;
  }

  #height {
    margin: 0px 10px 0px 0px;
  }
  
  #height-form .button{
    margin: 0px 20px;
  }

  .desc{
    text-align: center;
  }

  .diary{
    padding: 20px 5px;
  }

  .chartTitle{
    color: #2329D6;
    text-align: center;
    display: block;
  }

  .selectAmount{
    display: block;
    margin: 0 auto;
  }
}

</style>
