<template>
    <div class="flex flex-col justify-center" v-if="game == 'rule'">
    <p class="title"> 你目前的得分是  
      {{player.scroe}}</p>
    </div>
  </template>
  <script setup>
  import { ref,  onMounted,  } from 'vue'
  import { player, getPlayerscroe } from '../api/index'
  
  const game = ref('rule')


  onMounted(() => {
    getPlayerscroe(player.userID)
  })
 
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