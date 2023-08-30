<template>
  <div class="logo"></div>
  <div class="question s01">
    <div v-if="game=='isQuest'">
      <p class="title">{{ player.name }},請享用迎賓酒</p>
      <p class="tip">您覺得裡面有什麼味道呢？<br/>猜中可以得到豐厚token哦！</p>
      <p class="title">請問你喝的是？</p>
      <a-form :label-col="{ span: 8 }" :wrapper-col="{ span: 16 }">
        <a-row :gutter="[4, 16]">
          <a-col :span="24" style="margin-top: 2rem">
            <a-button class="btn" size="large" type="primary" @click="game='wineDrinkQ'">有酒精</a-button>
            <a-button class="btn" size="large" type="primary" @click="game='softDrinkQ'">無酒精</a-button>
          </a-col>
        </a-row>
      </a-form>
    </div>
    <div v-if="game=='wineDrinkQ'">
      <p class="title">{{ player.name }},<br/>您覺得裡面有什麼味道?</p>
      <p class="tip">(最多選四個)</p>
      <a-form :label-col="{ span: 8 }" :wrapper-col="{ span: 16 }">
        <a-checkbox-group v-model:value="selected" >
          <a-row :gutter="[4, 16]">
            <a-col :span="8">
              <a-checkbox value="100001">
                <a-card :class="selected.includes('100001') ? 'active' : 'normal'">檸檬</a-card>
              </a-checkbox>
            </a-col>
            <a-col :span="8">
              <a-checkbox value="20">
                <a-card :class="selected.includes('20') ? 'active' : 'normal'">阿薩姆紅茶</a-card>
              </a-checkbox>
            </a-col>
            <a-col :span="8">
              <a-checkbox value="100002">
                <a-card :class="selected.includes('100002') ? 'active' : 'normal'">伯爵茶</a-card>
              </a-checkbox>
            </a-col>
            <a-col :span="8">
              <a-checkbox value="30">
                <a-card :class="selected.includes('30') ? 'active' : 'normal'">蜂蜜</a-card>
              </a-checkbox>
            </a-col>
            <a-col :span="8">
              <a-checkbox value="40">
                <a-card :class="selected.includes('40') ? 'active' : 'normal'">肉桂</a-card>
              </a-checkbox>
            </a-col>
            <a-col :span="8">
              <a-checkbox value="100003">
                <a-card :class="selected.includes('100003') ? 'active' : 'normal'">佛手柑</a-card>
              </a-checkbox>
            </a-col>
            <a-col :span="8">
              <a-checkbox value="100004">
                <a-card :class="selected.includes('100004') ? 'active' : 'normal'">金桔</a-card>
              </a-checkbox>
            </a-col>
            <a-col :span="8">
              <a-checkbox value="60">
                <a-card :class="selected.includes('60') ? 'active' : 'normal'">生薑</a-card>
              </a-checkbox>
            </a-col>
          </a-row>
        </a-checkbox-group>
        <a-row :gutter="[4, 16]">
          <a-col :span="24" style="margin-top: 2rem">
            <a-button class="btn" size="large" type="primary" @click="sentAns();game='wineDrinkA'">確定</a-button>
          </a-col> 
        </a-row>
      </a-form>
    </div>
    <div v-if="game=='wineDrinkA'">
      <p class="title">{{ player.name }},猜對了嗎??</p>
      <p class="result">恭喜獲得 ${{ nowscroe }}</p>
      <a-form :label-col="{ span: 8 }" :wrapper-col="{ span: 16 }">
        <a-checkbox-group disabled>
          <a-row :gutter="[4, 16]">
            <a-col :span="8">
              <a-checkbox value="100001">
                <a-card :class="selected.includes('100001') ? 'active' : 'normal'">檸檬<br/>100000</a-card>
              </a-checkbox>
            </a-col>
            <a-col :span="8">
              <a-checkbox value="20">
                <a-card :class="selected.includes('20') ? 'active' : 'normal'">阿薩姆紅茶<br/>X</a-card>
              </a-checkbox>
            </a-col>
            <a-col :span="8">
              <a-checkbox value="100002">
                <a-card :class="selected.includes('100002') ? 'active' : 'normal'">伯爵茶<br/>100000</a-card>
              </a-checkbox>
            </a-col>
            <a-col :span="8">
              <a-checkbox value="30">
                <a-card :class="selected.includes('30') ? 'active' : 'normal'">蜂蜜<br/>X</a-card>
              </a-checkbox>
            </a-col>
            <a-col :span="8">
              <a-checkbox value="40">
                <a-card :class="selected.includes('40') ? 'active' : 'normal'">肉桂<br/>X</a-card>
              </a-checkbox>
            </a-col>
            <a-col :span="8">
              <a-checkbox value="100003">
                <a-card :class="selected.includes('100003') ? 'active' : 'normal'">佛手柑<br/>100000</a-card>
              </a-checkbox>
            </a-col>
            <a-col :span="8">
              <a-checkbox value="100004">
                <a-card :class="selected.includes('100004') ? 'active' : 'normal'">金桔<br/>100000</a-card>
              </a-checkbox>
            </a-col>
            <a-col :span="8">
              <a-checkbox value="60">
                <a-card :class="selected.includes('60') ? 'active' : 'normal'">生薑<br/>X</a-card>
              </a-checkbox>
            </a-col>
          </a-row>
        </a-checkbox-group>
       
        <a-row :gutter="[4, 16]">
          <a-col  class="result" :span="24">
            <a-button class="btn"  size="large" type="primary" @click="goNext">下一題</a-button>
          </a-col>
        </a-row>
      </a-form>
    </div>
    <div v-if="game=='softDrinkQ'">
      <p class="title">{{ player.name }},<br/>您覺得裡面有什麼味道?</p>
      <a-form :label-col="{ span: 8 }" :wrapper-col="{ span: 16 }">
        <a-checkbox-group v-model:value="selected" >
          <a-row :gutter="[4, 16]">
            <a-col :span="8">
              <a-checkbox value="100001">
                <a-card :class="selected.includes('100001') ? 'active' : 'normal'">阿薩姆紅茶</a-card>
              </a-checkbox>
            </a-col>
            <a-col :span="8">
              <a-checkbox value="100002">
                <a-card :class="selected.includes('100002') ? 'active' : 'normal'">伯爵茶</a-card>
              </a-checkbox>
            </a-col>
            <a-col :span="8">
              <a-checkbox value="80">
                <a-card :class="selected.includes('80') ? 'active' : 'normal'">巧克力</a-card>
              </a-checkbox>
            </a-col>
            <a-col :span="8">
              <a-checkbox value="90">
                <a-card :class="selected.includes('90') ? 'active' : 'normal'">肉桂</a-card>
              </a-checkbox>
            </a-col>
            <a-col :span="8">
              <a-checkbox value="100004">
                <a-card :class="selected.includes('100004') ? 'active' : 'normal'">蘋果</a-card>
              </a-checkbox>
            </a-col>
            <a-col :span="8">
              <a-checkbox value="30">
                <a-card :class="selected.includes('30') ? 'active' : 'normal'">接骨木</a-card>
              </a-checkbox>
            </a-col>
            <a-col :span="8">
              <a-checkbox value="60">
                <a-card :class="selected.includes('60') ? 'active' : 'normal'">生薑</a-card>
              </a-checkbox>
            </a-col>
            <a-col :span="8">
              <a-checkbox value="100003">
                <a-card :class="selected.includes('100003') ? 'active' : 'normal'">葡萄柚</a-card>
              </a-checkbox>
            </a-col>
          </a-row>
        </a-checkbox-group>
        <a-row :gutter="[4, 16]">
          <a-col :span="24" style="margin-top: 2rem; float: right;">
            <a-button class="btn" size="large" type="primary" @click="sentAns();game='softDrinkA'">確定</a-button>
          </a-col>
          <!-- <a-col :span="24">
          <p class="result">{{ player.userID }} 得分 {{ nowscroe }}</p>
        </a-col> -->
        </a-row>
      </a-form>
    </div>
    <div v-if="game=='softDrinkA'">
      <p class="title">{{ player.name }},猜對了嗎??</p>
      <p class="result">恭喜獲得 ${{ nowscroe }}</p>
      <a-form :label-col="{ span: 8 }" :wrapper-col="{ span: 16 }">
        <a-checkbox-group disabled>
          <a-row :gutter="[4, 16]">
            <a-col :span="8">
              <a-checkbox value="100001">
                <a-card :class="selected.includes('100001') ? 'active' : 'normal'">阿薩姆紅茶<br/>100000</a-card>
              </a-checkbox>
            </a-col>
            <a-col :span="8">
              <a-checkbox value="100002">
                <a-card :class="selected.includes('100002') ? 'active' : 'normal'">伯爵茶<br/>100000</a-card>
              </a-checkbox>
            </a-col>
            <a-col :span="8">
              <a-checkbox value="80">
                <a-card :class="selected.includes('80') ? 'active' : 'normal'">巧克力<br/>X</a-card>
              </a-checkbox>
            </a-col>
            <a-col :span="8">
              <a-checkbox value="90">
                <a-card :class="selected.includes('90') ? 'active' : 'normal'">肉桂<br/>X</a-card>
              </a-checkbox>
            </a-col>
            <a-col :span="8">
              <a-checkbox value="100004">
                <a-card :class="selected.includes('100004') ? 'active' : 'normal'">蘋果<br/>100000</a-card>
              </a-checkbox>
            </a-col>
            <a-col :span="8">
              <a-checkbox value="30">
                <a-card :class="selected.includes('30') ? 'active' : 'normal'">接骨木<br/>X</a-card>
              </a-checkbox>
            </a-col>
            <a-col :span="8">
              <a-checkbox value="60">
                <a-card :class="selected.includes('60') ? 'active' : 'normal'">生薑<br/>X</a-card>
              </a-checkbox>
            </a-col>
            <a-col :span="8">
              <a-checkbox value="100003">
                <a-card :class="selected.includes('100003') ? 'active' : 'normal'">葡萄柚<br/>100000</a-card>
              </a-checkbox>
            </a-col>
          </a-row>
        </a-checkbox-group>
       
        <a-row :gutter="[4, 16]">
          <a-col  class="result" :span="24">
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
import { ref, watch } from 'vue'
import { message } from 'ant-design-vue'
import { createScroe, setStep, player, step} from '../api/index'

