<template>
  <div>
    <div class="logo"></div>
    <div class="question s03">
     
        <div v-if="game == 'rule'">
          <div class="rule">
            <p class="title">{{ player.name }}探員,<br /></p>
          <p class="tips">
            推薦給您三款值得珍藏的威士忌,不僅好喝,更是能夠隨著時間提高價值喔!
          </p>
          <p class="title">先聽聽<br/> WhiskyCode的分享</p>
        </div>
            
          <a-button
            class="btn"
            @click="
              () => {
                game = 'wineinfo'
              }
            "
            >好</a-button>
        
        </div>
        <div v-if="game == 'wineinfo'">
          <a-carousel :after-change="onChange" arrows>
            <template #prevArrow>
              <div style="left: 10px; z-index: 999;color: #fff; font-size: 1.2rem;">
              </div>
            </template>
            <template #nextArrow>
              <div style="right: 10px;color: #fff;font-size: 1.2rem;">
              </div>
            </template>
          <div class="bloc">
            <h2>Dr. No</h2>
            <img src="../assets/images/macallan-30y.png" alt="" />
              <ul>
            <li>色澤：深紅木色。</li>
            <li>香氣：濃郁甘醇的雪莉酒桶的氣味，帶有柳橙丁香、肉荳蔻和煙燻木氣息。</li>
            <li>口感：果乾、雪莉酒、柳橙與煙燻木形成醇美柔順的風味。</li>
            <li>餘韻：綿長馥郁的柳橙與香料氣息。</li>
            <li>ABV：43%</li>
            </ul>
          </div>
          <div class="bloc">
            <h2>Goldfinger</h2>
          <img src="../assets/images/macallan12.png" alt=""  />
          <ul>
            <li>色澤：黑檀木色。</li>
            <li>香氣：濃郁甘醇，與雪莉酒桶的氣味緊密相合。</li>
            <li>口感：豐富的果香、蜂蜜甜味與辛香料味，舌尖富含絲綢的圓潤感。</li>
            <li>餘韻：每一口深藏辛香料、雪茄、柑橘、黑巧克力的氣味。</li>
            <li>ABV：45.6%</li>
            </ul>
          </div>
          <div class="bloc">
            <h2>Thunderball</h2>
          <img src="../assets/images/macallan-edition-no.1.png" alt=""  />

          <ul>
            <li>色澤：天然蜂蜜。</li>
            <li>香氣：柳橙、蘋果和果乾交融，散發鮮明豐郁的香氣。 橡木香氣中隱約透出香草、太妃糖和巧克力香。</li>
            <li>口感：初嚐即現的木質辛香讓人心中浮現暖意，隨之出現豆蔻、肉桂味，還有些許乾薑與太妃糖香。 最後顯現的果香清新，和新鮮橡木香和諧交織。</li>
            <li>餘韻：柔順悠長。</li>
            <li>ABV：48.1%</li>
            </ul>
          </div>
          </a-carousel>
          <small style="color: #fff;">酒可以選擇哦!請左右滑滑看。</small><br/>
          
        </div>
    </div>
    <div class="footer">
      <div class="shadow"></div>
    </div>
  </div>

 
</template>
<script setup>
import { ref, onMounted, computed } from 'vue'
import { setStep, getPlayerScore, player, step } from '../api/index'
import { socket } from "@/socket"

socket.on("adminStep", (v) => {
  if(v == 'investment01'){
    goNext('Question3_1')
  }
})

function goNext(next) {
  setStep(next, player)
  step.value = next
}

const game = ref('rule')
const cost = ref(0)
const notYet =ref(true)
const hours = ref(0)
const mins = ref(0)
const secs = ref(0)
const score = computed(() => Number(player.score).toLocaleString() )


onMounted(() => {
  countdown()
  getPlayerScore(player.userID)
  //setupScore(8800000, player) //for test
})

function countdown(){
  let timesUp = 5 //for test
  let time = setInterval(() => {
  let future  = Date.parse("2023-09-15T18:00:00");
  let now     = new Date();
  let diff    = future - now;
  let days  = Math.floor( diff / (1000*60*60*24) );
  let h = Math.floor( diff / (1000*60*60) );
  let m  = Math.floor( diff / (1000*60) );
  let s  = Math.floor( diff / 1000 );
    timesUp -=1 

    if(timesUp < 0){
      notYet.value = false
      clearInterval(time)
    }else{
      hours.value  = addZero(h - days  * 24);
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

</script>
<style>
.question.s03 {
  width: 100vw;
  height: 82vh;
  background: url('../assets/images/oak-bg.jpg') no-repeat center;
  background-position: bottom center;
  background-size: auto 105%;
  padding: 5% 2rem;
  text-align: center;
}
.question.s03 .title {
  color: #d5cdc4;
  font-size: 1.6rem;
  text-shadow: #000 0.01rem 0.01rem;
}
.question.s03 .tips {
  color: #cda674;
  font-size: 1.4rem;
  text-shadow: #000 0.01rem 0.01rem;
}
.question.s03 .btn {
  background-color: #cda674;
}
.question.s03 .btn:hover {
  color: #d5cdc4;
  border-color: #d5cdc4;
  background-color: #552917;
}
.question.s03 .rule{
  margin: 0.4rem auto;
  background-color: rgba(0, 0, 0, 0.8);
  width: 100%;
  padding: 10px;
  border-radius: 2rem;
  font-size: 1rem;
}
.question.s03 .rule .tips{
  color: #cda674;
}
.amount {
  color: #cda674;
  font-size: 1.4rem;
  margin-bottom: 2rem;
}
.item {
  text-align: center;
  padding: 1rem 0;
  color: #d5cdc4;
}

.flexChart {
  height: 54vh;
  width: calc(100vw-8rem);
  border-radius: 2rem;
  background-color: rgba(0, 0, 0, 0.5);
  padding: 2rem 0.8rem 4rem 0.8rem;
  margin-bottom: 2rem;
}

.itemCard {
  height: 18vh;
  width: calc(100vw-8rem);
  border-radius: 2rem;
  background-color: rgba(0, 0, 0, 0.5);
  margin-bottom: 1rem;
  display: flex;
}
.itemCard img {
  height: 12vh;
  flex: 1;
  filter:grayscale(100%)
}
.itemCard .itemContent {
  flex: 50vw;
  float: left;
  color: #cda674;
  padding: 0.4rem;
  text-align: left;
}
.itemCard .itemContent h2{
  color: #d5cdc4;
}
.itemCard .btn{
  flex: auto;
  margin-top: 2.8rem;
  margin-right: 0.8rem;
}

.ant-modal .ant-modal-content{
  color: #d5cdc4;
  background-color: #000;
  
}
.ant-modal .ant-modal-content p{
  font-size: 1.2rem;
}
.ant-modal-footer .ant-btn-primary{
  background-color: #552917;
}
.ant-input-number-disabled{
  background-color: #d5cdc4;
}
.bloc {
  width: 100%;
  text-align: center;
  color: #d5cdc4;
  border-radius: 2rem;
  background-color: rgba(0, 0, 0, 0.5);
  padding: 2rem;
  height: 65vh;
  
}
.bloc ul{
  text-align: left;
  font-size: 0.8rem;

}
.bloc p{
  text-align: left;
  font-size: 1.4rem;
}

.bloc h2{
  font-size: 1.6rem;
  color: #cda674;
}

.bloc .pic{
  margin: 0 auto;
  width: auto;
  height: 4rem;
  filter:grayscale(100%)
}
</style>

