<template>
  <div class="box">
    <div class="logo"></div>
    <div class="rank">
      <div v-if="game == 'rank'">
        <div class="rule">
          <p class="title"> 你目前總籌碼有
            {{ player.score }}</p>
          <p class="title"> 投入成本
            {{ player.cost }}</p>
          <p class="title"> 利潤
            {{ player.score - player.cost }}</p>
        </div>
      </div>
    </div>
    <div class="footer">
      <div class="shadow"></div>
    </div>
  </div>
</template>
<script setup>
import { ref, onMounted, } from 'vue'
import { player, getPlayerScore } from '../api/index'

const game = ref('rank')


onMounted(() => {
  getPlayerScore(player.userID)
})

</script>
<style>
.rank {
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

.rank .btn {
  background-color: #cda674;
}
</style>