const selected = ref([])
const nowscroe = ref(0)
const game = ref('isQuest')

watch(selected, (newX) => {
  console.log(newX)
  if(newX.length >4) {
    message.error("最多選四個")
    selected.value.splice(4,4)
  }
})

function sentAns() {
  let counter = 0
  let temp = selected.value.reduce((a, b) => {
    return Number(a) + Number(b)
  })
  counter = Math.floor(temp/1000)*1000
  createScroe(counter, player.userID)
  nowscroe.value = localStorage.getItem('scroe')
}

function goNext() {
  let next = 'Question1_2'
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
  padding: 8vh 8vw;
}
.question.s01 .title{
  color: #f5f1ea;
  font-size: 1.8rem;
  text-shadow: #000 0.1rem 0.1rem;
  margin-bottom: 1.4rem;
}
.question.s01 .tip{
  color: #d5cdc4;
  font-size: 1.4rem;
  text-shadow: #000 0.1rem 0.1rem;
  margin-bottom: 1.8rem;
}
.question.s01 .btn{
  background-color: #cda674;
  width: 25vw;
  margin: 8px;
  float: right;
}
.question.s01 .result{
  color:#cda674;
  text-shadow: #000 0.1rem 0.1rem;
  font-size: 1.6rem;
  margin-bottom: 1.4rem;
  line-height: 28px;
  float: left;
}
.w25{
  width: 24vw;
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
.ant-card-body {
  width: 24vw;
  text-align: center !important;
  padding:18px 0px !important;
}

</style>
