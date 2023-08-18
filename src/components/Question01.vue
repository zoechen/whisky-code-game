<template>
  <div class="flex flex-col justify-center" v-if="isQuest">
    <p class="title">{{ player.name }},聞一聞迎賓酒,您覺得裡面有什麼味道?</p>
    <a-form :label-col="{ span: 8 }" :wrapper-col="{ span: 16 }">
      <a-checkbox-group v-model:value="selected">
        <!--建議設負分，避免全選的人跟選對的人同分-->
        <a-row :gutter="[4,16]">
          <a-col :span="8">
              <a-checkbox value="100000">
                  <a-card :class="selected.includes('100000')?'active':'normal'">巧克力</a-card>
              </a-checkbox>
          </a-col>
          <a-col :span="8">
                <a-checkbox value="20">
                  <a-card :class="selected.includes('20')?'active':'normal'">辣椒</a-card>
              </a-checkbox>
          </a-col>
          <a-col :span="8">
              <a-checkbox value="300000">
                  <a-card :class="selected.includes('300000')?'active':'normal'">橡木</a-card>
              </a-checkbox>
          </a-col>
          <a-col :span="8">
            <a-checkbox value="600">
                  <a-card :class="selected.includes('600')?'active':'normal'">酸梅</a-card>
              </a-checkbox>
          </a-col>
          <a-col :span="8">
            <a-checkbox value="800">
                  <a-card :class="selected.includes('800')?'active':'normal'">焦糖</a-card>
              </a-checkbox>
          </a-col>
          <a-col :span="8">
            <a-checkbox value="200000">
                  <a-card :class="selected.includes('200000')?'active':'normal'">蜂蜜</a-card>
            </a-checkbox>
          </a-col>
          <a-col :span="8">
            <a-checkbox value="500">
                  <a-card :class="selected.includes('500')?'active':'normal'">檜木</a-card>
            </a-checkbox>
          </a-col>
          <a-col :span="8">
            <a-checkbox value="200">
                  <a-card :class="selected.includes('200')?'active':'normal'">生薑</a-card>
            </a-checkbox>
          </a-col>
          <a-col :span="8">
            <a-checkbox value="100">
                  <a-card :class="selected.includes('100')?'active':'normal'">酸檸檬</a-card>
            </a-checkbox>
          </a-col>
        </a-row>
      </a-checkbox-group>
      <a-row :gutter="[4,16]">
        <a-col :span="24">
          <a-button class="w-full" type="primary" @click="sentAns">確定</a-button>
        </a-col>
        <a-col :span="24">
          <p class="result">{{ player.userID }} 得分 {{ nowscroe }}</p>
        </a-col>
      </a-row>
    </a-form>
  </div>
  <div class="flex flex-col justify-center" v-else>
    <p class="title">{{ player.name }},猜對了嗎??</p>
    <a-form :label-col="{ span: 8 }" :wrapper-col="{ span: 16 }">
      <a-checkbox-group disabled>
        <!--建議設負分，避免全選的人跟選對的人同分-->
        <a-row :gutter="[4,16]">
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
      <a-row :gutter="[4,16]">
        <a-col :span="24">
          <p class="result">得分 {{ nowscroe }}</p>
          <a-button class="w-full" type="primary" @click="goNext">下一題</a-button>
        </a-col>
      </a-row>
    </a-form>
  </div>
</template>
<script setup>
import { ref } from 'vue'
import { createScroe, setStep, player,step } from '../api/index'

const selected = ref([])
const nowscroe = ref(0)
const isQuest = ref(true)

function sentAns(){
    let counter = 0
    counter = selected.value.reduce((a,b)=>{return Number(a)+Number(b)})
    console.log("counter: " + counter)
    createScroe(counter,player.userID)
    nowscroe.value = localStorage.getItem('scroe')
    isQuest.value = false
}

function goNext(){
  let next = 'Question02'
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
.active{
  background: #1677ff;
  color: #fff;
}
.normal{
  background: #fff;
  color: #000;
}
.ant-checkbox{
  display: none;
}
.ant-card{
  min-width: 100%;
}
</style>