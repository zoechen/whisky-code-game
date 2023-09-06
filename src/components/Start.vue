<template>
  <div>
      <div class="logo"></div>
      <div class="content">
        <p>嗨!晚安探員,<br/>請先輸入您的探員ID</p>
        <a-form
          :model="formState"
          name="basic"
          :label-col="{ span: 16 }"
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
            
            <a-input class="input" v-model:value="formState.userID" size="large"/>
          </a-form-item>

          <a-form-item style="text-align: center;">
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
<style>

.logo{
  width: 100vw;
  background: url('../assets/images/logo-01.png') no-repeat;
  background-position: center left;
  background-size: auto 60%;
  height: 6vh;
}

.content{
  width: 100vw;
  height: 84vh;
  background: url('../assets/images/suit-whisky.png') no-repeat center;
  background-position: bottom center;
  background-size: auto 105%;
  padding: 18vh 8vw;
}
.content p{
  color: #cda674;
  font-size: 1.6rem;
  margin-bottom: 1.6rem;
  text-align: center;
  text-shadow: #000 0.01rem 0.01rem;
}
.content .input {
  border-color: #cda674;
}
.content .btn{
  background-color: #cda674;
}
.footer{
  background: url('../assets/images/foot-bg.png') repeat;
  background-size: 36%;
  height: 12vh;
  width: 100vw;
}
.footer .shadow{
  height: 12vh;
  width: 100%;
  box-shadow:#000 inset 0px 15px 25px;
}
</style>