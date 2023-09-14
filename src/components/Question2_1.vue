<template>
  <div>
    <div class="logo">{{ player.userID }} : {{ player.score }}</div>
    <div class="question s02">
    
      <div class="pk" v-if="game == 'gambleWait'">
        <p class="tips">第{{ n }}局</p>
        <p class="title">{{ player.name }},你的對手是{{ competitorName || "AI ROBOT" }}</p>
        <a-button class="btn w50" size="large" disabled>合作</a-button>
        <a-button class="btn w50" size="large" disabled>獨享</a-button>
        <div class="tips">準備一下，馬上要開始了</div>
      </div>
      <div class="pk" v-if="game == 'gamble'">
        <p class="tips">第{{ n }}局</p>
        <p class="title">{{ player.name }},你的對手是{{ competitorName || "AI ROBOT" }}</p>
        <a-button class="btn w50" :class="{ active: result == 'team' }" size="large"
          @click="result = 'team'">合作</a-button>
        <a-button class="btn w50" :class="{ active: result == 'solo' }" size="large"
          @click="() => result = 'solo'">獨享</a-button>
        <p class="tips"><b>{{ wait }}</b></p>
      </div>
      <div class="pk" v-if="game == 'resultWait'">
        <p class="tips">第{{ n }}局</p>
        <p class="title">{{ player.name }},你的對手是{{ competitorName || "AI ROBOT" }}</p>
        <a-button class="btn w50" :class="{ active: result == 'team' }" size="large" disabled>合作</a-button>
        <a-button class="btn w50" :class="{ active: result == 'solo' }" size="large" disabled>獨享</a-button>
      </div>
      <div v-if="game == 'result'" class="end">
        <div v-if="end == '3'" class="pk"></div>
        <div v-if="end == '-1'" class="los">
          <p class="res">啊,賠了 10,000</p>
        </div>
        <div v-if="end == '0'" class="los">
          <p class="res">啊,賠了 80,000</p>
        </div>
        <div v-if="end == '1'" class="pin">
          <p class="res">恭喜!<br />您和{{ competitorName || "AI ROBOT" }}<br />各得 120,000</p>
        </div>
        <div v-if="end == '2'" class="win">
          <p class="res">
            恭喜獨享 150,000
          </p>
        </div>
        <a-button class="btn next" size="large" type="primary" @click="() => { goNext() }">下一局</a-button>
      </div>
    </div>
    <div class="footer">
    </div>
  </div>
</template>
<script setup>
import { ref, onMounted, computed, watch} from 'vue'
import { step, setStep, setupScore, getPlayerScore, player, 
        getPK, pkData, updateResult, getCompetitorResult,
        getCompetitorName, competitorName, competitorResult } from '../api/index'

const game = ref('gambleWait')
const end = ref('0')
const result = ref('0')
const wait = ref(5)
var setTimer = null
const n = ref(1)

onMounted(() => {
  getPlayerScore(player.userID)
  getPK(player.userID)
  getCompetitorName()
  setTimeout(() => {
    game.value = 'gamble'
    wait.value = 5
    goGamble()}, 2000)
})

function goGamble() {
  setTimer = setInterval(() => { countdownTimer() }, 1000)
  setTimeout(() => { clearTimeout(setTimer);wait.value = 0 }, 5500)
}

function countdownTimer() {

  wait.value -= 1

  if (wait.value == 1) {

    if (result.value == '0') {
      if (Math.random() > 0.5) {
        result.value = 'solo'
      } else {
        result.value = 'team'
      }
    }
    // updateResult({
    //   userID: player.userID,
    //   result: result.value
    // })
    // socket.emit('who', {
    //   [player.userID]: result.value
    // })
  } else if (wait.value == 0) {
    game.value = "resultWait"
    end.value = '3'
    getResults()
    setTimeout(()=>{
      game.value = 'result'
    },500)
  }
}

function getResults() {
  setTimeout(()=>{
    // if (competitorResult.value) {
    //   whoWin(result.value, competitorResult.value)
    // } else {
      let rnd = (Math.random() > 0.5) ? 'team' : 'solo'
      whoWin(result.value, rnd)
   // }
  },500)
  
}

