<template><div>
  <div class="logo">{{ player.userID }} : {{ player.score }}</div>
  <div class="question conutdown">
    <div class="info">
    <p class="title">恭喜您現在的籌碼有<br/>{{  scoreLocal  }}</p>
  
      <p class="tip">請耐心等待<br/>我們即將進行下一個有趣的遊戲!</p>
  </div>
  </div>
  <div class="footer">
    {{ player.userID }}
  </div>
</div>
</template>
<script setup>
import { ref, onMounted, watch, computed } from 'vue'
import { step, setStep, getPlayerScore, player, getPK, setupScore, } from '../api/index'
import { socket } from "@/socket"

const hours = ref(0)
const mins = ref(0)
const secs = ref(0)
const timesUp = ref(0)
const score = ref(0)
const scoreLocal  = computed(() => Number(score.value).toLocaleString() )
const pass = ref(false)
socket.on("adminStep", (v) => {
  pass.value = v
});

watch(pass, (newX) => {
  if (newX == 'Question2_0') {
    goNext('Question2_0')
  } else {
    console.error(newX)
  }
})

onMounted(() => {
  getPlayerScore(player.userID)
  score.value = Number(localStorage.getItem('score') )|| Number(player.score)
  fixMoney()
  //countdown()
})

function fixMoney(){
  if(score.value < 800000){
    setupScore(5000000, player)
  }else{
    setupScore(score.value, player)
  }
}

function countdown(){
  //let timesUp = 3
  let time = setInterval(() => {
  let future  = Date.parse("2023-09-15T20:00:00");
  let now     = new Date();
  let diff    = future - now;
  let days  = Math.floor( diff / (1000*60*60*24) );
  let h = Math.floor( diff / (1000*60*60) );
  let m  = Math.floor( diff / (1000*60) );
  let s  = Math.floor( diff / 1000 );
    timesUp.value = diff
    hours.value = addZero(h - days  * 24);
    mins.value = addZero(m  - h * 60);
    secs.value = addZero(s  - m * 60);
    
  }, 1000);
}

function addZero(num){
  if(parseInt(num)<10){
    return '0'+ num
  }else{
    return num
  }
}

function goNext(next) {
  setStep(next, player)
  step.value = next
}
</script>
<style>
.question.conutdown{
  position: relative;
  text-align: center;
}
.question.conutdown .info{
  width: 100vw;
  height: 82vh;
  background: url('../assets/images/wine-bottle.jpg') no-repeat center;
  background-position: bottom center;
  background-size: auto 130%;
  padding-top: 6vh;
}
.question.conutdown .title {
  color: #cda674;
  font-size: 2rem;
  padding-bottom: 1.6rem;
}

.question.conutdown .tip{
  color: #d5cdc4;
  font-size: 1.2rem;
}
</style>