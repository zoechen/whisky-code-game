<template>
    <a-spin v-if="loading" />
    <Start v-if="step == 'Start'"/>
    <NewOne v-if="step == 'NewOne'"/>
    <Question1_1 v-if="step == 'Question1_1'"/>
    <Question1_2 v-if="step == 'Question1_2'"/>
    <Question1_3 v-if="step == 'Question1_3'"/>
    <Question1_4 v-if="step == 'Question1_4'"/>
    <Question2_0 v-if="step == 'Question2_0'"/>
    <Question2_1 v-if="step == 'Question2_1'"/>
    <Question2_2 v-if="step == 'Question2_2'"/>
    <Question3_1 v-if="step == 'Question3_1'"/>
    <Question3_2 v-if="step == 'Question3_2'"/>
    <MyScore v-if="step == 'MyScore'" />
  </template>
  
  <script setup>
  import { step, loading } from '../api/index'
  import { onMounted } from 'vue'
  import Start from "../components/Start.vue"
  import NewOne from "../components/NewOne.vue"
  import Question1_1 from "../components/Question1_1.vue"
  import Question1_2 from "../components/Question1_2.vue"
  import Question1_3 from "../components/Question1_3.vue"
  import Question1_4 from "../components/Question1_4.vue"
  import Question2_0 from "../components/Question2_0.vue"
  import Question2_1 from "../components/Question2_1.vue"
  import Question2_2 from "../components/Question2_2.vue"
  import Question3_1 from "../components/Question3_1.vue"
  import Question3_2 from "../components/Question3_2.vue"
  import MyScore from "../components/MyScore.vue"
  onMounted(() => {
      localStorage.clear()
      step.value = "Start"
  })
  </script>
  <style>
  #app{
    padding:0 !important;
    overflow: hidden;
  }
  body{
    background-color: #342a1a;
  }
  .waxy{
    color: #552917;
    font-style: opitma;
  }
  .warm{
    color: #d97e31;
  }
  .oily{
    color: #cda674;
  }
  .fino{
    color: #d5cdc4;
  }
  .deli{
    color: #f5f1ea;
  }
  .sulp{
    color: #342a1a;
  }
  .crea{
    color: #f1bd3f;
  }
  .manz{
    color: #d5cdc4;
  }
  
  </style>
  