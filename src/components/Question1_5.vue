<template>
<div>
  <div class="logo">探員 {{ player.userID }} 籌碼 {{ player.score }}</div>
  <div class="question conutdown">
    <div v-if="game == '01'" class="info">
    <p class="title">恭喜您現在的籌碼有<br/>{{  scoreLocal  }}</p>
  
      <p class="tip">我們即將進行下一個有趣的遊戲!</p>
      <a-button class="btn" size="large" type="primary" @click="game = 'rule'">前往</a-button>
    </div>
    <div v-if="game == 'rule'" class="info">
      <p class="title">{{ player.name }}<br/>來增加您的籌碼吧！</p>
      <div class="rule">
      <p class="tips">
        隨機配對二人一組<br />
        你可以自由選擇<br />
        <b>合作</b>或是<b>獨享</b><br />
        配對的二人都選合作<br />
        <b>各得12萬</b><br />
        配對的二人都選獨享<br />
        <b>各賠8萬</b><br />
        一人選獨享一人選合作<br />
        <b>獨享者得15萬</b>
        <b>合作者賠1萬</b>
      </p>
    </div>
      <div class="action"><a-button size="large" class="btn" style="width: 80%;" @click="goNext('Question2_1')">開始!</a-button></div>
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

 
const score = ref(0)
const scoreLocal  = computed(() => Number(score.value).toLocaleString() )
const game = ref('01')

onMounted(() => {
  getPlayerScore(player.userID)
  score.value = Number(localStorage.getItem('score') )|| Number(player.score)
  fixMoney()
  //countdown()
})

function fixMoney(){
  if(score.value < 800000){
    setupScore(2000000, player)
  }else{
    setupScore(score.value, player)
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
.question.conutdown .btn{
  background-color: #cda674;
  width: 25vw;
  margin: 8px;
}

.question.conutdown .rule{
  margin: 0 auto;
  background-color: rgba(0, 0, 0, 0.8);
  width: 80%;
  padding: 10px;
  border-radius: 2rem;
}
.question.conutdown .tips{
  color: #d5cdc4;
  font-size: 1.2rem;
}
.question.conutdown .tips b{
  border-radius: 16px;
  padding: 4px 12px;
  margin: 4px;
  background-color: #d5cdc4;
  color: #552917;
  font-size: 1rem;
}
</style>