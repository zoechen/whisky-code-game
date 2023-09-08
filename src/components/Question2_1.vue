<template>
  <div>
    <div class="logo">
      <div class="score">您目前有 {{ player.score }}</div>
    </div>
    <div class="question s02">
      <div v-if="game == 'rule'" class="info">
        <p class="title">{{ player.name }},我們要正式開始了</p>
        <div class="rule">
          <p class="tips">
            接下來五局，你的對手是{{ competitorName }}
          </p>
        </div>
        <div class="action"><a-button size="large" class="btn" style="width: 80%;"
            @click="game = 'gamble01'; goGamble()">正式開始!</a-button></div>
      </div>
      <div class="pk" v-if="game == 'gamble01'">
        <p class="tips">第一局</p>
        <p class="title">{{ player.name }},你的對手是{{ competitorName }}</p>
        <a-button class="btn w50" :class="{ team: isActiveTeam || result.value == 'team' }" size="large"
          @click="() => { isActiveTeam = true; isActiveSolo = false; result = 'team' }">合作</a-button>
        <a-button class="btn w50" :class="{ solo: isActiveSolo || result.value == 'sole' }" size="large"
          @click="() => { isActiveTeam = false; isActiveSolo = true; result = 'solo' }">獨享</a-button>
        <p class="tips"><b>{{ wait }}</b></p>
      </div>
      <div v-if="game == 'result01'" class="end">
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
        <a-button class="btn next" size="large" type="primary" @click="()=>{goNext()}">第二局</a-button>
      </div>
    </div>
    <div class="footer">
    </div>
  </div>
</template>
<script setup>
import { ref, onMounted, watch } from 'vue'
import { step, setStep, setupScore, getPlayerScore, player, getPK, pkData, updateResult, getCompetitorName, getCompetitorResult, competitorName, competitorResult } from '../api/index'
import dayjs from 'dayjs'

const game = ref('rule')
const end = ref('0')
const result = ref('0')
const wait = ref(8)
const setTimer = null
const timer = ref(5)

onMounted(() => {
  getPlayerScore(player.userID)
  getPK(player.userID)
})


function goGamble() {

  let waitTime = setInterval(() => {
    wait.value -= 1
    if (wait.value == 1) {
      if (result.value == '0') {
        if (Math.random() > 0.5) {
          result.value = 'sole'
          isActiveSolo.value = true
          isActiveTeam.value = false
        } else {
          result.value = 'team'
          isActiveSolo.value = false
          isActiveTeam.value = true
        }
      }
      updateResult({
        userID: player.userID,
        result: result.value
      })

    } else if (wait.value < 0) {
      game.value = "result01"

      getCompetitorResult(pkData.value.pk)

      if (competitorResult.value) {
        whoWin(result.value, competitorResult.value)
      } else {
        let rnd = (Math.random() > 0.5) ? 'team' : 'solo'
        whoWin(result.value, rnd)
      }
      clearInterval(waitTime)
    }
  }, 1000)

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
  let next = 'Question2_2'
  setStep(next, player)
  step.value = next
}
</script>
