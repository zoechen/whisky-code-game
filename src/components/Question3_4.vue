<template>
  <div>
    <div class="logo">{{ player.userID }} : {{ player.score }}</div>
    <div class="question s03">
      <div v-if="game == 'chart'">
          <div class="flexChart">
            <Line :data="lineData" :options="lineOptions" />
          </div>
          <a-button class="btn" @click="game = 'result'; seeProfit()">查看增值</a-button>
        </div>
        <div v-if="game == 'result'">
          <div class="itemCard">
            <div class="itemContent">
              <p>Dr. No</p>
            </div>
            <div class="itemContent max">
              漲幅 <b>230%</b><br/>總價值提昇為<br />
              金額{{ wine1Totle }}<br />持有數量{{ (wine1old + wine1two + wine1new) }}
            </div>
          </div>
          <div class="itemCard">

            <div class="itemContent">
              <p>Goldfinger</p>
            </div>
            <div class="itemContent max">
              漲幅<b>4295.45%</b><br/>總價值提昇為<br />金額{{ wine2Totle }}<br />持有數量{{ (wine2old + wine2two + wine2new) }}
            </div>
          </div>
          <div class="itemCard">
            <div class="itemContent">
              <p>Thunderball</p>
            </div>
            <div class="itemContent max">
              漲幅<b>912.5%</b><br/>總價值提昇為<br />金額{{ wine3Totle}}<br />持有數量{{ (wine3old + wine3two + wine3new) }}
            </div>
          </div>
         
          <a-button class="btn" @click="setScore()">看看比賽結果</a-button>
        </div>
      </div>
  
    <div class="footer">
      <div class="shadow"></div>
    </div>
  </div>

</template>
<script setup>
import { ref, onMounted, watch, computed } from 'vue'
import { message } from 'ant-design-vue'
import { setupMoneyCost, setStep, getPlayerMoneyCost, player, step, getWine, setupScore } from '../api/index'
import { Line } from 'vue-chartjs'
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
} from 'chart.js'

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend)

const game = ref('chart')
const wine1new = ref(0)
const wine2new = ref(0)
const wine3new = ref(0)
const wine1old = ref(0)
const wine2old = ref(0)
const wine3old = ref(0)
const wine1two = ref(0)
const wine2two = ref(0)
const wine3two = ref(0)
const cost = ref(0)
const score = ref(0)
const money = ref(0)
const total = ref(0)
const moneyLocal = computed(() => Number(money.value).toLocaleString() )
const totalLocal = computed(() => Number(total.value).toLocaleString() )
const wine1Totle = computed(()=> ((wine1old.value + wine1two.value + wine1new.value) * 230000).toLocaleString() ) 
const wine2Totle = computed(()=> ((wine2old.value + wine2two.value + wine2new.value) * 95400).toLocaleString() )
const wine3Totle = computed(()=> ((wine3old.value + wine3two.value + wine3new.value) * 36500).toLocaleString() )

const lineData = {
  labels: ['2015', '2016', '2017', '2018', '2019', '2020', '2021', '2022', '2023'],
  datasets: [
    {
      label: 'Dr. No',
      backgroundColor: '#d97e31',
      borderColor: '#d97e31',
      data: [100, 115, 140, 160, 175, 190, 210, 225, 230]
    },
    {
      label: 'Goldfinger',
      backgroundColor: '#cda674',
      borderColor: '#cda674',
      data: [100, 181, 386, 818, 909, 1500, 2272, 3545, 4295]
    },
    {
      label: 'Thunderbal',
      backgroundColor: '#fff',
      borderColor: '#fff',
      data: [100, 112, 137, 175, 200, 337, 575, 700, 912]
    }
  ]
}

const lineOptions = {
  responsive: true,
  maintainAspectRatio: false,
  plugins: {
    legend: {
      labels: {
        usePointStyle: true,
        color: '#fff'
      }
    }
  },
  scales: {
    x: {
      ticks: {
        color: '#fff'
      }
    },
    y: {
      ticks: {
        color: '#fff'
      }
    }
  }
}

onMounted(() => {
  getWine(player.userID)
  getPlayerMoneyCost(player.userID)
})


function seeProfit(){
  wine1old.value = Number(localStorage.getItem('wine1_1'))
  wine2old.value = Number(localStorage.getItem('wine2_1'))
  wine3old.value = Number(localStorage.getItem('wine3_1'))
  wine1two.value = Number(localStorage.getItem('wine1_2'))
  wine2two.value = Number(localStorage.getItem('wine2_2'))
  wine3two.value = Number(localStorage.getItem('wine3_2'))
  wine1new.value = Number(localStorage.getItem('wine1_3'))
  wine2new.value = Number(localStorage.getItem('wine2_3'))
  wine3new.value = Number(localStorage.getItem('wine3_3'))
  // profit.value = (wine1old.value * 14000 + wine2old.value * 33000 + wine3old.value * 13500) - Number(cost.value)
  score.value = Number(player.score)
  cost.value = Number(player.cost)
  money.value = Number(player.money)
}


function setScore(){
  total.value = (wine1old.value + wine1two.value + wine1new.value) * 230000
                + (wine2old.value + wine2two.value + wine2new.value) * 94500
                + (wine3old.value + wine3two.value + wine3new.value) * 36500
                + money.value

  setupScore(total.value, player)
  setTimeout(()=>{
    goNext()
  },500)
}



function goNext() {
  let next = 'MyScore'
  setStep(next, player)
  step.value = next
}

</script>


