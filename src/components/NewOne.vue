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
        <a-input class="input" v-model:value="formState.name" maxlength="10" />
      </a-form-item>

      <a-form-item :wrapper-col="{ offset: 8, span: 16 }">
      </a-form-item>
    </a-form>
    <a-button class="btn" type="primary" @click="onSubmit">送出</a-button>

    </div>
    <div class="footer">
      <div class="shadow"></div>
    </div>
  </div>
</template>
<script setup>
import { reactive } from 'vue'
import { setupName, step, player } from '../api/index'
const name = ref('')

const onSubmit = () => {
  setupName(name.value,player.userID)
}
const onFinishFailed = (errorInfo) => {
  console.log('Failed:', errorInfo)
}
</script>
