<template>
  <div>
    <div class="logo">
      <div class="score">您目前有 {{ player.score }}</div>
    </div>
    <div class="question s02">
      <div class="pk" v-if="game == 'gambleWait'">
        <p class="tips">第{{n}}局</p>
        <p class="title">{{ player.name }},你的對手是{{ competitorName }}</p>
        <a-button class="btn w50" size="large" disabled >合作</a-button>
        <a-button class="btn w50" size="large" disabled >獨享</a-button>
        <div class="tips">準備一下，馬上要開始了</div>
      </div>
      <div class="pk" v-if="game == 'gamble'">
        <p class="tips">第{{n}}局</p>
        <p class="title">{{ player.name }},你的對手是{{ competitorName }}</p>
        <a-button class="btn w50" :class="{ active: result == 'team' }" size="large"
          @click="result = 'team'" :disabled="disabled">合作</a-button>
        <a-button class="btn w50" :class="{ active: result == 'solo' }" size="large"
          @click="() => result = 'solo'" :disabled="disabled">獨享</a-button>
        <p class="tips"><b>{{ wait }}</b></p>
      </div>
      <div class="pk" v-if="game == 'resultWait'">
        <p class="tips">第{{n}}局</p>
        <p class="title">{{ player.name }},你的對手是{{ competitorName }}</p>
        <a-button class="btn w50" :class="{ active: result == 'team' }" size="large" disabled>合作</a-button>
        <a-button class="btn w50" :class="{ active: result == 'solo' }" size="large" disabled>獨享</a-button>
      </div>
      <div v-if="game == 'result'" class="end">
        <div v-if="end == '0'" class="los">
          <p class="res">啊,賠了 80,000</p>
        </div>
        <div v-if="end == '1'" class="pin">
          <p class="res">恭喜!<br />您和{{ competitorName }}<br />各得 120,000</p>
        </div>
        <div v-if="end == '2'" class="win">
          <p class="res">
            恭喜獨享 150,000
          </p>
        </div>
        <!-- <a-button class="btn next" size="large" type="primary" @click="() => { goNext() }">第二局</a-button> -->
      </div>
    </div>
  <div class="footer">
    </div>
  </div>
</template>
<script setup>
import { ref, onMounted, computed, watch } from 'vue'
import { step, setStep, setupScore, getPlayerScore, player, getPK, pkData, updateResult, getCompetitorName, getCompetitorResult, competitorName, competitorResult } from '../api/index'
import dayjs from 'dayjs'
import { state, socket } from "@/socket"

const game = ref('gambleWait')
const end = ref('0')
const result = ref('0')
const wait = ref(9)
var setTimer = null
const timer = ref(5)
const pass = ref(false)
const n = ref(1)
const disabled = ref(false)

socket.on("adminStep", (v) => {
  pass.value = v
});

watch(pass, (newX) => {
  if (newX == 'result') {
    game.value = 'result'
  }else if (newX == 'gambleWait') {
    game.value = 'gambleWait'
    disabled.value = false
    result.value = '0'
    setTimer = null
  }else if (newX == 'NextRound'){
    goNext()
  }else if (newX == 'gamble'){
    game.value = 'gamble'
    wait.value = 9
    goGamble()
  }else{
    console.error(newX)
  }
})

onMounted(() => {
  getPlayerScore(player.userID)
  getPK(player.userID)
})



function goGamble() {
    setTimer = setInterval(()=>{countdownTimer()},1000)
    setTimeout(()=>{clearTimeout(setTimer)},9000)
}

function countdownTimer(){
 
    wait.value -= 1
    
    if (wait.value == 2) {
      disabled.value = true
      if (result.value == '0') {
        if (Math.random() > 0.5) {
          result.value = 'solo'
        } else {
          result.value = 'team'
        }
      }
      updateResult({
        userID: player.userID,
        result: result.value
      })
      socket.emit('who', {
        team: pkData.value.pk,
        userID: player.name,
        result: result.value
      })

    } else if (wait.value == 1) {

      getCompetitorResult(pkData.value.pk)
    
    } else if (wait.value == 0) {
      game.value = "resultWait"
      whoWin(result.value, competitorResult.value)
      if (competitorResult.value) {
        whoWin(result.value, competitorResult.value)
      } else {
        let rnd = (Math.random() > 0.5) ? 'team' : 'solo'
        whoWin(result.value, rnd)
      }
    }
 
}


function whoWin(me, yo) {
  if (me == 'team' && yo == 'solo') {
    end.value = '0'
  } else if (me == 'team' && yo == 'team') {
    end.value = '1'
  } else if (me == 'solo' && yo == 'team') {
    end.value = '2'
  } else if (me == 'solo' && yo == 'solo') {
    end.value = '0'
  }
  console.log(me, yo)
}

function goNext() {
  let score = Number(player.score)
  switch (end.value) {
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

  if(n.value == 5){
    let next = 'Question2_2'
    setStep(next, player)
    step.value = next
  }else{
    n.value +=1
    game.value = 'gambleWait'
  }
}
</script>
