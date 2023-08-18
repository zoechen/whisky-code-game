<template>
  <Start v-if="step == 'Start'"/>
  <NewOne v-if="step == 'NewOne'"/>
  <Question01 v-if="step == 'Question01'"/>
  <Question02 v-if="step == 'Question02'"/>
  <Question03 v-if="step == 'Question03'"/>
  <Rank v-if="step == 'Rank'"/>
</template>

<script setup>
import { step } from './api/index'
import { onMounted } from 'vue'
import Start from "./components/Start.vue"
import NewOne from "./components/NewOne.vue"
import Question01 from "./components/Question01.vue"
import Question02 from "./components/Question02.vue"
import Question03 from "./components/Question03.vue"
import Rank from "./components/Rank.vue"
onMounted(() => {
    localStorage.clear()
    step.value = "Start"
})
</script>
