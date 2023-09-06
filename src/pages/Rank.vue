<template>
    <div class="logo"></div>
    <div class="rank">
      <a-row :gutter="[4, 16]">
        <a-col :span="12">teamA</a-col>
        <a-col :span="12">teamB</a-col>
       </a-row>
       <a-row :gutter="[4, 16]" v-for="player in playerList">
        <a-col :span="12">{{ player.teamA.name }}</a-col>
        <a-col :span="12">{{ player.teamB.name }}</a-col>
       </a-row>
    </div>
    <div class="footer">
        <div class="shadow"></div>
      </div>
  </template>
  <script setup>
  import { ref, onMounted, reactive } from 'vue'
  import { getMatchList, matchList } from '../api/index'
  
  const game = ref('rank')

  onMounted(() => {
    getMatchList()
  })

  
 
  </script>
 <style>
 .rank{
   text-align: center;
   width: 100vw;
   height: 82vh;
   background: url('../assets/images/rank-bg.png') no-repeat center;
   background-position: bottom center;
   background-size: auto 105%;
   padding: 10% 4rem;
 }
 .rank .title {
   color: #cda674;
   font-size: 2rem;
 }
 .rank .btn{
   background-color: #cda674;
 }
 
 </style>