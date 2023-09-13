<template>
  <div>
    <div class="logo"></div>
    <div class="question s03">
      <div v-if="game == 'buyit'">
        <div class="title">加碼收藏</div>
        <div class="rule">
          <p class="tip">目前的總籌碼有 {{ scoreLocal }} <br />可動用籌碼有 {{ moneyLocal }}</p>
        </div>
        <div class="itemCard">
          <img src="../assets/images/macallan-30y.png" alt="" class="pic" />
          <div class="itemContent">
            <h2>Dr. No</h2>
            目前市場價格 140,000/支<br />
            最低購買量 <b>1</b> 支
            <a-input-group compact>
              <a-button @click="wine1new -= 1">-</a-button>
              <a-input-number min="0" type="number" v-model:value="wine1new" style="width: 50px" disabled />
              <a-button @click="wine1new += 1">+</a-button>
            </a-input-group>
          </div>
        </div>
        <div class="itemCard">
          <img src="../assets/images/macallan-edition-no.1.png" alt="" class="pic" />
          <div class="itemContent">
            <h2>Goldfinger</h2>
            目前市場價格 8,500/支<br />
            最低購買量 <b>10</b> 支
            <a-input-group compact>
              <a-button @click="wine2new -= 10">-</a-button>
              <a-input-number min="0" type="number" v-model:value="wine2new" style="width: 50px" disabled />
              <a-button @click="wine2new += 10">+</a-button>
            </a-input-group>
          </div>
        </div>
        <div class="itemCard">
          <img src="../assets/images/macallan12.png" alt="" class="pic" />
          <div class="itemContent">
            <h2>Thunderball</h2>
            目前市場價格 5,500/支<br />
            最低購買量 <b>5</b> 支
            <a-input-group compact>
              <a-button @click="wine3new -= 5">-</a-button>
              <a-input-number min="0" type="number" v-model:value="wine3new" style="width: 50px" disabled />
              <a-button @click="wine3new += 5">+</a-button>
            </a-input-group>
          </div>
        </div>
        <a-button class="btn" @click="game = 'chart'">買下去</a-button>
      </div>
      <div v-if="game == 'chart'">
          <div class="rule">
            <p class="tip">目前的總籌碼有 {{ scoreLocal }} <br />可動用籌碼有 {{ moneyLocal }}</p>
          </div>
        <div class="itemCard">
          <img src="../assets/images/macallan-30y.png" alt="" class="pic" />
          <div class="itemContent">
            <h2>Dr. No</h2>
            金額{{ wine1Local }}<br />
            持有數量{{ (wine1old + wine1new) }}
          </div>
        </div>
        <div class="itemCard">
          <img src="../assets/images/macallan-edition-no.1.png" alt="" class="pic" />
          <div class="itemContent">
            <h2>Goldfinger</h2>
            金額{{ wine2Local }}<br />
            持有數量{{ (wine2old + wine2new) }}
          </div>
        </div>
        <div class="itemCard">
          <img src="../assets/images/macallan12.png" alt="" class="pic" />
          <div class="itemContent">
            <h2>Thunderbal</h2>
            金額{{ wine3Local}}<br />
            持有數量{{ (wine3old + wine3new) }}
          </div>
        </div>
        <a-button class="btn" @click="tobuyWine()">看看放兩年後的變化</a-button>
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
import { setupMoneyCost, setStep, getPlayerMoneyCost, player, step, getWine, setWineNumber,setupScore } from '../api/index'

const game = ref('buyit')
const wine1new = ref(0)
const wine2new = ref(0)
const wine3new = ref(0)
const wine1old = ref(0)
const wine2old = ref(0)
const wine3old = ref(0)
const cost = ref(0)
const money = ref(0)
const total = ref(0)
const score = ref(0)
const scoreLocal  = computed(() => Number(score.value).toLocaleString() )
const moneyLocal = computed(() => Number(money.value).toLocaleString() )
const totalLocal = computed(() => Number(total.value).toLocaleString() )
const wine1Local = computed(() => Number((wine1old.value + wine1new.value) * 140000  ).toLocaleString() )
const wine2Local = computed(() => Number((wine2old.value + wine2new.value) * 8500 ).toLocaleString() )
const wine3Local = computed(() => Number((wine3old.value + wine3new.value) * 5500 ).toLocaleString() )

watch(wine1new, (newValue, oldValue) => {
  // if(newX <1) {
  //   message.error("至少買一個")
  // }
  if (newValue < 0) {
    wine1new.value = 0
  }

  if (money.value < 140000 && newValue >= oldValue) {
    wine1new.value = oldValue
    message.error("超出可動用籌碼")
  }
  let tempCost = localStorage.getItem("cost")
  let tempMoney = localStorage.getItem("money")
  cost.value = Number(tempCost) + wine1new.value * 140000 + wine2new.value * 8500 + wine3new.value * 5500
  money.value = Number(tempMoney) - wine1new.value * 140000 - wine2new.value * 8500 - wine3new.value * 5500

})
watch(wine2new, (newValue, oldValue) => {
  // if(newX <10) {
  //   message.error("至少買十個")
  // }
  if (newValue < 0) {
    wine2new.value = 0
  }
  if (money.value < 85000 && newValue >= oldValue) {
    wine2new.value = oldValue
    message.error("超出可動用籌碼")
  }
  let tempCost = localStorage.getItem("cost")
  let tempMoney = localStorage.getItem("money")
  cost.value = Number(tempCost) + wine1new.value * 140000 + wine2new.value * 8500 + wine3new.value * 5500
  money.value = Number(tempMoney) - wine1new.value * 140000 - wine2new.value * 8500 - wine3new.value * 5500

})
watch(wine3new, (newValue, oldValue) => {
  // if(newX <5) {
  //   message.error("至少買五個")
  // }
  if (newValue < 0) {
    wine3new.value = 0
  }
  if (money.value < (5500 * 5) && newValue >= oldValue) {
    wine3new.value = oldValue
    message.error("超出可動用籌碼")
  }
  let tempCost = localStorage.getItem("cost")
  let tempMoney = localStorage.getItem("money")
  cost.value = Number(tempCost) + wine1new.value * 140000 + wine2new.value * 8500 + wine3new.value * 5500
  money.value = Number(tempMoney) - wine1new.value * 140000 - wine2new.value * 8500 - wine3new.value * 5500
})


onMounted(() => {
  getWine(player.userID)
  getPlayerMoneyCost(player.userID)
  setTimeout(()=>{
  wine1old.value = Number(localStorage.getItem('wine1_1'))
  wine2old.value = Number(localStorage.getItem('wine2_1'))
  wine3old.value = Number(localStorage.getItem('wine3_1'))
  // profit.value = (wine1old.value * 14000 + wine2old.value * 8500 + wine3old.value * 5500) - Number(cost.value)
  score.value = localStorage.getItem('score') || player.score
  cost.value = localStorage.getItem('cost') || player.cost
  money.value = localStorage.getItem('money') || player.money
  },500)
})


function tobuyWine() {
  setWineNumber(player, {
    wine1_2: wine1new.value,
    wine2_2: wine2new.value,
    wine3_2: wine3new.value
  })
  setupMoneyCost(player, cost.value, money.value)
  localStorage.setItem('wine1_2', wine1new.value)
  localStorage.setItem('wine2_2', wine2new.value)
  localStorage.setItem('wine3_2', wine3new.value)
  
  goNext('Question3_2_2')
}

function goNext(next) {
  setStep(next, player)
  step.value = next
}

</script>

