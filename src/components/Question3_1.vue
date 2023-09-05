<template>
  <div>
    <div class="logo"></div>
    <div class="question s03">
      <div v-if="notYet" class="info">
        <div class="rule">
        <p class="title">恭喜您現在的籌碼有<br/>{{  player.score  }}</p>
        <p class="tip">請耐心等待，我們將於</p>
        <p class="title"> {{ hours }} : {{ mins }} : {{ secs }}</p>
        <p class="tip">後進行下一個有趣的遊戲!</p>
      </div>
      </div>
      <div v-else>
        <div v-if="game == 'rule'">
          
          <div class="rule">
            <p class="title">{{ player.name }}探員,<br /></p>
          <p class="tips">
            我們發現三支值得投資的酒，利用他們來增加您的資產吧!!
          </p>
          <p class="title">先聽聽<br/> whisky code 的分享</p>
        </div>
            
          <a-button
            class="btn"
            @click="
              () => {
                game = 'buyit'
              }
            "
            >好</a-button>
        
        </div>
        <div v-if="game == 'buyit'">
          <div class="rule"><p class="tip">您目前有 {{ player.score }}</p></div>
          
          <a-carousel :after-change="onChange" arrows>
            <template #prevArrow>
              <div style="left: 10px; z-index: 999;color: #fff; font-size: 2rem;">
                 
              </div>
            </template>
            <template #nextArrow>
              <div style="right: 10px;color: #fff;font-size: 2rem;">
                 
              </div>
            </template>
            <div class="item">
              <h2>Dr. No</h2>
              <img src="../assets/images/macallan-30y.png" class="pic" alt="" />
              目前市場價格 100,000/支<br />
              最低購買量 <b>1</b> 支

              <a-input-group compact>
                <a-button @click="wine1num--">-</a-button>
                <a-input-number min="0" type="number" v-model:value="wine1num" style="width: 50px" />
                <a-button @click="wine1num++">+</a-button>
              </a-input-group>
              <p class="amount">金額{{ 100000 * wine1num }}</p>
            </div>
            <div class="item">
              <h2>Goldfinger</h2>
              <img src="../assets/images/macallan12.png" class="pic" alt="" />

              目前市場價格 2,200/支<br />
              最低購買量 <b>10</b> 支
              <a-input-group compact>
                <a-button @click="wine2num--">-</a-button>
                <a-input-number min="0" type="number" v-model:value="wine2num" style="width: 50px" />
                <a-button @click="wine2num++">+</a-button>
              </a-input-group>
              <p class="amount">金額{{ 2200 * wine2num }}</p>
            </div>
            <div class="item">
              <h2>Thunderbal</h2>
              <img src="../assets/images/macallan-edition-no.1.png" class="pic" alt="" />
              目前市場價格 4,000/支<br />
              最低購買量 <b>5</b> 支
              <a-input-group compact>
                <a-button @click="wine3num--">-</a-button>
                <a-input-number min="0" type="number" v-model:value="wine3num" style="width: 50px" />
                <a-button @click="wine3num++">+</a-button>
              </a-input-group>
              <p class="amount">金額{{ 2200 * wine2num }}</p>
            </div>
          </a-carousel>

          <a-button class="btn" @click="buyWine">買下去</a-button>
        </div>
        <div v-if="game == 'chart'">
          <div class="flexChart">
            <div class="title">2年後</div>
            <Line :data="lineData" :options="lineOptions" />
          </div>
          <a-button class="btn" @click="game = 'result'">查看獲利</a-button>
        </div>
        <div v-if="game == 'result'">
          <div class="rule"><div class="tip">投入成本{{ cost }} <br/> 可動用資金{{ money }}</div></div>
          
          <div class="itemCard">
            <img src="../assets/images/macallan-30y.png" class="pic" alt="" />
            <div class="itemContent">
              <h2>Dr. No</h2>
              漲幅140%<br />恭喜賺了<br />
              金額{{ wine1win }}
            </div>
          </div>
          <div class="itemCard">
            <img src="../assets/images/macallan12.png" class="pic" alt="" />
            <div class="itemContent">
              <h2>Goldfinger</h2>
              漲幅386.36%<br />恭喜賺了<br />金額{{ wine2win }}
            </div>
          </div>
          <div class="itemCard">
            <img src="../assets/images/macallan-edition-no.1.png" class="pic" alt="" />
            <div class="itemContent">
              <h2>Thunderbal</h2>
              漲幅137.5%<br />恭喜賺了<br />金額{{ wine3win }}
            </div>
          </div>
          <a-button class="btn" @click="noRedeem">不要贖回</a-button> <a-button class="btn" @click="isVisible = true">我要贖回</a-button>
          
        </div>
      </div>
    </div>
    <div class="footer">
      <div class="shadow"></div>
    </div>
  </div>

  <a-modal
      v-model:visible="isVisible"
      title=""
      ok-text="確認"
      cancel-text="取消"
      id="redeemDialog"
      :bodyStyle="{color: '#d5cdc4'}"
      @ok="redeemMoney"
    >
      <p>贖回將賣出全部的品項，<br/>你確定嗎？<br/>你的利潤是{{ profit }}</p>
  </a-modal>
