<template>
  <div>
    <div class="logo"></div>
    <div class="content">
    <p>幫自己設定一個暱稱吧!</p>
    <a-form
      :model="formState"
      name="basic"
      :label-col="{ span: 8 }"
      :wrapper-col="{ span: 16 }"
      autocomplete="off"
      @finish="onFinish"
      @finishFailed="onFinishFailed"
    >
      <a-form-item
        name="name"
        :rules="[{ required: true, message: '輸入您的暱稱!' }]"
        placeholder="輸入您的暱稱"
      >
        <a-input class="input" v-model:value="formState.name" maxlength="4" />
      </a-form-item>

      <a-form-item :wrapper-col="{ offset: 8, span: 16 }">
        <a-button class="btn" type="primary" html-type="submit">送出</a-button>
      </a-form-item>
    </a-form>
    </div>
    <div class="footer">
      <div class="shadow"></div>
    </div>
  </div>
</template>
<script setup>
import { reactive } from 'vue'
import { setupName, step, player } from '../api/index'
const formState = reactive({
  name: ''
})

const onFinish = () => {
  let playerID = player.userID
  console.log("playerID:", playerID)
    let isNew = (playerID == "") ? true : false
    if(isNew){
        step.value = 'Start'
    }else{
        setupName(formState.name,player.id)
    }
}
const onFinishFailed = (errorInfo) => {
  console.log('Failed:', errorInfo)
}
</script>
