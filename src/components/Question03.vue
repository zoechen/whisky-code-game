<template>
  <div class="flex flex-col justify-center" v-if="game == 'rule'">
    <p class="title">{{ player.name }}探員,<br/>
    我們發現三支值得投資的酒,利用他們來增加您的資產吧!!
    <br/><br/><br/>
    先聽聽 whisky code 的分享</p>
    <a-button class="w-full" type="primary" @click="()=>{ game = 'buyit' }">好</a-button>
  </div>
  <div class="flex flex-col justify-center" v-if="game == 'buyit'">
    <a-row :gutter="[4,16]">
          <a-col :span="24">您目前有 {{ player.scroe  }}</a-col>
          <a-col :span="8">
                  <a-card>
                    <h2>Dr. No</h2>
                    目前市場價格 100,000/支<br/>
                    最低購買量 ___ 支
                    <a-input type="number" v-model:value="wine1num"></a-input>
                    金額{{ 100000 * wine1num  }}
                  </a-card>
          </a-col>
          <a-col :span="8">
                  <a-card>
                    <h2>Goldfinger</h2>
                    目前市場價格 2,200/支<br/>
                    最低購買量 ___ 支
                    <a-input type="number" v-model:value="wine2num"></a-input>
                    金額{{ 2200 * wine2num  }}
                  </a-card>
          </a-col>
          <a-col :span="8">
                  <a-card>
                    <h2>Thunderbal</h2>
                    目前市場價格 4,000/支<br/>
                    最低購買量 ___ 支
                    <a-input type="number" v-model:value="wine3num"></a-input>
                    金額{{ 4000 * wine3num  }}
                  </a-card>
          </a-col>
          <a-col :span="24">
            <a-button class="w-full" type="primary" @click="buyWine">買下去</a-button>
          </a-col>
    </a-row>
  </div>

  <div class="flex flex-col justify-center" v-if="game == 'result'">
    <a-row :gutter="[4,16]">
          <a-col :span="24">2年後</a-col>
          <a-col :span="8">
                  <a-card>
                    <h2>Dr. No</h2>
                    漲伏140%,恭喜賺了<br/>
                    金額{{ wine1win }}
                  </a-card>
          </a-col>
          <a-col :span="8">
                  <a-card>
                    <h2>Goldfinger</h2>
                    漲伏386.36%,恭喜賺了
                    金額{{ wine2win }}
                  </a-card>
          </a-col>
          <a-col :span="8">
                  <a-card>
                    <h2>Thunderbal</h2>
                    漲伏137.5%,恭喜賺了
                    金額{{ wine3win }}
                  </a-card>
          </a-col>
          <a-col :span="24">
            <a-button class="w-full" type="primary" @click="goNext">下一題</a-button>
          </a-col>
    </a-row>
  </div>
</template>
<script setup>
import { ref, onMounted } from 'vue'
import { message } from 'ant-design-vue';
import { setupscroe, setStep, getPlayerscroe,player, step } from '../api/index'

const game = ref('rule')
const wine1num = ref(0)
const wine2num = ref(0)
const wine3num = ref(0)
const wine1win = ref(0)
const wine2win = ref(0)
const wine3win = ref(0)
const openMessage = () => {
      message.error('錢錢不太夠唷！');
    };

onMounted(() => {
  getPlayerscroe(player.userID)
})


function buyWine(){
    wine1win.value = wine1num.value*100000*0.4
    wine2win.value = wine1num.value*4000*2.86
    wine3win.value = wine1num.value*2200*0.37
    let cost = wine1win.value + wine2win.value + wine3win.value + 106200
    let win = player.scroe + wine1win.value + wine2win.value + wine3win.value
    console.log(win)
    if( cost > player.scroe){
      openMessage()
    }else{
      setupscroe(win,player.userID)
      game.value = 'result'
    }
}

function goNext(){
  let next = 'Rank'
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