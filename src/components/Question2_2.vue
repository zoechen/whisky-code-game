<template>
  <div class="logo"> <div v-if="!notYet" class="score">您目前有 {{ player.score }}</div> </div>
  <div class="question s02">
  <div v-if="notYet">
    <p class="title">恭喜您現在的籌碼有<br/>{{  player.score  }}</p>
    <p class="tip">請耐心等待，我們將於</p>
    <p class="title"> {{ hours }} : {{ mins }} : {{ secs }}</p>
    <p class="tip">後進行下一個有趣的遊戲!</p>
  </div>
  <div v-else>
  <div v-if="game == 'rule'">
    <p class="title">{{ player.name }},來增加您的資產吧！</p>
    <p class="tips">
      隨機配對，二人一組<br />
      雙人都選合作，各得 1 2 萬<br />
      雙人都選獨享，各賠 8 萬<br />
      一人獨享一人合作，選獨享得 1 5 萬<br />
      選合作賠 8 萬
    </p>
    <div class="action"><a-button size="large" class="btn" @click="matchPlayer">開始配對!</a-button></div>
  </div>
  <div class="pk" v-if="game == 'gamble01'">
    <p class="tips">第一局</p>
    <p class="title">{{ player.name }},你的對手是{{ competitor }}</p>
    <!-- <a-button class="btn w50" size="large" @click="goGamble('team')">合作</a-button>
    <a-button class="btn w50" size="large" @click="goGamble('sole')">獨享</a-button> -->
    <a-button class="btn w50" size="large" @click="()=>{game = 'result01'}">合作</a-button>
    <a-button class="btn w50" size="large" @click="()=>{game = 'result01'}">獨享</a-button>
  </div>
  <div v-if="game == 'result01'">
    <!-- <div class="los" v-if="result == 1">恭喜!您和{{ competitor }}各得 120,000</div>
    <div class="pin" v-if="result == 2">啊,賠了 80,000</div>
    <div class="win" v-if="result == 3">恭喜獨享 150,000</div> -->
    <div class="los">
      <p class="res">啊,賠了 80,000</p>
    </div>
    <a-button class="btn next" size="large" type="primary" @click="()=>{game = 'gamble02'}">下一題</a-button>
  </div>
  <div class="pk" v-if="game == 'gamble02'">
    <p class="tips">第二局</p>
    <p class="title">{{ player.name }},你的對手是{{ competitor }}</p>
    <a-button class="btn w50" size="large" @click="()=>{game = 'result02'}">合作</a-button>
    <a-button class="btn w50" size="large" @click="()=>{game = 'result02'}">獨享</a-button>
  </div>
  <div v-if="game == 'result02'">
    <div class="pin" >
      <p class="res">恭喜!<br/>您和{{ competitor }}<br/>各得 120,000</p>
    </div>
    <a-button class="btn next" size="large" type="primary" @click="()=>{game = 'gamble03'}">下一題</a-button>
  </div>
  <div class="pk" v-if="game == 'gamble03'">
    <p class="tips">第三局</p>
    <p class="title">{{ player.name }},你的對手是{{ competitor }}</p>
    <a-button class="btn w50" size="large" @click="()=>{game = 'result03'}">合作</a-button>
    <a-button class="btn w50" size="large" @click="()=>{game = 'result03'}">獨享</a-button>
  </div>
  <div v-if="game == 'result03'">
    <div class="win">
      <p class="res">
        恭喜獨享 150,000
      </p>
    </div>
    <a-button class="btn next" size="large" type="primary" @click="goNext">下一題</a-button>

  </div>
</div>
</div>
<div class="footer">
  
</div>
</template>
<script setup>
import { ref, onMounted } from 'vue'
import { step, setStep, setupScore, getPlayerScore, getPlayerList, playerList, player } from '../api/index'
import dayjs from 'dayjs'

const game = ref('rule')
const result = ref(0)
const competitor = ref('')
const notYet =ref(true)
const hours = ref(0)
const mins = ref(0)
const secs = ref(0)
const nowscore = ref(0)


onMounted(() => {
  getPlayerList()
  getPlayerScore(player.userID)
  countdown()
})

function countdown(){
  let timesUp = 10
  let time = setInterval(() => {
  let future  = Date.parse("August 31, 2023 10:30:00");
  let now     = new Date();
  let diff    = future - now;
  let days  = Math.floor( diff / (1000*60*60*24) );
  let h = Math.floor( diff / (1000*60*60) );
  let m  = Math.floor( diff / (1000*60) );
  let s  = Math.floor( diff / 1000 );
    timesUp -=1
    nowscore.value = localStorage.getItem('score')

    if(timesUp < 0){
      notYet.value = false
      clearInterval(time)
    }else{
      hours.value  = h - days  * 24;
      mins.value = m  - h * 60;
      secs.value = s  - m * 60;
    }
  }, 1000);

}

function matchPlayer() {
  let index = playerList.value.indexOf(player.name)
  playerList.value.splice(index, 1)
  let competitorList = playerList.value
  console.log(competitorList)
  let rnd = Math.floor(Math.random() * competitorList.length)
  competitor.value = competitorList[rnd]
  game.value = 'gamble01'
}

// function goGamble(g) {
//   if (g == 'team') {
//     result.value = Math.floor(Math.random() * 2) + 1
//   } else {
//     result.value = Math.floor(Math.random() * 3) + 2
//   }
//   game.value = 'result'
// }

function goNext() {
  let score = Number(player.score)
  switch (result.value) {
    case 1:
      score += 120000
      break
    case 2:
      score += 150000
      break
    case 3:
      score -= 80000
      break
    default:
      break
  }
  console.log(score)
  setupScore(score, player)
  let next = 'Question3_1'
  setStep(next, player)
  step.value = next
  
}
</script>
