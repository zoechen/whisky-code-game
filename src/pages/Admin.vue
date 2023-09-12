<template>
    <div class="logo"></div>
    <div class="container">

    <a-tabs v-model:activeKey="activeKey" type="card">
    <a-tab-pane key="1" tab="遊戲控制">
        {{ socketStatus }}
        <a-card>
        <a-row :gutter="[4, 16]">
            <a-divider>第二段控制</a-divider>
            <a-col :span="12"><a-button @click="resultPass('Question2_0')">結束倒數</a-button></a-col>
            <a-col :span="12"><a-button @click="resultPass('gambleWait')">準備開始</a-button></a-col>
            <a-col :span="12"><a-button @click="resultPass('gamble')">開始</a-button></a-col>
            <a-col :span="12"><a-button @click="resultPass('result')">給結果</a-button></a-col>
            <a-col :span="12"><a-button @click="resultPass('NextRound')">玩家自己玩</a-button></a-col>
            <a-divider>配對</a-divider>
            <a-col :span="12"><a-button class="btn" @click="createMatchData12()">生成配對</a-button></a-col>
            <a-col :span="12"><a-button @click="resultPass('changeMatch')">更換配對後開始pk</a-button></a-col>
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
        <a-table
        :columns="columns"
        row-key="_id"
        :data-source="rankList"
        >
        </a-table>

    </a-tab-pane>
    <a-tab-pane key="3" tab="總名單"> <a-table
        :columns="columns"
        row-key="_id"
        :data-source="allPlayer"
        >
        </a-table></a-tab-pane>
  </a-tabs>
        
    </div>
</template>
<script setup>
import { ref, onMounted, watch, computed } from 'vue'
import { socket, state } from "@/socket"
import { getPlayerIDList, playerListID, createMatchList, getMatchList, matchList, deleteMatchData, allPlayer, getAllPlayer,getRank,rankList } from '../api/index'
import { usePagination } from 'vue-request';
import axios from 'axios';

const n = ref(5)
const m = ref(10)
const teamA = ref([])
const teamB = ref([])
const activeKey = ref("1")
const socketStatus = ref('')

const columns = [
  {
    title: 'ID',
    dataIndex: 'userID',
    width: '20%'
  },{
    title: '匿稱',
    dataIndex: 'name',
    width: '20%'
  },{
    title: '總分',
    dataIndex: 'score',
    width: '20%'
  }
]

const queryData = params => {
  return axios.get('https://whisky-code-server.onrender.com/api/getAll', {
    params,
  });
}

const {
  data: dataSource,
  run,
  loading,
  current,
  pageSize,
} = usePagination(queryData, {
  formatResult: res => res.data.results,
  pagination: {
    currentKey: 'page',
    pageSizeKey: 'results',
  },
});
const pagination = computed(() => ({
  total: 200,
  current: current.value,
  pageSize: pageSize.value,
}));
const handleTableChange = (pag, filters, sorter) => {
  run({
    results: pag.pageSize,
    page: pag?.current,
    sortField: sorter.field,
    sortOrder: sorter.order,
    ...filters,
  });
}
// const resultCounter =computed(() => {
//     if(state.onlineList.length > matchList.length*2){
//         return matchList.length*2
//     }else{
//         return state.onlineList.length || 0
//     }
// })
// const matchListCounter =computed(() => {
//         return matchList.length*2
// })

onMounted(() => {
    getMatchList()
    getPlayerIDList()
    getAllPlayer()
    getRank()
    setTimeout(()=>{
        console.log(allPlayer.value)
    },3000)
})



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