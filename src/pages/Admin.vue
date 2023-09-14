<template>
    <div class="logo"></div>
    <div class="container">

    <a-tabs v-model:activeKey="activeKey" type="card">
    <a-tab-pane key="1" tab="遊戲控制">
        {{ socketStatus }}
        <a-card>
        <a-row :gutter="[4, 16]">
            <a-divider>第二段試玩控制</a-divider>
            <a-col :span="12"><a-button @click="resultPass('Question2_0')">1 結束倒數</a-button></a-col>
            <a-col :span="12"><a-button @click="resultPass('gambleWait')">2 準備開始</a-button></a-col>
            <a-col :span="12"><a-button @click="resultPass('gamble')">3 開始</a-button></a-col>
            <a-col :span="12"><a-button @click="resultPass('result')">4 結果</a-button></a-col>
            <a-divider>第二段正式</a-divider>
            <!-- <a-col :span="12"><a-button class="btn" @click="createMatchData12()">生成配對</a-button></a-col> -->
            <a-col :span="12"><a-button @click="resultPass('NextRound')">正式開炲</a-button></a-col>
            <a-col :span="12"><a-button @click="resultPass('forceStop')">強制結束</a-button></a-col>
            <a-divider>第三段控制</a-divider>
            <a-col :span="12"><a-button @click="resultPass('investment00')">投資說明</a-button></a-col>
            <a-col :span="12"><a-button @click="resultPass('investment01')">投資一</a-button></a-col>
            <a-col :span="12"><a-button @click="resultPass('investment02')">投資二</a-button></a-col>
            <a-col :span="12"><a-button @click="resultPass('investment03')">投資三</a-button></a-col>
            <a-col :span="12"><a-button @click="resultPass('WineAns')">看解答</a-button></a-col>
        </a-row>
        </a-card>
    </a-tab-pane>
    <a-tab-pane key="2" tab="排名前十">
      <a-button @click="getRank">刷新</a-button>
        <a-table
        :columns="rankcolumns"
        row-key="_id"
        :data-source="rankList"
        >
        </a-table>

    </a-tab-pane>
    <a-tab-pane key="3" tab="總名單"> 
      <a-table
        :columns="columns"
        row-key="_id"
        :data-source="allPlayer"
        >
        <template #bodyCell="{ column, text, record }">
          <template v-if="column.key === 'operation'">
            <a @click="isPop=true;formState = record;">設定</a>
          </template>
        </template>
        </a-table></a-tab-pane>
  </a-tabs>
  <a-modal v-model:visible="isPop" title="" ok-text="送出" cancel-text="取消" id="redeemDialog"
    :bodyStyle="{ color: '#d5cdc4' }" @ok="setPlayer(formState)">
    <a-form
    ref="formRef"
    :model="formState"
    :rules="rules"
    :label-col="labelCol"
    :wrapper-col="wrapperCol"
  >
    <a-form-item label="ID" name="userID">
     {{ formState.userID }} 
    </a-form-item>
    <a-form-item label="步驟" name="step">
      <a-select v-model:value="formState.step" placeholder="">
        <a-select-option value="NewOne">NewOne</a-select-option>
        <a-select-option value="Question1_1">Question1_1</a-select-option>
        <a-select-option value="Question1_2">Question1_2</a-select-option>
        <a-select-option value="Question1_3">Question1_3</a-select-option>
        <a-select-option value="Question1_4">Question1_4</a-select-option>
        <a-select-option value="Question1_5">Question1_5</a-select-option>
        <a-select-option value="Question2_0">Question2_0</a-select-option>
        <a-select-option value="Question2_1">Question2_1</a-select-option>
        <a-select-option value="Question2_2">Question2_2</a-select-option>
        <a-select-option value="Question2_3">Question2_3</a-select-option>
        <a-select-option value="Question3_0">Question3_0</a-select-option>
        <a-select-option value="Question3_1_1">Question3_1_1</a-select-option>
        <a-select-option value="Question3_1_2">Question3_1_2</a-select-option>
        <a-select-option value="Question3_2_1">Question3_2_1</a-select-option>
        <a-select-option value="Question3_2_2">Question3_2_2</a-select-option>
        <a-select-option value="Question3_1_1">Question3_3</a-select-option>
        <a-select-option value="Question3_1_1">Question3_4</a-select-option>
        <a-select-option value="MyScore">MyScore</a-select-option>
        <a-select-option value="WineAns">WineAns</a-select-option>
      </a-select>
    </a-form-item>
    <a-form-item ref="score" label="籌碼" name="score">
      <a-input v-model:value="formState.score" />
    </a-form-item>
  </a-form>
  </a-modal>
    </div>
