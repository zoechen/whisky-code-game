<template>
  <div>
    <div class="logo"></div>
    <div class="question s03">
        <div v-if="game == 'buyit'">
          <div class="rule"><p class="tip">目前的籌碼有 {{ score }} | 投入的籌碼共 {{ costLocal }}</p></div>
          <div class="itemCard">
            <img src="../assets/images/macallan-30y.png" alt="" class="pic"/>
            <div class="itemContent">
            <h2>Dr. No</h2>
              目前市場價格 100,000/支<br />
              最低購買量 <b>1</b> 支
                <a-input-group compact>
                <a-button @click="wine1num-=1">-</a-button>
                <a-input-number min="0" type="number" v-model:value="wine1num" style="width: 50px" disabled />
                <a-button @click="wine1num+=1">+</a-button>
              </a-input-group>
            </div>
           </div>
          <div class="itemCard">
            <img src="../assets/images/macallan12.png" alt="" class="pic"/>
            <div class="itemContent">
            <h2>Goldfinger</h2>
              目前市場價格 2,200/支<br />
              最低購買量 <b>10</b> 支
              <a-input-group compact>
                <a-button @click="wine2num-=10">-</a-button>
                <a-input-number min="0" type="number" v-model:value="wine2num" style="width: 50px" disabled />
                <a-button @click="wine2num+=10">+</a-button>
              </a-input-group>
              </div>
          </div>
          <div class="itemCard">
            <img src="../assets/images/macallan-edition-no.1.png" alt="" class="pic"/>

            <div class="itemContent">
            <h2>Thunderball</h2>
              目前市場價格 4,000/支<br />
              最低購買量 <b>5</b> 支
              <a-input-group compact>
                <a-button @click="wine3num-=5">-</a-button>
                <a-input-number min="0" type="number" v-model:value="wine3num" style="width: 50px" disabled />
                <a-button @click="wine3num+=5">+</a-button>
              </a-input-group>
              </div>
          </div>
          <a-button class="btn" @click="tobuyWine">買下去</a-button>
        </div>
        <div v-if="game == 'chart'">
        <div class="itemCard">
          <img src="../assets/images/macallan-30y.png" alt="" class="pic" />
          <div class="itemContent">
            <h2>Dr. No</h2>
            金額{{ wine1old * 100000 }}<br />
            數量{{ wine1old }}
          </div>
          
        </div>
        <div class="itemCard">
          <img src="../assets/images/macallan12.png" alt="" class="pic" />
          <div class="itemContent">
            <h2>Goldfinger</h2>
            金額{{ wine2old * 2200 }}<br />
            數量{{ wine2old }}
          </div>
          
        </div>
        <div class="itemCard">
          <img src="../assets/images/macallan-edition-no.1.png" alt="" class="pic" />
          <div class="itemContent">
            <h2>Thunderbal</h2>
            金額{{ wine3old * 4000 }}<br />
            數量{{ wine3old }}
          </div>
          <a-button size="small" class="btn" @click="isVisible = true; redeemItem = 'wine3'"
            :disabled="wine3old == 0">贖回</a-button>
        </div>
        <a-button class="btn" @click="game = 'result'; seeProfit()">查看獲利</a-button>
      </div>
      <div v-if="game == 'result'">
        <div class="itemCard">
          <img src="../assets/images/macallan-30y.png" alt="" class="pic" />
          <div class="itemContent">
            <h2>Dr. No</h2>
            漲幅 <b>140%</b><br />總價值提昇為<br />
            金額{{ wine1old * 140000 }}<br />
            數量{{ wine1old }}
          </div>
          <a-button size="small" class="btn" @click="isVisible = true; redeemItem = 'wine1'"
            :disabled="wine1old == 0">贖回</a-button>
        </div>
        <div class="itemCard">
          <img src="../assets/images/macallan12.png" alt="" class="pic" />
          <div class="itemContent">
            <h2>Goldfinger</h2>
            漲幅<b>386.36%</b><br />總價值提昇為<br />金額{{ wine2old * 8500 }}<br />數量{{ wine2old }}
          </div>
          <a-button size="small" class="btn" @click="isVisible = true; redeemItem = 'wine2'"
            :disabled="wine2old == 0">贖回</a-button>
        </div>
        <div class="itemCard">
          <img src="../assets/images/macallan-edition-no.1.png" alt="" class="pic" />
          <div class="itemContent">
            <h2>Thunderbal</h2>
            漲幅<b>137.5%</b><br />總價值提昇為<br />金額{{ wine3old * 5500 }}<br />數量{{ wine3old }}
          </div>
          <a-button size="small" class="btn" @click="isVisible = true; redeemItem = 'wine3'"
            :disabled="wine3old == 0">贖回</a-button>
        </div>
        <a-button class="btn" @click="game = 'myScore'; setScore()">目前的籌碼有</a-button>
      </div>
        <div v-if="game == 'myScore'">
        <div class="rule">
          <div class="title">總籌碼有{{ nowscore }}</div>
          <div class="tip"> 可動用籌碼有 {{ money }}</div>
        </div>
          <a-button class="btn" @click="game = 'buyit';">加碼收藏</a-button>
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
import { setupMoneyCost, setStep, getPlayerScore, player, step, setWineNumber } from '../api/index'