function whoWin(me, yo) {
  if (me == 'team' && yo == 'solo') {
    end.value = '-1'
  } else if (me == 'team' && yo == 'team') {
    end.value = '1'
  } else if (me == 'solo' && yo == 'team') {
    end.value = '2'
  } else if (me == 'solo' && yo == 'solo') {
    end.value = '0'
  }
  console.log(me, yo)
}

function forceStop(next){
  setStep(next, player)
    step.value = next
}

function goNext() {
  result.value = '0'
  let score = Number(player.score)
  switch (end.value) {
    case '-1':
      score -= 10000
      break
    case '1':
      score += 120000
      break
    case '2':
      score += 150000
      break
    case '0':
      score -= 80000
      break
    default:
      break
  }
  console.log(score)
  setupScore(score, player)

  if (n.value == 5) {
    let next = 'Question2_2'
    setStep(next, player)
    step.value = next
  } else {
    n.value += 1
    game.value = 'gambleWait'
    setTimeout(() => {
    game.value = 'gamble'
    wait.value = 5
    goGamble()}, 2000)
  }
}
</script>
<style>
.question.s02{
  position: relative;
  text-align: center;
}
.question.s02 .info{
  width: 100vw;
  height: 82vh;
  background: url('../assets/images/wine-bottle.jpg') no-repeat center;
  background-position: bottom center;
  background-size: auto 130%;
  padding-top: 8vh;
}
.question.s02 .title {
  color: #cda674;
  font-size: 2rem;
  padding-bottom: 1.6rem;
}
.question.s02 .btn{
  background-color: #cda674;
}
.question.s02 .btn:hover {
  border-color: #d5cdc4;
}
.question.s02 .btn.w50.active{
  background-color: #552917;
  color: #d5cdc4;
}
.question.s02 .btn.w50{
  width: 40vw;
  margin-left: 5vw;
  margin-right: 5vw;

}
.question.s02 .btn.next{
  background-color: #552917;
  margin-top: 10rem;
}
.question.s02 .rule{
  margin: 0 auto;
  background-color: rgba(0, 0, 0, 0.8);
  width: 80%;
  padding: 10px;
  border-radius: 2rem;
}
.question.s02 .tips{
  color: #d5cdc4;
  font-size: 1.2rem;
}
.question.s02 .tips b{
  border-radius: 16px;
  padding: 4px 12px;
  margin: 4px;
  background-color: #d5cdc4;
  color: #552917;
  font-size: 1rem;
}
.question.s02 .pk{
  height: 82vh;
  background: url('../assets/images/battle-bg.png') no-repeat center;
  background-position: bottom center;
  background-size: auto 105%;
  padding-top:6rem;
  color: #cda674;
}
.question.s02  .end{
  height: 82vh;
  width: 100vw;
}
.question.s02 .res{
  color: #f5f1ea;
  font-size: 2.4rem;
  margin-top:18rem;
  text-shadow: #000 0.01rem 0.01rem;
}
.question.s02 .pin{
  position: absolute;
  top:0;
  left:0;
  height: 82vh;
  width: 100vw;
  background: url('../assets/images/pin-bg.png') no-repeat center;
  background-position: bottom center;
  background-size: auto 105%;
}
.question.s02 .los{
  position: absolute;
  top:0;
  left:0;
  height: 82vh;
  width: 100vw;
  background: url('../assets/images/los-bg.png') no-repeat center;
  background-position: bottom center;
  background-size: auto 105%;
}
.question.s02 .win{
  position: absolute;
  top:0;
  left:0;
  height: 82vh;
  width: 100vw;
  background: url('../assets/images/win-bg.png') no-repeat center;
  background-position: bottom center;
  background-size: auto 105%;
}

.question.s02 .pk .amount{
  font-size: 2.4rem;
  color: #cda674;
}

.question.s02 .pk .header{
  color: #f5f1ea;
  font-size: 2.4rem;
  font-weight: 600;
  margin-top:2rem;
  text-shadow: #000 0.01rem 0.01rem;
}

.action{
  text-align: center;
  padding-top: 1.6rem;
}
.score{ 
  float: right;
  line-height: 6vh;
  margin-right: 2vw;
}
.result {
  color: #aaa;
  font-size: 1rem;
}
.active {
  background: #552917;
  color: #fff;
}
.normal {
  background: #fff;
  color: #552917;
}
.ant-checkbox {
  display: none;
}
.ant-card {
  min-width: 100%;
}
</style>