<template>
  <section class="leaderboard">
    <Header active="2"></Header>
    <div class="average" v-if="average">
      <img class="icon" src="~/assets/img/line-chart.png"/>
      <div class="text">
        <h1 class="number">{{curAverage}}<span>см</span></h1>
        <p class="desc">Средний рост пользователей сервиса</p>
      </div>
    </div>
    <div class="info">
      <h1 class="name">Топ-10</h1>
      <table class="top">
        <tr v-for="(item, index) in top">
          <td class="number">#{{parseInt(index)+1}}</td>
          <td class="username">{{item.name}}</td>
          <td class="userheight">{{item.height}}</td>
        </tr>
      </table>
      <table class="top your" v-if="yourResult">
        <tr>
          <td class="number">#{{yourResult.number}}</td>
          <td class="username">{{yourResult.name}}</td>
          <td class="userheight">{{yourResult.height}}</td>
        </tr>
      </table>
    </div>
  </section>
</template>

<script>
import axios from '~/plugins/axios'
import Header from '~/components/Header.vue'

export default {
  data () {
    return { 
      curAverage: 0.0,
      average: null,
      top: null,
      yourResult: null
    }
  },
  components: {
    Header
  },
  head () {
    return {
      title: 'Rostik: Топ-10'
    }
  },
  methods: {
    toggleTimer() {
      if (this.isRunning) {
        clearInterval(this.interval);
      } else {
        this.curAverage = 0;
        this.interval = setInterval(this.incrementTime, 0);
      }
      this.isRunning = !this.isRunning
    },
    incrementTime() {
      this.curAverage = parseFloat(this.curAverage) + 1.1;
      if(this.curAverage >= this.average){
        this.curAverage = this.average;
        this.toggleTimer();
        return
      }
      this.curAverage = this.curAverage.toFixed(1)
    },
    async getData() {
      await this.$store.dispatch('leaderboards')
      var leaderboards = JSON.parse(JSON.stringify(this.$store.state.leaderboards))
      this.average = leaderboards.average    
      this.top = leaderboards.top  
      this.yourResult = leaderboards.your
      this.toggleTimer(); 
    },
  },
  mounted() {
    this.getData();
  },
  middleware: 'authenticated'
}
</script>

<style scoped>
.leaderboard{
  max-width: 1200px;
  padding: 20px 30px;
  margin: 0 auto;
}

.info{
  margin: 30px 0;
}

.info img{
  display: inline-block;
  width: 50px;
}

.info .name{
  text-align: center;
  line-height: 50px;
  color: #2329D6;
  font-size: 24px;
  vertical-align: middle;
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

.average .number{
  font-size: 72px;
  font-weight: bold;
}

.average .number span{
  font-size: 48px;
  margin-left: 10px;
}

.top {
  width: 500px;
  background: #fff;
  border-radius: 10px;
  box-shadow: 0px 6px 18px rgba(0, 0, 0, 0.06);
  color: #2329D6;
  font-size: 18px;
  font-weight: bold;
  margin: 0 auto;
}

.top .userheight{
  text-align: center;
}

.top th, .top td {
  padding: 15px;
  text-align: left;
}

.top tr {
  border-top: 1px solid #EBEFF2;
}

.top tr:first-child {
  border-top: none;
}

.top.your{
  margin-top: 10px;
}

.height-image{
  display: inline-block;
}

@media screen and (max-width: 680px) {
  .average .text{
    text-align: center;
  }

  .average .icon{
    width: 100px;
  }

  .leaderboard{
    padding: 20px 5px;
  }

  .top{
    width: 100%;
    font-size: 14px;
  }
}
</style>
