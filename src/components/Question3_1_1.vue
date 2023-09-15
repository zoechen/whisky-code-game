<template>
  <div>
    <div class="logo">探員 {{ player.userID }} 籌碼 {{ player.score }}</div>
    <div class="question s03">
        <div v-if="game == 'buyit'">
          <div class="rule">
            <p class="tip">目前的總籌碼有 {{ score }} <br />可動用籌碼有 {{ moneyLocal }}</p>
          </div>
          <div class="itemCard">
            <img src="../assets/images/macallan-30y.png" alt="" class="pic"/>
            <div class="itemContent max">
            <h2>Dr. No</h2>
              目前市場價格 100,000/支<br />
              最低購買量 <b>1</b> 支
                <a-input-group compact>
                <a-button @click="wine1num-=1" :disabled="wine1num<=0">-</a-button>
                <a-input-number min="0" type="number" v-model:value="wine1num" style="width: 50px" disabled />
                <a-button @click="wine1num+=1" :disabled="money < 100000">+</a-button>
              </a-input-group>
            </div>
           </div>
          <div class="itemCard">
            <img src="../assets/images/macallan-edition-no.1.png" alt="" class="pic"/>
            <div class="itemContent max">
            <h2>Goldfinger</h2>
              目前市場價格 2,200/支<br />
              最低購買量 <b>10</b> 支
              <a-input-group compact>
                <a-button @click="wine2num-=10" :disabled="wine2num<=0">-</a-button>
                <a-input-number min="0" type="number" v-model:value="wine2num" style="width: 50px" disabled />
                <a-button @click="wine2num+=10" :disabled="money < 22000">+</a-button>
              </a-input-group>
              </div>
          </div>
          <div class="itemCard">
            <img src="../assets/images/macallan12.png" alt="" class="pic"/>
            <div class="itemContent max">
            <h2>Thunderball</h2>
              目前市場價格 4,000/支<br />
              最低購買量 <b>5</b> 支
              <a-input-group compact>
                <a-button @click="wine3num-=5" :disabled="wine3num<=0">-</a-button>
                <a-input-number min="0" type="number" v-model:value="wine3num" style="width: 50px" disabled />
                <a-button @click="wine3num+=5" :disabled="money < 20000">+</a-button>
              </a-input-group>
              </div>
          </div>
          <a-button class="btn" @click="game = 'chart';tobuyWine()"> 買下去 </a-button>
        </div>
        <div v-if="game == 'chart'">
          <div class="rule">
            <p class="tip">目前的總籌碼有 {{ score }} <br /> 可動用籌碼有 {{ moneyLocal }}</p>
          </div>
        <div class="itemCard">
          <img src="../assets/images/macallan-30y.png" alt="" class="pic" />
          <div class="itemContent max">
            <h2>Dr. No</h2>
            金額{{ wine1Local }}<br />
            持有數量{{ wine1num }}
          </div>
        </div>
        <div class="itemCard">
          <img src="../assets/images/macallan-edition-no.1.png" alt="" class="pic" />
          <div class="itemContent max">
            <h2>Goldfinger</h2>
            金額{{ wine2Local }}<br />
            持有數量{{ wine2num }}
          </div>
        </div>
        <div class="itemCard">
          <img src="../assets/images/macallan12.png" alt="" class="pic" />
          <div class="itemContent max">
            <h2>Thunderball</h2>
            金額{{ wine3Local }}<br />
            持有數量{{ wine3num }}
          </div>
        </div>
        <a-button class="btn" @click="goNext('Question3_1_2')">看看放兩年後的變化</a-button>
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
import { setupMoneyCost, setStep, getPlayerScore, player, step, setWineNumber,getWine,getPlayerMoneyCost } from '../api/index'

const game = ref('buyit')
const wine1num = ref(0)
const wine2num = ref(0)
const wine3num = ref(0)
const cost = ref(0)
const money = ref(0)
const total = ref(0)
const score = computed(() => Number(player.score).toLocaleString() )
const moneyLocal = computed(() => Number(money.value).toLocaleString() )
const totalLocal = computed(() => Number(total.value).toLocaleString() )
const wine1Local = computed(() => Number(wine1num.value * 100000 ).toLocaleString() )
const wine2Local = computed(() => Number(wine2num.value * 2200 ).toLocaleString() )
const wine3Local = computed(() => Number(wine3num.value * 4000 ).toLocaleString() )
const isVisible = ref(false)
const disabled = ref(false)
const redeemItem = ref('')

watch(wine1num, (newValue, oldValue) => {
  if (newValue < 0 || oldValue < 0) {
    wine1num.value = 0
  }
  
  let tempMoney = localStorage.getItem('score') || player.score
  money.value = Number(tempMoney) - ( wine1num.value * 100000 + wine3num.value * 4000 + wine2num.value * 2200 )
})

watch(wine2num, (newValue, oldValue) => {
  if (newValue < 0 || oldValue < 0) {
    wine2num.value = 0
  }
 
  let tempMoney = localStorage.getItem('score') || player.score
  money.value = Number(tempMoney) - ( wine1num.value * 100000 + wine3num.value * 4000 + wine2num.value * 2200 )
})

watch(wine3num, (newValue, oldValue) => {
  if (newValue < 0 || oldValue < 0) {
    wine3num.value = 0
  }
 
  let tempMoney = localStorage.getItem('score') || player.score
  money.value = Number(tempMoney) - ( wine1num.value * 100000 + wine3num.value * 4000 + wine2num.value * 2200 )
})


onMounted(() => {
  initWine()
  getPlayerScore(player.userID)
  setTimeout(()=>{
  money.value = Number(localStorage.getItem('score') )|| Number(player.score)
  },500)
})

function initWine(){
  setWineNumber(player, {
    wine1_1: 0,
    wine2_1: 0,
    wine3_1: 0,
    wine1_2: 0,
    wine2_2: 0,
    wine3_2: 0,
    wine1_3: 0,
    wine2_3: 0,
    wine3_3: 0
    })
}

function tobuyWine() {
  cost.value = wine1num.value * 100000 + wine3num.value * 4000 + wine2num.value * 2200
  if (money.value == Number(player.score)) {
    message.error("都不買太可惜了!!!")
  } else {
    money.value = Number(player.score) - cost.value
    setWineNumber(player, {
    wine1_1: wine1num.value,
    wine2_1: wine2num.value,
    wine3_1: wine3num.value
    })
    setupMoneyCost( player, cost.value, money.value )
  }
  localStorage.setItem('cost', cost.value)
  localStorage.setItem('score', player.score)
  localStorage.setItem('money', player.money)
  localStorage.setItem('wine1_1', wine1num.value)
  localStorage.setItem('wine2_1', wine2num.value)
  localStorage.setItem('wine3_1', wine3num.value)
  refresh()
  
}
function refresh(){
  getWine(player.userID)
  getPlayerMoneyCost(player.userID)
  setTimeout(()=>{
    wine1num.value = Number(localStorage.getItem('wine1_1'))
    wine2num.value = Number(localStorage.getItem('wine2_1'))
    wine3num.value = Number(localStorage.getItem('wine3_1'))
    cost.value = localStorage.getItem('cost') 
    money.value = localStorage.getItem('money') 
  },500)
}

function goNext(next) {
  setStep(next, player)
  step.value = next
}



</script>


