<template>
    <div class="logo"></div>
    <div class="container">
        <a-row :gutter="[4, 16]">
            <a-col :span="12">teamA</a-col>
            <a-col :span="12">teamB</a-col>
        </a-row>
        <a-row :gutter="[4, 16]" v-for="team in matchList">
            <a-col :span="8">{{ team.matchID }}</a-col>
            <a-col :span="8">{{ team.teamA }} : {{ state.onlineList[team.teamA] }}</a-col>
            <a-col :span="8">{{ team.teamB }} : {{ state.onlineList[team.teamB] }}</a-col>
        </a-row>
        <a-space></a-space>

        <a-row :gutter="[4, 16]">
            <a-col :span="12">pk01,剩{{ n }}局</a-col>
            <a-col :span="12">pk02,剩{{ m }}局</a-col>
            <a-col :span="8"><a-button @click="resultPass('gamble')">開始</a-button></a-col>
            <a-col :span="8"><a-button @click="resultPass('result')">給結果</a-button></a-col>
            <a-col :span="8"><a-button @click="resultPass('NextRound')">下一局</a-button></a-col>
        </a-row>
        <a-row>
            <a-col :span="24">第三段控制</a-col>
            <a-col :span="8"><a-button class="btn" @click="createMatchData12()">第二次 生成配對</a-button></a-col>
            <a-col :span="8"><a-button @click="resultPass('changeMatch')">換配對</a-button></a-col>
        </a-row>
        <a-row>
            <a-col :span="24">第三段控制</a-col>
            <a-col :span="6"><a-button @click="resultPass('investment00')">投資說明</a-button></a-col>
            <a-col :span="6"><a-button @click="resultPass('investment01')">投資一</a-button></a-col>
            <a-col :span="6"><a-button @click="resultPass('investment02')">投資二</a-button></a-col>
            <a-col :span="6"><a-button @click="resultPass('investment03')">投資三</a-button></a-col>
            <a-col :span="6"><a-button @click="resultPass('WineAns')">看解答</a-button></a-col>
        </a-row>
        <a-row>{{ state.onlineList }}</a-row>
    </div>
</template>
<script setup>
import { ref, onMounted, watch } from 'vue'
import { socket, state } from "@/socket"
import { getPlayerIDList, playerListID, createMatchList, getMatchList, matchList } from '../api/index'

const n = ref(5)
const m = ref(10)
const game = ref('rank')
const teamA = ref([])
const teamB = ref([])

onMounted(() => {
    getMatchList()
})

watch([state.onlineList, matchList], () => {

})

function resultPass(v) {
    let timer
    socket.emit('adminStep', v)
    if (v == 'NextRound') {
        n.value -= 1
        if (n.value == 0) {
            m.value -= 1
            n.value = 0
        }
    } else if (v == 'changeMatch') {
        setTimeout(() => { socket.emit('gambleWait', v) }, 300)
    }
}
function createMatchData12() {
    console.log(playerListID.value.length)
    for (let i = 0; i < playerListID.value.length; i++) {
        if (i % 2) {
            teamA.value.push(playerListID.value[i])
        } else {
            teamB.value.push(playerListID.value[i])
        }
    }
    console.log(teamA.value, teamB.value)
    setTimeout(() => {
        updateMatchData()
    }, 500);
}

function updateMatchData() {
    
    for (let i = 0; i < playerListID.value.length; i++) {
        deleteMatchData(playerListID.value[i])
    }
        setTimeout(() =>{
            for (let i = 0; i < teamA.value.length; i++) {
                let matchData = {
                    matchID: i,
                    teamA: teamA.value[i],
                    teamB: teamB.value[i],
                }
                createMatchList(matchData)
            }
            getMatchList()

        },1000)
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
    height: 94vh;
    background-color: #342a1a;
    text-align: center;
    padding: 2rem;
}
</style>