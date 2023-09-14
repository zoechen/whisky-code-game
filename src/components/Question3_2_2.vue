<template>
  <div>
    <div class="logo">{{ player.userID }} : {{ player.score }}</div>
    <div class="question s03">
      <div v-if="game == 'result'">
          <div class="rule">
            <p class="tip">目前的總籌碼有 {{ scoreLocal }} <br />可動用籌碼有 {{ moneyLocal }}</p>
          </div>
          <div class="itemCard">
            <div class="itemContent">
              <h2>Dr. No</h2>
              <img src="../assets/images/macallan-30y.png" alt="" class="pic"/>
            </div>
            <div class="itemContent">
              漲幅 <b>190%</b><br/>總價值提昇為<br />
              金額{{ wine1Totle }}
              <br />持有數量{{ (wine1old + wine1new)  }}
            </div>
            <a-button size="small" class="btn" @click="isVisible = true; redeemItem = 'wine1' " :disabled="(wine1old + wine1new)==0">贖回</a-button>
          </div>
          <div class="itemCard">
            <div class="itemContent">
              <h2>Goldfinger</h2>
              <img src="../assets/images/macallan-edition-no.1.png" alt="" class="pic"/>
            </div>
            <div class="itemContent">
              漲幅<b>909.09%</b><br/>總價值提昇為<br />金額{{ wine2Totle }}
              <br />持有數量{{ (wine2old + wine2new)  }}
            </div>
            <a-button size="small" class="btn" @click="isVisible = true; redeemItem = 'wine2' " :disabled="(wine2old + wine2new)==0">贖回</a-button>
          </div>
          <div class="itemCard">
            <div class="itemContent">
              <h2>Thunderball</h2>
              <img src="../assets/images/macallan12.png" alt="" class="pic"/>
            </div>
            <div class="itemContent">
              漲幅<b>337.5%</b><br/>總價值提昇為<br />金額{{ wine3Totle }}
              <br />持有數量{{ (wine3old + wine3new)  }}
            </div>
            <a-button size="small" class="btn" @click="isVisible = true; redeemItem = 'wine3' " :disabled="(wine3old + wine3new)==0">贖回</a-button>
          </div>
         
          <a-button class="btn" @click="game = 'myScore';setScore()">確定</a-button>
        </div>
        <div v-if="game == 'myScore'">
          <div class="rule">
          <div class="title">總籌碼有</div>
          <div class="tips">{{ scoreLocal }}</div>
          <div class="title"> 可動用籌碼有</div>
          <div class="tips">{{ moneyLocal }}</div>

          <h2>Dr. No</h2>
          <div class="tips"> 持有數量{{ wine1old + wine1new }}</div>
          <h2>Goldfinger</h2>
          <div class="tips"> 持有數量{{ wine2old + wine2new }}</div>
          <h2>Thunderball</h2>
          <div class="tips"> 持有數量{{ wine3old + wine3new }}</div>
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
import { setupMoneyCost, setStep, getPlayerMoneyCost, player, step, getWine, setWineNumber,setupScore } from '../api/index'
import { socket } from "@/socket"

socket.on("adminStep", (v) => {
  if(v == 'investment03'){
    goNext('Question3_3')
  }
})

const game = ref('result')
const wine1new = ref(0)
const wine2new = ref(0)
const wine3new = ref(0)
const wine1old = ref(0)
const wine2old = ref(0)
const wine3old = ref(0)
const cost = ref(0)
const nowscore = ref(0)
const money = ref(0)
const isVisible = ref(false)
const redeemItem = ref('')
const total = ref(0)
const score = ref(0)
const scoreLocal  = computed(() => Number(score.value).toLocaleString() )
const moneyLocal = computed(() => Number(money.value).toLocaleString() )
const totalLocal = computed(() => Number(total.value).toLocaleString() )
const wine1Totle = computed(()=> Number((wine1old.value + wine1new.value) * 190000).toLocaleString() )
const wine2Totle = computed(()=> Number((wine2old.value + wine2new.value)  * 33000).toLocaleString() )
const wine3Totle = computed(()=> Number((wine3old.value + wine3new.value) * 13500).toLocaleString() )


