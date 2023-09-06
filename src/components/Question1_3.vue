<template>
  <div>
  <div class="logo"></div>
  <div class="question s01">
    <div v-if="isQuest">
    <p class="title">請找到</p>
    <img src="../assets/images/q2-2.jpg" style="border-radius:10vw; width: 20vw;" />
    <p class="title">吃吃看,這是什麼呢?</p>
    <p class="tip">(選一個正確的答案)</p>
        <a-checkbox-group v-model:value="selected">
          <a-row :gutter="[4, 16]">
            <a-col :span="12">
              <a-checkbox value="250000">
                <a-card :class="selected.includes('250000') ? 'active' : 'normal'" style="width: 40vw;">可可果肉</a-card>
              </a-checkbox>
            </a-col>
            <a-col :span="12">
              <a-checkbox value="100">
                <a-card :class="selected.includes('100') ? 'active' : 'normal'" style="width: 40vw;">山竹果肉</a-card>
              </a-checkbox>
            </a-col>
            
            <a-col :span="12">
              <a-checkbox value="200">
                <a-card :class="selected.includes('200') ? 'active' : 'normal'"  style="width: 40vw;">牛油果肉</a-card>
              </a-checkbox>
            </a-col>
            <a-col :span="12">
              <a-checkbox value="300">
                <a-card :class="selected.includes('300') ? 'active' : 'normal'"  style="width: 40vw;">紅毛丹果肉</a-card>
              </a-checkbox>
            </a-col>
          </a-row>
        </a-checkbox-group>
        <a-row :gutter="[4, 16]">
          <a-col :span="24" style="margin-top: 2rem">
            <a-button class="btn" size="large" type="primary" @click="sentAns">確定</a-button>
          </a-col>
        </a-row>
    </div>
    <div v-else>
    <a-row :gutter="[4, 16]">
      <a-col :span="24"><p class="title">{{ player.name }},猜對了嗎??</p></a-col>
      <a-col :span="24"><p class="result"> <span v-if="counter > 0">恭喜獲得{{ counter }},<br/></span>目前累積金額{{ nowscore }}</p></a-col>
    </a-row>
        <a-row :gutter="[4, 16]">
          <a-col :span="12">
              <a-checkbox value="250000">
                <a-card :class="selected.includes('250000') ? 'active' : 'normal'" style="width: 40vw;">可可果肉<br/>250000</a-card>
              </a-checkbox>
            </a-col>
            <a-col :span="12">
              <a-checkbox value="100">
                <a-card :class="selected.includes('100') ? 'active' : 'normal'" style="width: 40vw;">山竹果肉<br/>X</a-card>
              </a-checkbox>
            </a-col>
            
            <a-col :span="12">
              <a-checkbox value="200">
                <a-card :class="selected.includes('200') ? 'active' : 'normal'"  style="width: 40vw;">牛油果肉<br/>X</a-card>
              </a-checkbox>
            </a-col>
            <a-col :span="12">
              <a-checkbox value="300">
                <a-card :class="selected.includes('300') ? 'active' : 'normal'"  style="width: 40vw;">紅毛丹果肉<br/>X</a-card>
              </a-checkbox>
            </a-col>
          </a-row>
        <a-row :gutter="[4, 16]">
          <a-col :span="24">
            
            <a-button class="btn"  size="large" type="primary" @click="goNext">下一題</a-button>
          </a-col>
        </a-row>
    </div>
  </div>
  <div class="footer">
  <div class="shadow"></div>
</div>
</div>
</template>
<script setup>
import { ref, watch, onMounted } from 'vue'
import { message } from 'ant-design-vue'
import { setupScore, setStep, player, step, getPlayerScore } from '../api/index'

const selected = ref([])
const nowscore = ref(0)
const counter = ref(0)
const isQuest = ref(true)

watch(selected, (newX) => {
  console.log(newX)
  if(newX.length >1) {
    message.error("最多選一個")
    selected.value.splice(1,1)
  }
})
onMounted(() => {
  getPlayerScore(player.userID)
  nowscore.value = localStorage.getItem('score')
})

function sentAns() {
  let oldScore = localStorage.getItem('score')
  if(selected.value.length<1){
    message.error("選一個")
  }
  let temp = selected.value.reduce((a, b) => {
    return Number(a) + Number(b)
  })
  counter.value = Math.floor(temp/1000)*1000 
  nowscore.value = Number(counter.value) + Number(oldScore)
  console.log('counter: ' + counter.value)
  setupScore(nowscore.value, player)
  isQuest.value = false
}

function goNext() {
  let next = 'Question1_4'
  setStep(next, player)
  step.value = next
}
</script>

