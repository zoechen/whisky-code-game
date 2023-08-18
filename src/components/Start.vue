<template>
  <div>
    <p>嗨!晚安探員,請先輸入您的探員ID</p>
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
        name="userID"
        :rules="[{ required: true, message: '輸入手機號碼!' }]"
        placeholder="輸入 ID 號碼"
      >
        <a-input v-model:value="formState.userID" />
      </a-form-item>

      <a-form-item :wrapper-col="{ offset: 8, span: 16 }">
        <a-button type="primary" html-type="submit">Submit</a-button>
      </a-form-item>
    </a-form>
  </div>
</template>
<script setup>
import { reactive } from 'vue'
import { findID } from '../api/index'

const formState = reactive({
  userID: ''
})
const onFinish = () => {
    findID(formState.userID)
}
const onFinishFailed = (errorInfo) => {
  console.log('Failed:', errorInfo)
}
</script>
