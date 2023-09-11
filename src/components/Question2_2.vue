<template>
  <div>
    <div class="logo">
    </div>
    <div class="question s02">
      <p class="title">{{ player.name }}</p>
      <div class="rule">
        <p class="tips">
         中場休息
        <br/>
        您目前有
        <br/>
        <b>{{ player.score }}</b>
        </p>
      </div>
    </div>
    <div class="footer">
    </div>
  </div>
</template>
<script setup>
import { ref } from 'vue'
import { step, setStep, setupScore, player } from '../api/index'
import { socket } from "@/socket"

socket.on("adminStep", (v) => {
  if(v == 'changeMatch'){
    goNext()
  }
});

function goNext() {
  setupScore(score, player)
  let next = 'Question2_3'
  setStep(next, player)
  step.value = next
}
</script>
