<template><div>
  <div class="logo">{{ player.userID }} : {{ player.score }}</div>
  <div class="question conutdown">
    <div class="info">
    <p class="title">恭喜您現在的籌碼有<br/>{{  score  }}</p>
    <div v-if="timesUp>0">
    <p class="tip">請耐心等待，我們將於</p>
    <p class="title"> {{ hours }} : {{ mins }} : {{ secs }}</p>
    <p class="tip">後進行下一個有趣的遊戲!</p>
    </div>
    <div v-if="timesUp <= 0">
      <p class="tip">請耐心等待<br/>我們即將進行下一個有趣的遊戲!</p>
    </div>
  </div>
  </div>
  <div class="footer">
    {{ player.userID }}
  </div>
</div>
</template>
<script setup>
import { ref, onMounted, watch, computed } from 'vue'
import { step, setStep, getPlayerScore, player, getPK, } from '../api/index'
import { socket } from "@/socket"

const hours = ref(0)
const mins = ref(0)
const secs = ref(0)
const timesUp = ref(0)
const score = computed(() => Number(player.score).toLocaleString() )
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
  countdown()
})

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