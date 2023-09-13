<template>
  <div>
    <div class="logo"></div>
    <div class="content">
    <p>幫自己設定一個暱稱吧!</p>
    
    <a-input class="input" v-model:value="name" maxlength="10" />
    <br/>
    <br/>
    <a-button class="btn" type="primary" @click="sentName()">送出</a-button>

    </div>
    <div class="footer">
      <div class="shadow"></div>
    </div>
  </div>
</template>
<script setup>
import { ref,onMounted } from 'vue'
import { setupName, step, player,getPlayerNameList } from '../api/index'
const name = ref('')
onMounted(() => {
  getPlayerNameList()
  console.log(player)
})

function sentName() {
  setupName(name.value,player.userID)
}

</script>
