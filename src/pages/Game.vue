<template>
    <Start v-if="step == 'Start'"/>
    <NewOne v-if="step == 'NewOne'"/>
    <Question1_1 v-if="step == 'Question1_1'"/>
    <Question1_2 v-if="step == 'Question1_2'"/>
    <Question1_3 v-if="step == 'Question1_3'"/>
    <Question1_4 v-if="step == 'Question1_4'"/>
    <Question1_5 v-if="step == 'Question1_5'"/>
    <Question2_1 v-if="step == 'Question2_1'"/>
    <Question2_2 v-if="step == 'Question2_2'"/>
    <Question3_0 v-if="step == 'Question3_0'"/>
    <Question3_1_1 v-if="step == 'Question3_1_1'"/>
    <Question3_1_2 v-if="step == 'Question3_1_2'"/>
    <Question3_2_1 v-if="step == 'Question3_2_1'"/>
    <Question3_2_2 v-if="step == 'Question3_2_2'"/>
    <Question3_3 v-if="step == 'Question3_3'"/>
    <Question3_4 v-if="step == 'Question3_4'"/>
    <MyScore v-if="step == 'MyScore'" />
    <WineAns v-if="step == 'WineAns'" />
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
  import Question1_5 from "../components/Question1_5.vue"
  import Question2_1 from "../components/Question2_1.vue"
  import Question2_2 from "../components/Question2_2.vue"
  import Question3_0 from "../components/Question3_0.vue"
  import Question3_1_1 from "../components/Question3_1_1.vue"
  import Question3_1_2 from "../components/Question3_1_2.vue"
  import Question3_2_1 from "../components/Question3_2_1.vue"
  import Question3_2_2 from "../components/Question3_2_2.vue"
  import Question3_3 from "../components/Question3_3.vue"
  import Question3_4 from "../components/Question3_4.vue"
  import MyScore from "../components/MyScore.vue"
  import WineAns from "../components/WineAns.vue"
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
  