</template>
<script setup>
import { ref, reactive, onMounted, watch, computed } from 'vue'
import { socket, state } from "@/socket"
import { getPlayerIDList, playerListID, createMatchList, getMatchList, 
        matchList, deleteMatchData, allPlayer, getAllPlayer, getRank, rankList, setupPlayer } from '../api/index'
import { usePagination } from 'vue-request';
import axios from 'axios';

const n = ref(5)
const m = ref(10)
const teamA = ref([])
const teamB = ref([])
const isPop =ref(false)
const activeKey = ref("1")
const socketStatus = ref('')
const formState = reactive({
  name:'',
  score:0,
  step: '',
  userID:''
})
const rankcolumns = [
  {
    title: 'ID',
    dataIndex: 'userID',
    width: '10%'
  },{
    title: '匿稱',
    dataIndex: 'name',
    width: '20%'
  },{
    title: '總分',
    dataIndex: 'score',
    width: '20%'
  },
  
]
const columns = [
  {
    title: 'ID',
    dataIndex: 'userID',
    width: '5%'
  },{
    title: '匿稱',
    dataIndex: 'name',
    width: '20%'
  },
  {
    title: '步驟',
    dataIndex: 'step',
    width: '25%'
  },{
    title: '總分',
    dataIndex: 'score',
    width: '20%'
  },
  {
    title: '重置',
    key: 'operation',
    fixed: 'right',
    width: '10%'
  },
]

const queryData = params => {
  return axios.get('https://whisky-code-server.onrender.com/api/getAll', {
    params,
  });
}

onMounted(() => {
    getMatchList()
    getPlayerIDList()
    getAllPlayer()
    getRank()
})

function setPlayer(player){
  setupPlayer(player)
  isPop.value = false
}

function resultPass(v) {
    socketStatus.value = v
    socket.emit('adminStep', v)
    if (v == 'NextRound') {
        n.value -= 1
        if (n.value == 0) {
            m.value -= 1
            n.value = 0
        }
        socket.emit('zero') 
    } else if (v == 'changeMatch') {
        setTimeout(() => { socket.emit('gambleWait', v) }, 300)
    }
}

function createMatchData12() {
    const copyArr = [...playerListID.value];

  while (copyArr.length > 0) {
    const randomIndex = Math.floor(Math.random() * copyArr.length);
    const randomElement = copyArr.splice(randomIndex, 1)[0];

    if (teamA.value.length <= teamB.value.length) {
      teamA.value.push(randomElement);
    } else {
      teamB.value.push(randomElement);
    }
  }
    console.log(teamA.value, teamB.value)
    setTimeout(() => {
         updateMatchData()
    }, 500);
}

function updateMatchData(){
    deleteMatchData()
        setTimeout(() =>{
            for (let i = 0; i < teamA.value.length; i++) {
                let matchData = {
                    matchID: i,
                    teamA: teamA.value[i],
                    teamB: teamB.value[i],
                }
                createMatchList(matchData)
            }

        },1000)
        setTimeout(() =>{
            getMatchList()
        },5000)
}


</script>

<style>
#app {
    padding: 0;
}

.logo {
    width: 100vw;
    background: url('../assets/images/logo-01.png') no-repeat;
    background-position: center left;
    background-size: auto 60%;
    height: 6vh;
}

.container {
    margin: 0 auto;
    min-width: 80vw;
    height: 100%;
    background-color: #d5cdc4;
    text-align: center;
    padding: 2rem;
}
</style>