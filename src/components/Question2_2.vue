<template>
  <div>
    <div class="logo">
    </div>
    <div class="question s02">
      <div class="pk">
      <div class="header">中場休息</div>
      <div class="rule">
        <p class="title">{{ player.name }}</p>
        <p class="tips">
         
        <br/>
        您目前有
        <br/>
        <div class="amount">{{ player.score }}</div>
        </p>
      </div>
    </div>
  </div>
    <div class="footer">
    </div>
  </div>
</template>
<script setup>
import { step, setStep, player } from '../api/index'
import { socket } from "@/socket"

socket.on("adminStep", (v) => {
  if(v == 'changeMatch'){
    goNext('Question2_3')
  }else if(v == 'investment00'){
    goNext('Question3_0')
  }
});

function goNext(next) {
  setStep(next, player)
  step.value = next
}
</script>
