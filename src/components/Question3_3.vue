<template>
  <div>
    <div class="logo">探員 {{ player.userID }} 籌碼 {{ player.score }}</div>
    <div class="question s03">
        <div v-if="game == 'buyit'">
          <div class="title">最後加碼收藏</div>
          <div class="rule">
            <p class="tip">目前的總籌碼有 {{ scoreLocal }} <br />可動用籌碼有 {{ moneyLocal }}</p>  
          </div>
          <div class="itemCard">
            <img src="../assets/images/macallan-30y.png" alt="" class="pic"/>
            <div class="itemContent max">
            <h2>Dr. No</h2>
              目前市場價格 190,000/支<br />
              最低購買量 <b>1</b> 支
                <a-input-group compact>
                <a-button @click="wine1new-=1" :disabled="wine1new<=0" >-</a-button>
                <a-input-number min="0" type="number" v-model:value="wine1new" style="width: 50px" disabled />
                <a-button @click="wine1new+=1" :disabled="money<190000" >+</a-button>
              </a-input-group>
            </div>
           </div>
          <div class="itemCard">
            <img src="../assets/images/macallan12.png" alt="" class="pic"/>
            <div class="itemContent max">

            <h2>Goldfinger</h2>
              目前市場價格 33,000/支<br />
              最低購買量 <b>10</b> 支
              <a-input-group compact>
                <a-button @click="wine2new-=10" :disabled="wine2new<=0">-</a-button>
                <a-input-number min="0" type="number" v-model:value="wine2new" style="width: 50px" disabled />
                <a-button @click="wine2new+=10" :disabled="money<330000">+</a-button>
              </a-input-group>
              </div>
          </div>
          <div class="itemCard">
            <img src="../assets/images/macallan-edition-no.1.png" alt="" class="pic"/>
            <div class="itemContent max">

            <h2>Thunderball</h2>
              目前市場價格 13,500/支<br />
              最低購買量 <b>5</b> 支
              <a-input-group compact>
                <a-button @click="wine3new-=5" :disabled="wine3new<=0">-</a-button>
                <a-input-number min="0" type="number" v-model:value="wine3new" style="width: 50px" disabled />
                <a-button @click="wine3new+=5" :disabled="money<(13500*5)">+</a-button>
              </a-input-group>
              </div>
          </div>

          <a-button class="btn" @click="game = 'chart';tobuyWine()">買下去</a-button>
        </div>
       
        <div v-if="game == 'chart'">
          <div class="itemCard">
            <img src="../assets/images/macallan-30y.png" alt="" class="pic"/>
            <div class="itemContent max">
            <h2>Dr. No</h2>
            金額{{ wine1Totle }}<br />
            持有數量{{ (wine1old + wine1two + wine1new) }}
            </div>
           </div>
          <div class="itemCard">
            <img src="../assets/images/macallan12.png" alt="" class="pic"/>
            <div class="itemContent max">

            <h2>Goldfinger</h2>
            金額{{ wine2Totle }}<br />
            持有數量{{ (wine2old + wine2two + wine2new) }}
          </div>
          </div>
          <div class="itemCard">
            <img src="../assets/images/macallan-edition-no.1.png" alt="" class="pic"/>
            <div class="itemContent max">

            <h2>Thunderball</h2>
            金額{{ wine3Totle }}<br />
            持有數量{{ (wine3old + wine3two + wine3new) }}
          </div>
          </div>
          <a-button class="btn" @click="goNext()">看看到現在的變化</a-button>
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
import { setupMoneyCost, setStep, getPlayerMoneyCost, player, step, getWine, setWineNumber } from '../api/index'

const game = ref('buyit')
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
const scoreLocal  = computed(() => Number(score.value).toLocaleString() )
const moneyLocal = computed(() => Number(money.value).toLocaleString() )
const wine1Totle = computed(()=> ((wine1old.value + wine1two.value + wine1new.value) * 190000).toLocaleString() ) 
const wine2Totle = computed(()=> ((wine2old.value + wine2two.value + wine2new.value) * 33000).toLocaleString() )
const wine3Totle = computed(()=> ((wine3old.value + wine3two.value + wine3new.value) * 13500).toLocaleString() )


watch(wine1new, (newValue, oldValue) => {
 
  if(newValue < 0 || oldValue < 0) {
    wine1new.value = 0
  }
  let tempCost = localStorage.getItem("cost")
  let tempMoney = localStorage.getItem("money")
  cost.value = Number(tempCost) + wine1new.value * 190000 + wine2new.value * 33000 + wine3new.value * 13500
  money.value = Number(tempMoney) - wine1new.value * 190000 - wine2new.value * 33000 - wine3new.value * 13500
  
})
watch(wine2new, (newValue, oldValue) => {

  if(newValue < 0 || oldValue < 0) {
    wine2new.value = 0
  }

  let tempCost = localStorage.getItem("cost")
  let tempMoney = localStorage.getItem("money")
  cost.value = Number(tempCost) + wine1new.value * 190000 + wine2new.value * 33000 + wine3new.value * 13500
  money.value = Number(tempMoney) - wine1new.value * 190000 - wine2new.value * 33000 - wine3new.value * 13500
 
})
watch(wine3new, (newValue, oldValue) => {
 
  if(newValue < 0 || oldValue < 0) {
    wine3new.value = 0
  }
  let tempCost = localStorage.getItem("cost")
  let tempMoney = localStorage.getItem("money")
  cost.value = Number(tempCost) + wine1new.value * 190000 + wine2new.value * 33000 + wine3new.value * 13500
  money.value = Number(tempMoney) - wine1new.value * 190000 - wine2new.value * 33000 - wine3new.value * 13500
})

onMounted(() => {
  getWine(player.userID)
  getPlayerMoneyCost(player.userID)
  setTimeout(()=>{
  wine1old.value = Number(localStorage.getItem('wine1_1'))
  wine2old.value = Number(localStorage.getItem('wine2_1'))
  wine3old.value = Number(localStorage.getItem('wine3_1'))
  wine1two.value = Number(localStorage.getItem('wine1_2'))
  wine2two.value = Number(localStorage.getItem('wine2_2'))
  wine3two.value = Number(localStorage.getItem('wine3_2'))
  score.value = localStorage.getItem('score') || player.score
  cost.value = localStorage.getItem('cost') || player.cost
  money.value = localStorage.getItem('money') || player.money
  },500)
})

function tobuyWine(){
  setWineNumber(player,{
    wine1_3:wine1new.value,
    wine2_3:wine2new.value,
    wine3_3:wine3new.value
  })
  setupMoneyCost(player, cost.value, money.value)
  localStorage.setItem('wine1_3', wine1new.value)
  localStorage.setItem('wine2_3', wine2new.value)
  localStorage.setItem('wine3_3', wine3new.value)
  refresh()
}

function refresh(){
  getWine(player.userID)
  getPlayerMoneyCost(player.userID)
  setTimeout(()=>{
  wine1old.value = Number(localStorage.getItem('wine1_1'))
  wine2old.value = Number(localStorage.getItem('wine2_1'))
  wine3old.value = Number(localStorage.getItem('wine3_1'))
  wine1two.value = Number(localStorage.getItem('wine1_2'))
  wine2two.value = Number(localStorage.getItem('wine2_2'))
  wine3two.value = Number(localStorage.getItem('wine3_2'))
  score.value = localStorage.getItem('score') || player.score
  cost.value = localStorage.getItem('cost') || player.cost
  money.value = localStorage.getItem('money') || player.money
  },500)
}

function goNext() {
  let next = 'Question3_4'
  setStep(next, player)
  step.value = next
}

</script>


