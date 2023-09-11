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
            <a-col :span="8"><a-button @click="resultPass('changeMatch')">換配對</a-button></a-col>
            <a-col :span="8"><a-button @click="resultPass('gambleWait')" disabled>等開始</a-button></a-col>
            <a-col :span="8"><a-button @click="resultPass('resultWait')" disabled>等結果</a-button></a-col>
        </a-row>
        <a-row>
            <a-col :span="6"><a-button @click="resultPass('investment02')">投資二</a-button></a-col>
            <a-col :span="6"><a-button @click="resultPass('investment02')">投資二</a-button></a-col>
            <a-col :span="6"><a-button @click="resultPass('investment03')">投資三</a-button></a-col>
            <a-col :span="6"><a-button @click="resultPass('wine')">看解答</a-button></a-col>
        </a-row>
        <a-row>{{ state.onlineList }}</a-row>
    </div>
</template>
<script setup>
import { ref, onMounted, computed } from 'vue'
import { getMatchList, matchList } from '../api/index'
import { socket, state } from "@/socket"
const n = ref(5)
const m = ref(10)


const game = ref('rank')

onMounted(() => {
    getMatchList()
})

function resultPass(v) {
    let timer
    socket.emit('adminStep', v)
    if(v == 'NextRound'){
        n.value -= 1
        if(n.value == 0){
            m.value -= 1
            n.value = 0
        }
    }else if(v == 'changeMatch'){
        setTimeout(()=>{ socket.emit('gambleWait', v)},3000)
    }
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
    width: 100vw;
    height: 94vh;
    background-color: #342a1a;
    text-align: center;
    padding: 2rem;
}
</style>