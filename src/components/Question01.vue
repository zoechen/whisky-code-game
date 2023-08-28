<template>
  <div class="logo"></div>
  <div class="question s01">
  <div v-if="isQuest">
      <p class="title">{{ player.name }},聞一聞迎賓酒,<br/>您覺得裡面有什麼味道?</p>
      <a-form :label-col="{ span: 8 }" :wrapper-col="{ span: 16 }">
        <a-checkbox-group v-model:value="selected" class="cgroup">
          <!--建議設負分，避免全選的人跟選對的人同分-->
          <a-row :gutter="[4, 16]">
            <a-col :span="8">
              <a-checkbox value="100000">
                <a-card :class="selected.includes('100000') ? 'active' : 'normal'">巧克力</a-card>
              </a-checkbox>
            </a-col>
            <a-col :span="8">
              <a-checkbox value="20">
                <a-card :class="selected.includes('20') ? 'active' : 'normal'">辣椒</a-card>
              </a-checkbox>
            </a-col>
            <a-col :span="8">
              <a-checkbox value="300000">
                <a-card :class="selected.includes('300000') ? 'active' : 'normal'">橡木</a-card>
              </a-checkbox>
            </a-col>
            <a-col :span="8">
              <a-checkbox value="600">
                <a-card :class="selected.includes('600') ? 'active' : 'normal'">酸梅</a-card>
              </a-checkbox>
            </a-col>
            <a-col :span="8">
              <a-checkbox value="800">
                <a-card :class="selected.includes('800') ? 'active' : 'normal'">焦糖</a-card>
              </a-checkbox>
            </a-col>
            <a-col :span="8">
              <a-checkbox value="200000">
                <a-card :class="selected.includes('200000') ? 'active' : 'normal'">蜂蜜</a-card>
              </a-checkbox>
            </a-col>
            <a-col :span="8">
              <a-checkbox value="500">
                <a-card :class="selected.includes('500') ? 'active' : 'normal'">檜木</a-card>
              </a-checkbox>
            </a-col>
            <a-col :span="8">
              <a-checkbox value="200">
                <a-card :class="selected.includes('200') ? 'active' : 'normal'">生薑</a-card>
              </a-checkbox>
            </a-col>
            <a-col :span="8">
              <a-checkbox value="100">
                <a-card :class="selected.includes('100') ? 'active' : 'normal'">酸檸檬</a-card>
              </a-checkbox>
            </a-col>
          </a-row>
        </a-checkbox-group>
        <a-row :gutter="[4, 16]">
          <a-col :span="24" style="margin-top: 2rem">
            <a-button class="btn" size="large" type="primary" @click="sentAns">確定</a-button>
          </a-col>
          <!-- <a-col :span="24">
          <p class="result">{{ player.userID }} 得分 {{ nowscroe }}</p>
        </a-col> -->
        </a-row>
      </a-form>
    </div>
    <div class="flex flex-col justify-center" v-else>
      <p class="title">{{ player.name }},猜對了嗎??</p>
      <a-form :label-col="{ span: 8 }" :wrapper-col="{ span: 16 }">
        <a-checkbox-group disabled>
          <!--建議設負分，避免全選的人跟選對的人同分-->
          <a-row :gutter="[4, 16]">
            <a-col :span="8">
              <a-checkbox value="100000">
                <a-card class="active">巧克力</a-card>
              </a-checkbox>
            </a-col>
            <a-col :span="8">
              <a-checkbox value="20">
                <a-card class="normal">辣椒</a-card>
              </a-checkbox>
            </a-col>
            <a-col :span="8">
              <a-checkbox value="300000">
                <a-card class="active">橡木</a-card>
              </a-checkbox>
            </a-col>
            <a-col :span="8">
              <a-checkbox value="600">
                <a-card class="normal">酸梅</a-card>
              </a-checkbox>
            </a-col>
            <a-col :span="8">
              <a-checkbox value="800">
                <a-card class="normal">焦糖</a-card>
              </a-checkbox>
            </a-col>
            <a-col :span="8">
              <a-checkbox value="200000">
                <a-card class="active">蜂蜜</a-card>
              </a-checkbox>
            </a-col>
            <a-col :span="8">
              <a-checkbox value="500">
                <a-card class="normal">檜木</a-card>
              </a-checkbox>
            </a-col>
            <a-col :span="8">
              <a-checkbox value="200">
                <a-card class="normal">生薑</a-card>
              </a-checkbox>
            </a-col>
            <a-col :span="8">
              <a-checkbox value="100">
                <a-card class="normal">酸檸檬</a-card>
              </a-checkbox>
            </a-col>
          </a-row>
        </a-checkbox-group>
        <a-row :gutter="[4, 16]">
          <a-col :span="24">
            <p class="result">得分 {{ nowscroe }}</p>
            <a-button class="btn"  size="large" type="primary" @click="goNext">下一題</a-button>
          </a-col>
        </a-row>
      </a-form>
    </div>
  </div>
  <div class="footer">
  <div class="shadow"></div>
</div>
</template>
<script setup>
import { ref } from 'vue'
import { createScroe, setStep, player, step } from '../api/index'

const selected = ref([])
const nowscroe = ref(0)
const isQuest = ref(true)

function sentAns() {
  let counter = 0
  counter = selected.value.reduce((a, b) => {
    return Number(a) + Number(b)
  })
  console.log('counter: ' + counter)
  createScroe(counter, player.userID)
  nowscroe.value = localStorage.getItem('scroe')
  isQuest.value = false
}

function goNext() {
  let next = 'Question02'
  setStep(next, player.id)
  step.value = next
}
</script>
<style>
.question.s01{
  width: 105vw;
  height: 84vh;
  background: url('../assets/images/s01-bg.png') no-repeat center;
  background-position: bottom center;
  background-size: auto 100%;
  padding: 18vh 5vw;
}
.question.s01 .title {
  color: #cda674;
  font-size: 1.8rem;
  text-shadow: #000 0.1rem 0.1rem;
  margin-bottom: 1.8rem;
}
.question.s01 .btn{
  margin-right: 5vw;
  background-color: #cda674;
  float: right;
  width: 25vw;
}
.result {
  color: #cda674;
  font-size: 1.6rem;
  line-height: 48px;
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
  width: 25vw;
  text-align: center;
}

</style>
