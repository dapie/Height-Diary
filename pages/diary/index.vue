<template>
  <section class="diary">
    <Header active="2"></Header>
    <div class="profile-info">
      <img src="~/assets/img/person.png">
      <h1 class="name">{{this.$store.state.authUser.name}}</h1>
    </div>
    <div class="average">
      <div class="text">
        <h1 class="number">{{curHeight}}<span>см</span></h1>
        <p class="desc">Ваш текущий рост</p>
      </div>
    </div>
    <form id="height-form" @submit="addHeight">
      <label class="form-label" for="height" id="addHeight">Добавить данные о росте:</label>
      <input class="form-field" name="height" id="height" v-model="height" v-bind:class="{ red: heightEmpty }"/>
      <label class="form-label" for="height">см</label>
      <button class="button" type="submit">Добавить</button>
      <button class="button delete" @click="deleteLast" v-if="curHeight">Удалить последнюю запись</button>
    </form>
    <p class="chartTitle">История изменения роста:</p>
    <select name="" id="" class="selectAmount" v-model="selected">
      <option>Последние</option>
      <option>Все</option>
    </select>
    <div class="chart">
      <line-chart :chartData="lineData" :options="options" v-if="loaded"></line-chart>
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
  data() {
    return {
      loaded: false,
      heights: null,
      curHeight: 0,
      isRunning: false,
      interval: null,
      heightEmpty: false,
      height: null,
      myHeight: 178,
      selected: 'Последние',
      lineData: {
        labels: [],
        datasets: [{
            data: [],
            backgroundColor: [
                'rgba(35, 41, 214, 0.2)',
            ],
            borderColor: [
                'rgba(35, 41, 214, 1)',
            ],
            pointBorderColor: [
            'rgba(35, 41, 214, 1)',
            ],
            borderWidth: 1
        }]
    },
      options: {
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
    }
  },

  methods: {
    toggleTimer() {
      if (this.isRunning) {
        clearInterval(this.interval);
      } else {
        this.curHeight = 0;
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
    async getData() {
      var date
      if(this.isRunning) this.toggleTimer()
      await this.$store.dispatch('height')
      var heights = Object.values(JSON.parse(JSON.stringify(this.$store.state.heights)))
      heights = this.selected == 'Все' ? heights : heights.slice(-10);
      this.lineData.labels = [];
      this.lineData.datasets[0].data = [];
      for(var el in heights){
        date = new Date(heights[el].timestamp)
        this.lineData.labels.push(('0' + date.getDate()).slice(-2)+'.'+('0' + date.getMonth()).slice(-2)+'.'+date.getFullYear())
        this.lineData.datasets[0].data.push(heights[el].height)
      }
      var dataset = this.lineData.datasets[0].data;
      this.myHeight =  dataset[dataset.length-1] ? dataset[dataset.length-1]: 0;
      this.loaded = true
      this.toggleTimer(); 
    },
    addHeight: async function (e){
      e.preventDefault();
      try {
        this.heightEmpty = false;
        if(!this.height || this.height < 0){
          this.heightEmpty = true;
          return
        }
        this.loaded = false;
        await this.$store.dispatch('addHeight', {
          height: this.height,
        })
        this.getData();
      } catch (error) {
        this.errors = error.message
      }
    },
    deleteLast: async function (e){
      e.preventDefault();
      try {
        this.loaded = false;
        await this.$store.dispatch('deleteLast')
        this.getData();
      } catch (error) {
        this.errors = error.message
      }
    }
  },
  watch: {
    selected: function (val) {
      this.loaded = false
      this.getData()
    },
  },
  mounted(){
    this.getData(); 
  },
  middleware: 'authenticated'
}
</script>

<style scoped>
.diary{
  max-width: 1200px;
  padding: 20px 30px;
  margin: 0 auto;
}
.average{
  margin: 10px 0px;
}
.average .icon, .text{
  display: inline-block;
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

.chartTitle{
  color: #2329D6;
  font-size: 18px;
  display: inline-block;
}

.selectAmount{
  margin-left: 10px;
}

.chart{
    width: 100%;
    position: relative;
    padding: 30px 0;
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

.red{
  border: 1px solid #ff0000;
}

@media screen and (max-width: 680px) {
  .average{
    padding: 0;
    margin: 0;
    text-align: center;
  }

  .profile-info{
    padding: 10px 0;
    margin: 0;
    text-align: center;
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
