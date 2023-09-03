<template>
    <div class="box">
    <div class="logo"></div>
    <div class="rank">
  <div class="flex flex-col justify-center" v-if="game == 'rank'">
  <p class="title"> 你目前的得分是  
    {{player.score}}</p>
  </div>
  </div>
  <div class="footer">
      <div class="shadow"></div>
    </div>
</div>
</template>
<script setup>
import { ref,  onMounted,  } from 'vue'
import { player, getPlayerScore } from '../api/index'

const game = ref('rank')


onMounted(() => {
  getPlayerScore(player.userID)
})

</script>
<style>
.rank{
 text-align: center;
 width: 105vw;
 height: 82vh;
 background: url('../assets/images/rank-bg.png') no-repeat center;
 background-position: bottom center;
 background-size: auto 100%;
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