const game = ref('buyit')
const wine1num = ref(0)
const wine2num = ref(0)
const wine3num = ref(0)
const cost = ref(0)
const money = ref(0)
const notYet =ref(true)
const hours = ref(0)
const mins = ref(0)
const secs = ref(0)
const score = computed(() => Number(player.score).toLocaleString() )
const costLocal = computed(() => Number(cost).toLocaleString() )

watch(wine1num, (newX) => {
  console.log(newX)
  if(newX <1) {
    message.error("至少買一個")
  }
  if(newX <0) {
    wine1num.value = 0
  }
  cost.value = wine1num.value * 100000 + wine3num.value * 4000 + wine2num.value * 2200
})
watch(wine2num, (newX) => {
  console.log(newX)
  if(newX <10) {
    message.error("至少買十個")
  }
  if(newX <0) {
    wine2num.value = 0
  }
  cost.value = wine1num.value * 100000 + wine3num.value * 4000 + wine2num.value * 2200
})
watch(wine3num, (newX) => {
  console.log(newX)
  if(newX <5) {
    message.error("至少買五個")
  }
  if(newX <0) {
    wine3num.value = 0
  }
  cost.value = wine1num.value * 100000 + wine3num.value * 4000 + wine2num.value * 2200
})



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
  //setupScore(8800000, player) //for test
})

function countdown(){
  let timesUp = 5 //for test
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

function tobuyWine() {
  if (cost.value == 0 ) {
    message.error("都不買太可惜了!!!")
  }else if (cost.value > Number(player.score)) {
    message.error("籌碼不夠!!!再調整一下數量吧")
  } else {
    money.value = Number(player.score) - cost.value
    setWineNumber(player, {
    wine1_1: wine1num.value,
    wine2_1: wine2num.value,
    wine3_1: wine3num.value
    })
    setupMoneyCost( player, cost.value, money.value )
    goNext()
  }
}



function goNext() {
  let next = 'Question3_2'
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
  padding: 10px;
  border-radius: 2rem;
  font-size: 1rem;
}
.question.s03 .rule .tips{
  color: #cda674;
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

.flexChart {
  height: 54vh;
  width: calc(100vw-8rem);
  border-radius: 2rem;
  background-color: rgba(0, 0, 0, 0.5);
  padding: 2rem 0.8rem 4rem 0.8rem;
  margin-bottom: 2rem;
}

.itemCard {
  height: 18vh;
  width: calc(100vw-8rem);
  border-radius: 2rem;
  background-color: rgba(0, 0, 0, 0.5);
  margin-bottom: 1rem;
  display: flex;
}
.itemCard img {
  height: 12vh;
  flex: 1;
  filter:grayscale(100%)
}
.itemCard .itemContent {
  flex: 50vw;
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
  font-size: 1.2rem;
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
  height: 65vh;
  
}
.bloc ul{
  text-align: left;
  font-size: 0.8rem;

}
.bloc p{
  text-align: left;
  font-size: 0.8rem;
}

.bloc .pic{
  margin: 0 auto;
  width: auto;
  height: 4rem;
  filter:grayscale(100%)
}
</style>

