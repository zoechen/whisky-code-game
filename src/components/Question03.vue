<template>
  <div>
    <div class="logo"></div>
    <div class="question s03">
      <div class="flex flex-col justify-center" v-if="game == 'rule'">
        <p class="title">
          {{ player.name }}探員,<br />
          我們發現三支值得投資的酒，利用他們來增加您的資產吧!!
          <br /><br /><br />
          先聽聽 whisky code 的分享
        </p>
        <a-button
          class="btn"
          @click="
            () => {
              game = 'buyit'
            }
          "
          >好</a-button
        >
      </div>
      <div class="flex flex-col justify-center" v-if="game == 'buyit'">
        <p class="tip">您目前有 {{ player.score }}</p>
        <a-carousel :after-change="onChange">
          <div class="item">
            <h2>Dr. No</h2>
            <img src="../assets/images/macallan-30y.png" class="pic" alt="" />
            目前市場價格 100,000/支<br />
            最低購買量 ___ 支

            <a-input-group compact>
              <a-button @click="wine1num--">-</a-button>
              <a-input type="number" v-model:value="wine1num" style="width: 50px" />
              <a-button @click="wine1num++">+</a-button>
            </a-input-group>
            <p class="amount">金額{{ 100000 * wine1num }}</p>
          </div>
          <div class="item">
            <h2>Goldfinger</h2>
            <img src="../assets/images/macallan12.png" class="pic" alt="" />

            目前市場價格 2,200/支<br />
            最低購買量 ___ 支
            <a-input-group compact>
              <a-button @click="wine2num--">-</a-button>
              <a-input type="number" v-model:value="wine2num" style="width: 50px" />
              <a-button @click="wine2num++">+</a-button>
            </a-input-group>
            金額{{ 2200 * wine2num }}
          </div>
          <div class="item">
            <h2>Thunderbal</h2>
            <img src="../assets/images/macallan-edition-no.1.png" class="pic" alt="" />
            目前市場價格 4,000/支<br />
            最低購買量 ___ 支
            <a-input-group compact>
              <a-button @click="wine3num--">-</a-button>
              <a-input type="number" v-model:value="wine3num" style="width: 50px" />
              <a-button @click="wine3num++">+</a-button>
            </a-input-group>
            金額{{ 4000 * wine3num }}
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
      <div class="flex flex-col justify-center" v-if="game == 'result'">
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
        <a-button class="btn" @click="goNext">下一題</a-button>
      </div>
    </div>
    <div class="footer">
      <div class="shadow"></div>
    </div>
  </div>
</template>
<script setup>
import { ref, onMounted } from 'vue'
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

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend)

const game = ref('rule')
const wine1num = ref(0)
const wine2num = ref(0)
const wine3num = ref(0)
const wine1win = ref(0)
const wine2win = ref(0)
const wine3win = ref(0)
const openMessage = () => {
  message.error('錢錢不太夠唷！')
}

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
  getPlayerScore(player.userID)
})

function buyWine() {
  wine1win.value = wine1num.value * 100000 * 0.4
  wine2win.value = wine1num.value * 4000 * 2.86
  wine3win.value = wine1num.value * 2200 * 0.37
  let cost = wine1win.value + wine2win.value + wine3win.value + 106200
  let win = player.score + wine1win.value + wine2win.value + wine3win.value
  console.log(win)
  if (cost > player.score) {
    openMessage()
  } else {
    setupScore(win, player)
    game.value = 'chart'
  }
}

function goNext() {
  let next = 'MyScore'
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
.question.s03 .btn {
  background-color: #cda674;
}
.amount {
  color: #cda674;
  font-size: 1.4rem;
}
.item {
  text-align: center;
  padding: 1rem 0;
  color: #d5cdc4;
}

.pic {
  width: auto;
  height: 20rem;
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
  height: 18vh;
  width: calc(100vw-8rem);
  border-radius: 2rem;
  background-color: rgba(0, 0, 0, 0.5);
  margin-bottom: 1rem;
}
.itemCard .pic {
  height: 18vh;
  filter: blur(2px);
  float: left;
  padding: 0.8rem;
}
.itemCard .itemContent {
  color: #cda674;
  padding-top: 1.4rem;
  padding-right: 2rem;
}
</style>
