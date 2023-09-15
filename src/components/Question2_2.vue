<template>
  <div>
    <div class="logo">探員 {{ player.userID }} 籌碼 {{ player.score }}</div>
    <div class="question s02">
      <div class="pk">
      <div class="rule">
        <p class="title">{{ player.name }}</p>
        <div class="header">中場休息</div>
        <p class="tips">
        <br/>
        您目前有
        <br/>
        <div class="amount">{{ score }}</div>
        </p>
      </div>
    </div>
  </div>
    <div class="footer">
    </div>
  </div>
</template>
<script setup>
import { ref, onMounted, computed, watch } from 'vue'
import { step, setStep, player } from '../api/index'
import { socket } from "@/socket"
const score = computed(() => Number(player.score).toLocaleString() )
socket.emit("connect")
socket.on("adminStep", (v) => {
  if(v == 'investment00'){
    goNext('Question3_0')
  }
});


function goNext(next) {
  setStep(next, player)
  step.value = next
}
</script>
