<template>
  <div>
    <div class="logo"></div>
    <div class="question s03">
      <div v-if="game == 'chart'">
          <div class="flexChart">
            <div class="title">3年後</div>
            <Line :data="lineData" :options="lineOptions" />
          </div>
          <a-button class="btn" @click="game = 'result';seeProfit()">查看獲利</a-button>
        </div>
        <div v-if="game == 'result'">
          <div class="rule"><div class="tip">投入成本 {{ cost }} <br/> 可動用籌碼有 {{ money }}</div></div>
          <div class="itemCard">
            <img src="../assets/images/macallan-30y.png" alt="" class="pic"/>
            <div class="itemContent">
              <h2>Dr. No</h2>
              漲幅 <b>190%</b><br/>總價值提昇為<br />
              金額{{ (wine1old + wine1two) * 19000 }}<br/>
            </div>
            <a-button size="small" class="btn" @click="isVisible = true; redeemItem = 'wine1' " :disabled="wine1old==0">贖回</a-button>
          </div>
          <div class="itemCard">
            <img src="../assets/images/macallan12.png" alt="" class="pic"/>
            <div class="itemContent">
              <h2>Goldfinger</h2>
              漲幅<b>909.09%</b><br/>總價值提昇為<br />金額{{ (wine2old + wine2two)  * 33000 }}<br/>
            </div>
            <a-button size="small" class="btn" @click="isVisible = true; redeemItem = 'wine2' " :disabled="wine2old==0">贖回</a-button>
          </div>
          <div class="itemCard">
            <img src="../assets/images/macallan-edition-no.1.png" alt="" class="pic"/>
            <div class="itemContent">
              <h2>Thunderbal</h2>
              漲幅<b>337.5%</b><br/>總價值提昇為<br />金額{{ (wine3old + wine3two) * 13500 }}<br/>
            </div>
            <a-button size="small" class="btn" @click="isVisible = true; redeemItem = 'wine3' " :disabled="wine3old==0">贖回</a-button>
          </div>
         
          <a-button class="btn" @click="game = 'buyit';setScore()">最後加碼收藏</a-button>
        </div>

        <div v-if="game == 'buyit'">
          <div class="title">加碼或贖回</div>
          <div class="rule"><p class="tip">可動用籌碼有 {{ money }} | 投入的籌碼共 {{ cost }}</p></div>
          <div class="itemCard">
            <img src="../assets/images/macallan-30y.png" alt="" class="pic"/>
            <div class="itemContent">
            <h2>Dr. No</h2>
              目前市場價格 190,000/支<br />
              最低購買量 <b>1</b> 支
                <a-input-group compact>
                <a-button @click="wine1new-=1">-</a-button>
                <a-input-number min="0" type="number" v-model:value="wine1new" style="width: 50px" disabled />
                <a-button @click="wine1new+=1">+</a-button>
              </a-input-group>
            </div>
           </div>
          <div class="itemCard">
            <img src="../assets/images/macallan12.png" alt="" class="pic"/>
            <div class="itemContent">

            <h2>Goldfinger</h2>
              目前市場價格 33,000/支<br />
              最低購買量 <b>10</b> 支
              <a-input-group compact>
                <a-button @click="wine2new-=10">-</a-button>
                <a-input-number min="0" type="number" v-model:value="wine2new" style="width: 50px" disabled />
                <a-button @click="wine2new+=10">+</a-button>
              </a-input-group>
              </div>
          </div>
          <div class="itemCard">
            <img src="../assets/images/macallan-edition-no.1.png" alt="" class="pic"/>
            <div class="itemContent">

            <h2>Thunderball</h2>
              目前市場價格 13,500/支<br />
              最低購買量 <b>5</b> 支
              <a-input-group compact>
                <a-button @click="wine3new-=5">-</a-button>
                <a-input-number min="0" type="number" v-model:value="wine3new" style="width: 50px" disabled />
                <a-button @click="wine3new+=5">+</a-button>
              </a-input-group>
              </div>
          </div>

          <a-button class="btn" @click="tobuyWine()">看看到現在的變化</a-button>
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
      <p>贖回將賣出全部的品項，<br/>你確定嗎？</p>
  </a-modal>
</template>
<script setup>
import { ref, onMounted, watch, computed } from 'vue'
import { message } from 'ant-design-vue'
import { setupMoneyCost, setStep, getPlayerMoneyCost, player, step, getWine, setWineNumber } from '../api/index'
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
const notYet =ref(true)
const hours = ref(0)
const mins = ref(0)
const secs = ref(0)
const isVisible = ref(false)
const redeemItem =ref('')