onMounted(() => {
  getWine(player.userID)
  getPlayerMoneyCost(player.userID)
  setTimeout(()=>{
    setALL()
  },1000)

})

function setALL(){
  wine1old.value = Number(localStorage.getItem('wine1_1'))
  wine2old.value = Number(localStorage.getItem('wine2_1'))
  wine3old.value = Number(localStorage.getItem('wine3_1'))
  wine1new.value = Number(localStorage.getItem('wine1_2'))
  wine2new.value = Number(localStorage.getItem('wine2_2'))
  wine3new.value = Number(localStorage.getItem('wine3_2'))
  score.value = localStorage.getItem('score') || player.score
  cost.value = localStorage.getItem('cost') || player.cost
  money.value = localStorage.getItem('money') || player.money
}



function redeemMoney(){
  
  switch (redeemItem.value) {
    case 'wine1':
      cost.value = Number(cost.value) - wine1old.value * 100000
      cost.value = Number(cost.value) - wine1new.value * 140000
      money.value = Number(money.value) + (wine1old.value + wine1new.value) * 190000
      score.value = (wine3old.value + wine3new.value) * 13500 + (wine2old.value + wine2new.value) * 33000 + money.value
      setupScore(score.value, player)
      wine1old.value = 0
      wine1new.value = 0
      setWineNumber(player,{wine1_1:0,wine1_2:0})
      setupMoneyCost(player, cost.value, money.value)

      break;
    case 'wine2':
      cost.value = Number(cost.value) - wine2old.value * 2200
      cost.value = Number(cost.value) - wine2new.value * 8500
      money.value = Number(money.value) + (wine2old.value + wine2new.value) * 33000
      score.value = (wine3old.value + wine3new.value) * 13500 + (wine1old.value + wine1new.value) * 190000 + money.value
      setupScore(score.value, player)
      wine2old.value = 0
      wine2new.value = 0
      setWineNumber(player,{wine2_1:0,wine2_2:0})
      setupMoneyCost(player, cost.value, money.value)

      break;
    case 'wine3':
      cost.value = Number(cost.value) - wine3old.value * 4000
      cost.value = Number(cost.value) - wine3new.value * 5500
      money.value = Number(money.value) + (wine3old.value+wine3new.value) * 13500
      score.value = (wine2old.value + wine2new.value) * 33000 + (wine1old.value + wine1new.value) * 190000 + money.value
      setupScore(score.value, player)
      wine3old.value = 0
      wine3new.value = 0
      setWineNumber(player,{wine3_1:0,wine3_2:0})
      setupMoneyCost(player, cost.value, money.value)

      break;
    default:
      break;
  }
   isVisible.value = false
}

function setScore(){
  setWineNumber(player,{
    wine1_1:wine1old.value,
    wine2_1:wine2old.value,
    wine3_1:wine3old.value,
    wine1_2:wine1new.value,
    wine2_2:wine2new.value,
    wine3_2:wine3new.value
  })
  score.value = player.score
  money.value = player.money
  cost.value = player.cost
  score.value =  (wine1old.value + wine1new.value)* 190000 +  (wine2old.value + wine2new.value)* 33000 +  (wine3old.value + wine3new.value)* 13500 + Number(money.value)
  setupScore(score.value, player)
  localStorage.setItem('wine1_1', wine1old.value)
  localStorage.setItem('wine2_1', wine2old.value)
  localStorage.setItem('wine3_1', wine3old.value)
  localStorage.setItem('wine1_2', wine1new.value)
  localStorage.setItem('wine2_2', wine2new.value)
  localStorage.setItem('wine3_2', wine3new.value)

}

function goNext(next) {
  setStep(next, player)
  step.value = next
}

</script>