</template>
<script setup>
import { ref, onMounted, watch } from 'vue'
import { message } from 'ant-design-vue'
import { setupScore, setStep, getPlayerScore, player, step } from '../api/index'
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

const game = ref('rule')
const wine1num = ref(1)
const wine2num = ref(10)
const wine3num = ref(5)
const wine1win = ref(0)
const wine2win = ref(0)
const wine3win = ref(0)
const cost = ref(0)
const profit = ref(0)
const money = ref(0)
const notYet =ref(true)
const hours = ref(0)
const mins = ref(0)
const secs = ref(0)
const isVisible = ref(false)
const openMessage = () => {
  message.error('錢錢不太夠唷！')
}

watch(wine1num, (newX) => {
  console.log(newX)
  if(newX <1) {
    message.error("至少買一個")
  }
  if(newX <0) {
    wine1num.value = 0
  }
})
watch(wine2num, (newX) => {
  console.log(newX)
  if(newX <10) {
    message.error("至少買十個")
  }
  if(newX <0) {
    wine2num.value = 0
  }
})
watch(wine3num, (newX) => {
  console.log(newX)
  if(newX <5) {
    message.error("至少買五個")
  }
  if(newX <0) {
    wine3num.value = 0
  }
})

const lineData = {
  labels: ['2016', '2017', '2018'], // '2019', '2020', '2021', '2022', '2023'
  datasets: [
    {
      label: 'Dr. No',
      backgroundColor: '#d97e31',
      borderColor: '#d97e31',
      data: [100, 115, 140]
    },
    {
      label: 'Goldfinger',
      backgroundColor: '#cda674',
      borderColor: '#cda674',
      data: [100, 181, 386]
    },
    {
      label: 'Thunderbal',
      backgroundColor: '#fff',
      borderColor: '#fff',
      data: [100, 112, 137]
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
  countdown()
  getPlayerScore(player.userID)
  setupScore(8800000, player)
})

function countdown(){
  let timesUp = 5
  let time = setInterval(() => {
  let future  = Date.parse("2023-09-15T18:00:00");
  let now     = new Date();
  let diff    = future - now;
  let days  = Math.floor( diff / (1000*60*60*24) );
  let h = Math.floor( diff / (1000*60*60) );
  let m  = Math.floor( diff / (1000*60) );
  let s  = Math.floor( diff / 1000 );
    timesUp -=1

    if(timesUp < 0){
      notYet.value = false
      clearInterval(time)
    }else{
      hours.value  = addZero(h - days  * 24);
      mins.value = addZero(m  - h * 60);
      secs.value = addZero(s  - m * 60);
    }
  }, 1000);
}

function addZero(num){
  if(parseInt(num)<10){
    return '0'+ num
  }else{
    return num
  }
}

function buyWine() {

  cost.value = wine1num.value * 100000 + wine3num.value * 4000 + wine2num.value * 2200
 
  wine1win.value = Number(wine1num.value * 100000 * 0.4)
  wine2win.value = Number(wine3num.value * 4000 * 2.86)
  wine3win.value = Number(wine2num.value * 2200 * 0.37)
  profit.value = wine1win.value + wine2win.value + wine3win.value
  money.value = Number(player.score) - cost.value
  console.log(money.value)
  if (cost.value > Number(player.score)) {
    message.error(cost.value +":"+ player.score)
  } else {
    
    game.value = 'chart'
  }
}

function redeemMoney(){
  localStorage.setItem('wine1num',0)
  localStorage.setItem('wine2num',0)
  localStorage.setItem('wine3num',0)
  localStorage.setItem('cost',cost.value)
  let win = Number(player.score) + profit.value
  setupScore(win, player)
  goNext()
}

function noRedeem(){
  localStorage.setItem('wine1num',wine1num.value)
  localStorage.setItem('wine2num',wine2num.value)
  localStorage.setItem('wine3num',wine3num.value)
  localStorage.setItem('cost',cost.value)
  setupScore(money.value, player)
  goNext()
}

function goNext() {
  let next = 'Question3_2'
  setStep(next, player)
  step.value = next
}
</script>
<style>
.question.s03 {
  width: 105vw;
  height: 82vh;
  background: url('../assets/images/oak-bg.jpg') no-repeat center;
  background-position: bottom center;
  background-size: auto 100%;
  padding: 10% 4rem;
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
  filter: blur(5px);
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
}
.itemCard .pic {
  height: 15vh;
  filter: blur(2px);
  float: left;
  padding: 0.8rem;
}
.itemCard .itemContent {
  color: #cda674;
  padding-top: 0.4rem;
  padding-right: 2rem;
}
.itemCard .itemContent h2{
  color: #d5cdc4;
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
</style>
