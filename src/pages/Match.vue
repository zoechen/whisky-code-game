<template>
    <div class="logo"></div>
    <div class="match">
        <a-button class="btn" @click="createMatchData()">看看比賽結果</a-button>
      <a-row :gutter="[4, 16]">
        <a-col :span="12">teamA</a-col>
        <a-col :span="12">teamB</a-col>
       </a-row>
       <a-row :gutter="[4, 16]" v-for="player in matchList">
        <a-col :span="12">{{ player.teamA }}</a-col>
        <a-col :span="12">{{ player.teamB }}</a-col>
       </a-row>
    </div>

  </template>
  <script setup>
  import { ref, onMounted, reactive } from 'vue'
  import { getPlayerIDList, playerListID, createMatchList, getMatchList, matchList } from '../api/index'
  const teamA = ref([])
  const teamB = ref([])

  onMounted(() => {
    getPlayerIDList()
  })

  function createMatchData() {
    console.log(playerListID.value.length)
        for (let i = 0; i < playerListID.value.length; i++){
           if(i%2){
            teamA.value.push(playerListID.value[i]) 
           }else{
            teamB.value.push(playerListID.value[i]) 
           }
        }
       console.log(teamA.value, teamB.value)
       setTimeout(() => {
        updateMatchData()
       }, 500);
  }
function updateMatchData(){
  for (let i = 0; i < teamA.value.length; i++){
            let matchData = {
                matchID: i,
                teamA: teamA.value[i],
                teamB: teamB.value[i],
            }
            createMatchList(matchData)
        }
    getMatchList()
}
  </script>
 <style>

.logo{
  width: 100vw;
  background: url('../assets/images/logo-01.png') no-repeat;
  background-position: center left;
  background-size: auto 60%;
  height: 6vh;
}
 .match{
   text-align: center;
   padding: 2rem;
 }
 .rank .title {
   color: #cda674;
   font-size: 2rem;
 }
 .rank .btn{
   background-color: #cda674;
 }
 
 </style>