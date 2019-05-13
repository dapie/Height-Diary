<template>
  <section class="diary">
    <Header active="1"></Header>
    <div class="profile-info">
      <img src="~/assets/img/person.png">
      <h1 class="name">Denis Tkachev</h1>
    </div>
    <div class="average">
      <div class="text">
        <h1 class="number">{{curHeight}}<span>см</span></h1>
        <p class="desc">Ваш текущий рост</p>
      </div>
    </div>
    <form id="height-form" @submit="">
      <label class="form-label" for="email">Добавить данные о росте:</label>
      <input class="form-field" name="height" id="height" placeholder="170" v-model="height" v-bind:class="{ red: heightEmpty }"/>
      <label class="form-label" for="email">
        см 
      </label>
      <button class="button" type="submit">Добавить</button>
    </form>
    <div class="chart">
      <line-chart :chartData="lineData" :options="options"></line-chart>
    </div>
  </section>
</template>

<script>
import axios from '~/plugins/axios'
import Header from '~/components/Header.vue'
import LineChart from '~/plugins/LineChart.js'

export default {
  components: {
    Header,
    LineChart
  },
  head () {
    return {
      title: 'Rostik: Дневник'
    }
  },
  asyncData () {
    const lineData = {
        labels: ['11.04.2017', '12.04.2017', '13.04.2017', '14.04.2017', '15.04.2017', '16.04.2017'],
        datasets: [{
            label: '',
            data: [178, 179, 179, 180, 181, 181],
            backgroundColor: [
                'rgba(35, 41, 214, 0.2)',
            ],
            borderColor: [
                'rgba(35, 41, 214, 1)',
                'rgba(35, 41, 214, 1)',
                'rgba(35, 41, 214, 1)',
                'rgba(35, 41, 214, 1)',
                'rgba(35, 41, 214, 1)',
                'rgba(35, 41, 214, 1)',
            ],
            pointBorderColor: [
            'rgba(35, 41, 214, 1)',
            ],
            borderWidth: 1
        }]
    } // some data
    const options = {
        responsive: true,
        maintainAspectRatio: false,
        scales: {
          yAxes: [{
            display: true,
            gridLines: {
              display: true
            },
            scaleLabel: {
              display: true,
              labelString: 'Рост'
            }
          }],
          xAxes: [{
            gridLines: {
              display: false
            },
            scaleLabel: {
              display: true,
              labelString: 'Дата'
            }
          }]
        },
        legend: {
          display: false
        },
    }
    return { lineData, options }
  },
  data() {
    return {
      curHeight: 0,
      isRunning: false,
      interval: null,
      heightEmpty: false,
      height: null,
      myHeight: 178
    }
  },
  methods: {
    toggleTimer() {
      if (this.isRunning) {
        clearInterval(this.interval);
      } else {
        this.interval = setInterval(this.incrementTime, 0);
      }
      this.isRunning = !this.isRunning
    },
    incrementTime() {
      this.curHeight = parseInt(this.curHeight) + 1;
      if(this.curHeight >= this.myHeight){
        this.curHeight = this.myHeight;
        this.toggleTimer();
      }
    },
  },
  mounted(){
    this.toggleTimer();
  },
  middleware: 'authenticated'
}
</script>

<style scoped>
.diary{
  width: 100%;
  max-width: 1200px;
  min-width: 500px;
  padding: 20px 30px;
  margin: 0 auto;
}
.average{
  margin: 10px 0px;
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

.chart{
    width: 100%;
    height: 300px;
    position: relative;
    margin-top: 30px;
    display:inline-block;
}

.profile-info{
  margin: 30px 0;
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

#height {
  width: 60px;
  margin-left: 10px;
}

.form-label{
  color: #2329D6;
}

#height-form{
  margin: 20px 0;
}

#height-form .button{
  margin-left: 10px;
}

</style>
