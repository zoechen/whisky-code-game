<template>
  <div>
    <div class="logo">探員 {{ player.userID }} 籌碼 {{ player.score }}</div>
    <div class="question s03">
      <div v-if="game == 'result'">
        <div class="itemCard">
            <img src="../assets/images/macallan-30y.png" alt="" />
          <div class="itemContent max">
            <h2>Dr. No</h2>
            漲幅 <b>140%</b><br />總價值提昇為<br />
            金額{{ wine1Totle }}<br />
            持有數量{{ wine1num }}
          </div>
          <div class="itemContent">
          <a-button size="small" class="btn" @click="isVisible = true; redeemItem = 'wine1'"
            :disabled="wine1num == 0">贖回</a-button>
          </div>
        </div>
        <div class="itemCard">
          <img src="../assets/images/macallan-edition-no.1.png" alt="" />
          <div class="itemContent max">
            <h2>Goldfinger</h2>
            漲幅<b>386.36%</b><br />總價值提昇為<br />金額{{ wine2Totle }}<br />持有數量{{ wine2num }}
            
          </div>
          <div class="itemContent">
            <a-button size="small" class="btn" @click="isVisible = true; redeemItem = 'wine2'"
            :disabled="wine2num == 0">贖回</a-button>
          </div>
          
        </div>
        <div class="itemCard">
          <img src="../assets/images/macallan12.png" alt=""  />
          <div class="itemContent max">
            <h2>Thunderball</h2>
            漲幅<b>137.5%</b><br />總價值提昇為<br />金額{{ wine3Totle }}<br />持有數量{{ wine3num }}
          
          </div>
          
          <div class="itemContent">
            <a-button size="small" class="btn" @click="isVisible = true; redeemItem = 'wine3'"
            :disabled="wine3num == 0">贖回</a-button>
          </div>
    
        </div>
        <a-button class="btn" @click="setScore()">確定</a-button>
      </div>
        <div v-if="game == 'myScore'">
        <div class="rule">
          <div class="title">總籌碼有</div>
          <div class="tips">{{ scoreLocal }}</div>
          <div class="title"> 可動用籌碼有</div>
          <div class="tips">{{ moneyLocal }}</div>

          <h2>Dr. No</h2>
          <div class="tips"> 持有數量{{ wine1num }}</div>
          <h2>Goldfinger</h2>
          <div class="tips"> 持有數量{{ wine2num }}</div>
          <h2>Thunderball</h2>
          <div class="tips"> 持有數量{{ wine3num }}</div>
        </div>
      </div>
    </div>
    <div class="footer">
      <div class="shadow"></div>
    </div>
  </div>
  <a-modal v-model:visible="isVisible" title="" ok-text="確認" cancel-text="取消" id="redeemDialog"
    :bodyStyle="{ color: '#d5cdc4' }" @ok="redeemMoney()">
    <p>贖回將賣出全部的品項，<br />你確定嗎？</p>
  </a-modal>
</template>
<script setup>
import { ref, onMounted, watch, computed } from 'vue'
import { message } from 'ant-design-vue'
import { setupMoneyCost, setStep, getPlayerScore, player, step, setWineNumber,setupScore,getWine } from '../api/index'
import { socket } from "@/socket"

socket.on("adminStep", (v) => {
  if(v == 'investment02' && isDone){
    goNext('Question3_2_1')
  }
})
const game = ref('result')
const wine1num = ref(0)
const wine2num = ref(0)
const wine3num = ref(0)
const cost = ref(0)
const money = ref(0)
const total = ref(0)
const score = ref(0)
const scoreLocal  = computed(() => Number(score.value).toLocaleString() )
const moneyLocal = computed(() => Number(money.value).toLocaleString() )
const totalLocal = computed(() => Number(total.value).toLocaleString() )
const isVisible = ref(false)
const isDone = ref(false)
const redeemItem = ref('')
const wine1Totle = computed(()=> Number(wine1num.value * 140000 ).toLocaleString() )
const wine2Totle = computed(()=> Number(wine2num.value * 8500 ).toLocaleString() )
const wine3Totle = computed(()=> Number(wine3num.value * 5500 ).toLocaleString() )

onMounted(() => {
  getWine(player.userID)
  getPlayerScore(player.userID)
  setTimeout(()=>{
    setALL()
  },1000)

})

function setALL(){
    money.value = player.money 
    score.value = player.score
    cost.value = player.cost
    wine1num.value = Number(localStorage.getItem('wine1_1'))
    wine2num.value = Number(localStorage.getItem('wine2_1'))
    wine3num.value = Number(localStorage.getItem('wine3_1'))
    total.value = wine1num.value * 140000 + wine2num.value * 8500 + wine3num.value * 5500 
}

function redeemMoney() {

switch (redeemItem.value) {
  case 'wine1':
    cost.value = Number(cost.value) - Number(wine1num.value * 100000)
    money.value = Number(money.value) + Number(wine1num.value * 140000)
    score.value = Number(wine3num.value * 5500) + Number(wine2num.value * 8500) + Number(money.value)
    wine1num.value = 0
    setupScore(score.value, player)
    setWineNumber(player, { wine1_1: 0 })
    setupMoneyCost(player, cost.value, money.value)
    break;
  case 'wine2':
    cost.value = Number(cost.value) - Number(wine2num.value * 2200)
    money.value = Number(money.value) + Number(wine2num.value * 8500)
    score.value =  Number(wine1num.value * 14000) + Number(wine3num.value * 5500) + Number(money.value)
    wine2num.value = 0
    setupScore(score.value, player)
    setWineNumber(player, { wine2_1: 0 })
    setupMoneyCost(player, cost.value, money.value)
    break;
  case 'wine3':
    cost.value = Number(cost.value) - Number(wine3num.value * 4000)
    money.value = Number(money.value) + Number(wine3num.value * 5500)
    score.value =  Number(wine1num.value * 14000) + Number(wine2num.value * 8500) + Number(money.value)
    wine3num.value = 0
    setupScore(score.value, player)
    setWineNumber(player, { wine3_1: 0 })
    setupMoneyCost(player, cost.value, money.value)
    break;
  default:
    break;
}
isVisible.value = false
}


function setScore() {
  setWineNumber(player, {
    wine1_1: wine1num.value,
    wine2_1: wine2num.value,
    wine3_1: wine3num.value
  })
  money.value = player.money
  cost.value = player.cost
  score.value =  Number(wine1num.value * 14000) + Number(wine2num.value * 8500) + Number(wine3num.value * 5500) + Number(money.value)
  setupScore(score.value, player)
  localStorage.setItem('wine1_1', wine1num.value)
  localStorage.setItem('wine2_1', wine2num.value)
  localStorage.setItem('wine3_1', wine3num.value)
  isDone.value = true
  game.value = 'myScore';
}


function goNext(next) {
  setStep(next, player)
  step.value = next
}




</script>


