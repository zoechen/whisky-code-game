<template>
    <div class="logo"></div>
    <div class="rank">
      <div v-if="game == 'rank'">
        <p class="title">最後結果</p>
        <div class="rule">
          <p class="title"> 你目前總籌碼有</p>
            <p>{{ player.score }}</p>
          <p class="title"> 投入成本
            </p>
            <p>{{ player.cost }}</p>
          
        </div>
      </div>
    </div>
    <div class="footer">
      <div class="shadow"></div>
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
  background: url('../assets/images/rank-bg.png') no-repeat;
  background-position: top center;
  background-size: auto 105%;
  padding: 2rem 4rem;
}

.rank .title {
  color: #cda674;
  font-size: 1.4rem;
}

.rank .btn {
  background-color: #cda674;
}
.rule{
  margin: 0.4rem auto;
  background-color: rgba(0, 0, 0, 0.8);
  width: 100%;
  padding: 10px;
  border-radius: 2rem;
  color: #d5cdc4;
  font-size: 1.8rem;
}

</style>