watch(wine1new, (newValue, oldValue) => {
  // if(newX <1) {
  //   message.error("至少買一個")
  // }
  if(newValue < 0) {
    wine1new.value = 0
  }
  
  if(money.value < 190000 && newValue > oldValue) {  
    wine1new.value = oldValue
      message.error("超出可動用籌碼")
  }
  let tempCost = localStorage.getItem("cost")
  let tempMoney = localStorage.getItem("money")
  cost.value = Number(tempCost) + wine1new.value * 190000 + wine2new.value * 33000 + wine3new.value * 13500
  money.value = Number(tempMoney) - wine1new.value * 190000 - wine2new.value * 33000 - wine3new.value * 13500
  
})
watch(wine2new, (newValue, oldValue) => {
  // if(newX <10) {
  //   message.error("至少買十個")
  // }
  if(newValue < 0) {
    wine2new.value = 0
  }
  if(money.value < 330000 && newValue > oldValue){
    wine2new.value = oldValue
    message.error("超出可動用籌碼")
  }
  let tempCost = localStorage.getItem("cost")
  let tempMoney = localStorage.getItem("money")
  cost.value = Number(tempCost) + wine1new.value * 190000 + wine2new.value * 33000 + wine3new.value * 13500
  money.value = Number(tempMoney) - wine1new.value * 190000 - wine2new.value * 33000 - wine3new.value * 13500
 
})
watch(wine3new, (newValue, oldValue) => {
  // if(newX <5) {
  //   message.error("至少買五個")
  // }
  if(newValue < 0) {
    wine3new.value = 0
  }
  if(money.value < (13500*5) && newValue > oldValue) {
    wine3new.value = oldValue
    message.error("超出可動用籌碼")
  }
  let tempCost = localStorage.getItem("cost")
  let tempMoney = localStorage.getItem("money")
  cost.value = Number(tempCost) + wine1new.value * 190000 + wine2new.value * 33000 + wine3new.value * 13500
  money.value = Number(tempMoney) - wine1new.value * 190000 - wine2new.value * 33000 - wine3new.value * 13500
})

const lineData = {
  labels: ['2015', '2016', '2017', '2018', '2019', '2020'],//, '2021', '2022', '2023'
  datasets: [
    {
      label: 'Dr. No',
      backgroundColor: '#d97e31',
      borderColor: '#d97e31',
      data: [100, 115, 140, 160, 175, 190]
    },
    {
      label: 'Goldfinger',
      backgroundColor: '#cda674',
      borderColor: '#cda674',
      data: [100, 181, 386, 818, 909, 1500]
    },
    {
      label: 'Thunderbal',
      backgroundColor: '#fff',
      borderColor: '#fff',
      data: [100, 112, 137, 175, 200, 337]
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
  // profit.value = (wine1old.value * 14000 + wine2old.value * 33000 + wine3old.value * 13500) - Number(cost.value)
  score.value = Number(localStorage.getItem('score'))
  cost.value = localStorage.getItem('cost') || player.cost
  money.value = localStorage.getItem('money') || player.money
}


function redeemMoney(){
  
  switch (redeemItem.value) {
    case 'wine1':
      cost.value = Number(cost.value) - wine1old.value * 100000
      cost.value = Number(cost.value) - wine1two.value * 140000
      money.value = Number(money.value) + (wine1old.value + wine1two.value) * 190000
      wine1old.value = 0
      wine1two.value = 0
      break;
    case 'wine2':
      cost.value = Number(cost.value) - wine2old.value * 2200
      cost.value = Number(cost.value) - wine2two.value * 8500
      money.value = Number(money.value) + (wine2old.value + wine2two.value) * 33000
      wine2old.value = 0
      wine2two.value = 0
      break;
    case 'wine3':
      cost.value = Number(cost.value) - wine3old.value * 4000
      cost.value = Number(cost.value) - wine3two.value * 5500
      money.value = Number(money.value) + (wine3old.value+wine3two.value) * 13500
      wine3old.value = 0
      wine3two.value = 0
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
    wine1_2:wine1two.value,
    wine2_2:wine2two.value,
    wine3_2:wine3two.value
  })
  setupMoneyCost(player, cost.value, money.value)
  localStorage.setItem('wine1_1', wine1old.value)
  localStorage.setItem('wine2_1', wine2old.value)
  localStorage.setItem('wine3_1', wine3old.value)
  localStorage.setItem('wine1_2', wine1two.value)
  localStorage.setItem('wine2_2', wine2two.value)
  localStorage.setItem('wine3_2', wine3two.value)
}


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
  goNext() 
}

function goNext() {
  let next = 'Question3_4'
  setStep(next, player)
  step.value = next
}

</script>


