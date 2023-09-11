<template><div>
  <div class="logo"> <div v-if="!notYet" class="score">您目前有 {{ player.score }}</div> </div>
  <div class="question s02">
  <div v-if="notYet" class="info">
    <p class="title">恭喜您現在的籌碼有<br/>{{  player.score  }}</p>
    <p class="tip">請耐心等待，我們將於</p>
    <p class="title"> {{ hours }} : {{ mins }} : {{ secs }}</p>
    <p class="tip">後進行下一個有趣的遊戲!</p>
  </div>
  <div v-else>
  <div v-if="game == 'rule'" class="info">
    <p class="title">{{ player.name }},來增加您的籌碼吧！</p>
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
      <b>合作者賠8萬</b>
    </p>
  </div>
    <div class="action"><a-button size="large" class="btn" style="width: 80%;" @click="matchPlayer();game = 'match';">開始配對!</a-button></div>
  </div>
  <div class="pk" v-if="game == 'match'">
    <p class="title">{{ player.name }},你的對手是{{ competitorName }}</p>
    <p class="tips">不會計分</p>
    <a-button class="btn next" size="large" type="primary" @click="()=>{game = 'gamble01';goGamble()}">試玩一局</a-button>
    
  </div>
  <div class="pk" v-if="game == 'gamble01'">
    <p class="tips">試玩一局</p>
    <p class="title">{{ player.name }},你的對手是{{ competitorName }}</p>
    <a-button class="btn w50" :class="{ active: isActiveTeam || result == 'team' }" size="large" @click="()=>{isActiveTeam = true; isActiveSolo = false; result='team'}">合作</a-button>
    <a-button class="btn w50" :class="{ active: isActiveSolo || result == 'solo' }" size="large" @click="()=>{isActiveTeam = false; isActiveSolo = true; result='solo'}">獨享</a-button>
    <!-- <a-button class="btn w50" size="large" @click="()=>{result = 'team'}">合作</a-button>
    <a-button class="btn w50" size="large" @click="()=>{result = 'solo'}">獨享</a-button> -->
    <p class="tips"><b>{{ wait }}</b></p>
  </div>
  <div v-if="game == 'result01'" class="end">
    <div v-if="end=='0'" class="los">
      <p class="res">啊,賠了 80,000</p>
    </div>
    <div v-if="end=='1'" class="pin" >
      <p class="res">恭喜!<br/>您和{{ competitorName }}<br/>各得 120,000</p>
    </div>
    <div v-if="end=='2'" class="win">
      <p class="res">
        恭喜獨享 150,000
      </p>
    </div>
    <a-button class="btn next" size="large" type="primary" @click="()=>{ game = 'offcial'}">接下來要正式開始</a-button>
  </div>
      <div v-if="game == 'offcial'" class="info">
        <p class="title">{{ player.name }},<br/>我們要正式開始了</p>
        <div class="rule">
          <p class="tips">
            接下來五局，你的對手是{{ competitorName }}
          </p>
        </div>
       
      </div>
</div>
</div>
<div class="footer">
  
</div>
</div>
</template>
<script setup>
import { ref, onMounted, watch } from 'vue'
import { step, setStep, setupScore, getPlayerScore, player, getPK, pkData, updateResult, getCompetitorName, getCompetitorResult, competitorName, competitorResult } from '../api/index'
import { socket } from "@/socket"

socket.on("adminStep", (v) => {
  if(v == 'Ready Go'){
    goNext()
  }
});

const game = ref('rule')
const end = ref('0')
const result = ref('0')
const notYet =ref(true)
const hours = ref(0)
const mins = ref(0)
const secs = ref(0)
const nowscore = ref(0)
const wait = ref(8)

watch()

onMounted(() => {
  getPlayerScore(player.userID)
  getPK(player.userID)
  countdown()
})

function countdown(){
  let timesUp = 3
  let time = setInterval(() => {
  let future  = Date.parse("2023-09-11T12:00:00");
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
      hours.value = addZero(h - days  * 24);
      mins.value = addZero(m  - h * 60);
      secs.value = addZero(s  - m * 60);
    }
  }, 1000);
}

function addZero(num){
  if(parseInt(num)<10){
    return '0'+ num
  }else{
    return num
  }
}

function matchPlayer() {
  getCompetitorName(pkData.value.pk)
}


function goGamble() {
 let waitTime = setInterval(() => { 
      wait.value -= 1
      if(wait.value == 1 ){
        if(result.value == '0'){ 
          if(Math.random()>0.5){
            result.value = 'sole'
            isActiveSolo.value = true
            isActiveTeam.value = false
          }else{
            result.value = 'team'
            isActiveSolo.value = false
            isActiveTeam.value = true
          }
        }
        updateResult({
            userID: player.userID,
            result: result.value 
          })

      }else if(wait.value < 0){
        game.value = "result01"
        
        getCompetitorResult(pkData.value.pk)

        if(competitorResult.value){
          whoWin( result.value , competitorResult.value)
        }else{
          let rnd = (Math.random()>0.5) ? 'team':'solo' 
          whoWin( result.value , rnd )
        }
        clearInterval(waitTime)
      }
  },1000)
      
}



function whoWin( me ,yo){
    if( me == 'team' && yo == 'solo'){
      end.value = '0'
    } else if ( me == 'team' && yo == 'team'){
      end.value = '1'
    }else if ( me == 'solo' && yo == 'team'){
      end.value = '2'
    }else if ( me == 'solo' && yo == 'solo'){
      end.value = '0'
    }
    console.log(me,yo)
}

function goNext() {
  let score = Number(player.score)
  // switch (result.value) {
  //   case 1:
  //     score += 120000
  //     break
  //   case 2:
  //     score += 150000
  //     break
  //   case 0:
  //     score -= 80000
  //     break
  //   default:
  //     break
  // }
  console.log(score)
  setupScore(score, player)
  let next = 'Question2_1'
  setStep(next, player)
  step.value = next
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
  padding-top: 6vh;
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
  font-size: 1.4rem;
}
.question.s02 .tips b{
  border-radius: 16px;
  padding: 4px 12px;
  margin: 4px;
  background-color: #d5cdc4;
  color: #552917;
  font-size: 1.2rem;
}
.question.s02 .pk{
  height: 82vh;
  background: url('../assets/images/battle-bg.png') no-repeat center;
  background-position: bottom center;
  background-size: auto 105%;
  padding-top:10rem;
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