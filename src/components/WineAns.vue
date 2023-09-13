<template>
  <div>
    <div class="logo"></div>
    <div class="question s03">
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
            <h3>麥卡倫雪莉30年</h3>
            <span>Macallan Sherry Oak 30Y </span>
            <img src="../assets/images/macallan-30y.png" alt="" class="real" />
          <small>(化名 Dr. No)</small>
          <br/>
              <ul>
            <li>色澤：深紅木色。</li>
            <li>香氣：濃郁甘醇的雪莉酒桶的氣味，帶有柳橙丁香、肉荳蔻和煙燻木氣息。</li>
            <li>口感：果乾、雪莉酒、柳橙與煙燻木形成醇美柔順的風味。</li>
            <li>餘韻：綿長馥郁的柳橙與香料氣息。</li>
            <li>ABV：43%</li>
            </ul>
          </div>
          <div class="bloc"> <h3>麥卡倫限定系列No.1 </h3>
            <span>The Macallan Edition No.1</span>
          <img src="../assets/images/macallan-edition-no.1.png" alt="" class="real"  />
          <small>(化名 Goldfinger)</small>
          <br/>
          <ul>
            <li>色澤：黑檀木色。</li>
            <li>香氣：濃郁甘醇，與雪莉酒桶的氣味緊密相合。</li>
            <li>口感：豐富的果香、蜂蜜甜味與辛香料味，舌尖富含絲綢的圓潤感。</li>
            <li>餘韻：每一口深藏辛香料、雪茄、柑橘、黑巧克力的氣味。</li>
            <li>ABV：45.6%</li>
            </ul>
          </div>
          <div class="bloc">
            <h3>麥卡倫紫鑽12年</h3>
            <span>Macallan 12 Years Old Gran Reserva</span>
          <img src="../assets/images/macallan12.png" alt="" class="real"  />
          <small>(化名 Thunderball)</small>
          <br/>
          <ul>
            <li>色澤：天然蜂蜜。</li>
            <li>香氣：柳橙、蘋果和果乾，散發鮮明豐郁的香氣。 橡木香氣中透出香草、太妃糖和巧克力香。</li>
            <li>口感：初嚐即現的木質辛香讓人心中浮現暖意，隨之出現豆蔻、肉桂味，還有些許乾薑與太妃糖香。最後顯現的果香清新，和新鮮橡木香和諧交織。</li>
            <li>餘韻：柔順悠長。</li>
            <li>ABV：48.1%</li>
            </ul>
          </div>
          </a-carousel>
          <small style="color: #fff;">酒可以選擇哦!請左右滑滑看。</small><br/>
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


