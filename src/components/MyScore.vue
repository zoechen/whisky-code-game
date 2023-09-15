<template>
  <div class="logo">探員 {{ player.userID }} 籌碼 {{ player.score }}</div>
  <div class="rank">
    <p class="title">最後結果</p>
    <div class="rule">
      <div class="title">總籌碼有</div>
      <div class="tips">{{ scoreLocal }}</div>
      <h2>Dr. No</h2>
      <p> 持有數量{{ wine1old + wine1two + wine1new }}</p>
      <h2>Goldfinger</h2>
      <p> 持有數量{{ wine2old + wine2two + wine2new }}</p>
      <h2>Thunderball</h2>
      <p> 持有數量{{ wine3old + wine3two + wine3new }}</p>
    </div>
    <a-button class="btn" @click="goNext('WineAns')">這三支酒其實是…</a-button>
  </div>
  <div class="footer">
    <div class="shadow"></div>
  </div>
</template>
<script setup>
import { ref, onMounted, computed } from 'vue'
import { player, step, getPlayerScore, getWine, setStep } from '../api/index'
import { socket } from "@/socket"

socket.on("adminStep", (v) => {
  if (v == 'WineAns') {
    goNext('WineAns')
  }
})
const wine1new = ref(0)
const wine2new = ref(0)
const wine3new = ref(0)
const wine1old = ref(0)
const wine2old = ref(0)
const wine3old = ref(0)
const wine1two = ref(0)
const wine2two = ref(0)
const wine3two = ref(0)
const score = ref(0)
const scoreLocal = computed(() => Number(score.value).toLocaleString())

onMounted(() => {
  getWine(player.userID)
  getPlayerScore(player.userID)
  setTimeout(() => {
    wine1old.value = Number(localStorage.getItem('wine1_1'))
    wine2old.value = Number(localStorage.getItem('wine2_1'))
    wine3old.value = Number(localStorage.getItem('wine3_1'))
    wine1two.value = Number(localStorage.getItem('wine1_2'))
    wine2two.value = Number(localStorage.getItem('wine2_2'))
    wine3two.value = Number(localStorage.getItem('wine3_2'))
    wine1new.value = Number(localStorage.getItem('wine1_3'))
    wine2new.value = Number(localStorage.getItem('wine2_3'))
    wine3new.value = Number(localStorage.getItem('wine3_3'))
    score.value = Number(player.score)
  }, 500);

})

function goNext(next) {
  setStep(next, player)
  step.value = next
}

</script>
<style>
.rank {
  text-align: center;
  width: 100vw;
  height: 82vh;
  background: url('../assets/images/rank-bg.png') no-repeat;
  background-position: top center;
  background-size: auto 105%;
  padding: 2rem 4rem;
}

.rank .title {
  color: #cda674;
  font-size: 1.4rem;
}

.rank h2 {
  color: #cda674;
  font-size: 1.2rem;
}

.rank p {
  color: #d5cdc4;
  font-size: 1.2rem;
}

.rank .btn {
  background-color: #cda674;
}

.rule {
  margin: 0.4rem auto;
  background-color: rgba(0, 0, 0, 0.8);
  width: 100%;
  padding: 10px;
  border-radius: 2rem;
  color: #d5cdc4;
  font-size: 1.8rem;
}</style>