<template>
  <div>
    <div class="logo"></div>
    <div class="question s03">
      <div v-if="game == 'chart'">
          <div class="flexChart">
            <div class="title">又過了3年後</div>
            <Line :data="lineData" :options="lineOptions" />
          </div>
          <a-button class="btn" @click="game = 'result'; seeProfit()">查看獲利</a-button>
        </div>
        <div v-if="game == 'result'">
          <div class="rule"><div class="tip">投入成本 {{ cost }} <br/> 可動用籌碼有 {{ money }}</div></div>
          <div class="itemCard">
            <img src="../assets/images/dr_no.png" alt="" />
            <div class="itemContent">
              <h2>Dr. No</h2>
              漲幅 <b>230%</b><br/>總價值提昇為<br />
              金額{{ (wine1old + wine1two + wine1new) * 230000 }}<br/>
            </div>
          </div>
          <div class="itemCard">
            <img src="../assets/images/Goldfinger.png" alt="" />
            <div class="itemContent">
              <h2>Goldfinger</h2>
              漲幅<b>4295.45%</b><br/>總價值提昇為<br />金額{{ (wine2old + wine2two + wine2new)  * 95400 }}<br/>
            </div>
          </div>
          <div class="itemCard">
            <img src="../assets/images/Thunderball.png" alt="" />
            <div class="itemContent">
              <h2>Thunderbal</h2>
              漲幅<b>912.5%</b><br/>總價值提昇為<br />金額{{ (wine3old + wine3two + wine3new) * 36500 }}<br/>
            </div>
          </div>
         
          <a-button class="btn" @click="game = 'buyit';setScore()">看看比賽結果</a-button>
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
import dayjs from 'dayjs'

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
const isVisible = ref(false)
const redeemItem =ref('')



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
  money.value += (wine1old.value + wine1two.value + wine1new.value) * 230000
  money.value += (wine2old.value + wine2two.value + wine2new.value) * 94500
  money.value += (wine3old.value + wine3two.value + wine3new.value) * 36500

  setupScore(money.value, player)

  goNext()
}



function goNext() {
  let next = 'MyScore'
  setStep(next, player)
  step.value = next
}

</script>
<style>
.question.s03 {
  width: 100vw;
  height: 82vh;
  background: url('../assets/images/oak-bg.jpg') no-repeat center;
  background-position: bottom center;
  background-size: auto 105%;
  padding: 5% 2rem;
  text-align: center;
}
.question.s03 .title {
  color: #d5cdc4;
  font-size: 1.6rem;
  text-shadow: #000 0.01rem 0.01rem;
}
.question.s03 .tips {
  color: #cda674;
  font-size: 1.4rem;
  text-shadow: #000 0.01rem 0.01rem;
}
.question.s03 .btn {
  background-color: #cda674;
}
.question.s03 .btn:hover {
  color: #d5cdc4;
  border-color: #d5cdc4;
  background-color: #552917;
}
.question.s03 .rule{
  margin: 0.4rem auto;
  background-color: rgba(0, 0, 0, 0.8);
  width: 100%;
  padding: 18px;
  border-radius: 2rem;
}
.amount {
  color: #cda674;
  font-size: 1.4rem;
  margin-bottom: 2rem;
}
.item {
  text-align: center;
  padding: 1rem 0;
  color: #d5cdc4;
}

.pic {
  margin: 0 auto;
  width: auto;
  height: 12rem;
}
.flexChart {
  height: 54vh;
  width: calc(100vw-8rem);
  border-radius: 2rem;
  background-color: rgba(0, 0, 0, 0.5);
  padding: 2rem 0.8rem 4rem 0.8rem;
  margin-bottom: 2rem;
}


.itemCard {
  height: 15vh;
  width: calc(100vw-8rem);
  border-radius: 2rem;
  background-color: rgba(0, 0, 0, 0.5);
  margin-bottom: 1rem;
  display: flex;
}
.itemCard img {
  flex: 1;
  width: auto;
}
.itemCard .itemContent {
  flex: 12rem;
  float: left;
  color: #cda674;
  padding: 0.4rem;
  text-align: left;
}
.itemCard .itemContent h2{
  color: #d5cdc4;
}
.itemCard .btn{
  flex: auto;
  margin-top: 2.8rem;
  margin-right: 0.8rem;
}

.ant-modal .ant-modal-content{
  color: #d5cdc4;
  background-color: #000;
  
}
.ant-modal .ant-modal-content p{
  font-size: 1.4rem;
}
.ant-modal-footer .ant-btn-primary{
  background-color: #552917;
}
.ant-input-number-disabled{
  background-color: #d5cdc4;
}
.bloc {
  width: 100%;
  text-align: center;
  color: #d5cdc4;
  border-radius: 2rem;
  background-color: rgba(0, 0, 0, 0.5);
  padding: 2rem;
  height: 40rem;
  
}
.bloc ul{
  text-align: left;
  font-size: 0.8rem;

}
.bloc p{
  text-align: left;
  font-size: 1.0rem;
}

.bloc .pic{
  margin: 0 auto;
  width: auto;
  height: 8rem;
}
</style>

