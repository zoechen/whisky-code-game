<template>
  <div class="flex flex-col justify-center" v-if="game == 'rule'">
    <p class="title">{{ player.name }},來增加您的資產吧!</p>
    <p>
      隨機配對,二人一組<br />
      雙人都選合作,各得 1 2 萬<br />
      雙人都選獨享,各賠 8 萬<br />
      一人獨享一人合作,獨享得 1 5 萬
    </p>
    <a-card>您目前有 {{ player.scroe }}</a-card>
    <a-button @click="matchPlayer">開始配對!</a-button>
  </div>
  <div class="flex flex-col justify-center" v-if="game == 'gamble'">
    <p class="title">{{ player.name }},你的對手是{{ competitor }}</p>
    <a-button @click="goGamble('team')">合作</a-button>
    <a-button @click="goGamble('sole')">獨享</a-button>
  </div>
  <div class="flex flex-col justify-center" v-if="game == 'result'">
    <a-card v-if="result == 1">恭喜!您和{{ competitor }}各得 120,000</a-card>
    <a-card v-if="result == 2">啊,賠了 80,000</a-card>
    <a-card v-if="result == 3">恭喜獨享 150,000</a-card>

    <a-button class="w-full" type="primary" @click="goNext">下一題</a-button>
  </div>
</template>
<script setup>
import { ref, onMounted } from 'vue'
import { step, setStep, setupscroe, getPlayerscroe, getPlayerList, playerList, player } from '../api/index'

const game = ref('rule')
const result = ref(0)
const competitor = ref('')

onMounted(() => {
  getPlayerList()
  getPlayerscroe(player.userID)
})

function matchPlayer() {
  let index = playerList.value.indexOf(player.name)
  playerList.value.splice(index, 1)
  let competitorList = playerList.value
  console.log(competitorList)
  let rnd = Math.floor(Math.random() * competitorList.length)
  competitor.value = competitorList[rnd]
  game.value = 'gamble'
}

function goGamble(g) {
  if (g == 'team') {
    result.value = Math.floor(Math.random() * 2 + 1)
  } else {
    result.value = Math.floor(Math.random() * 3 + 2)
  }
  game.value = 'result'
}

function goNext() {
  let scroe = Number(player.scroe)
  switch (result.value) {
    case 1:
      scroe += 120000
      break
    case 2:
      scroe += 150000
      break
    case 3:
      scroe -= 80000
      break
    default:
      break
  }
  console.log(scroe)
  setupscroe(scroe, player.userID)
  let next = 'Question03'
  setStep(next,player.id)
  step.value = next
  
}
</script>
<style>
.title {
  color: #1677ff;
  font-size: 2rem;
}
.result {
  color: #aaa;
  font-size: 1rem;
}
.active {
  background: #1677ff;
  color: #fff;
}
.normal {
  background: #fff;
  color: #000;
}
.ant-checkbox {
  display: none;
}
.ant-card {
  min-width: 100%;
}
</style>
