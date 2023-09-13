<template>
  <div>
    <div class="logo"></div>
    <div class="content">
      <p>嗨!晚安探員,<br />請先輸入您的探員ID</p>
      
      <div class="custom-input">
        <a-input class="input" placeholder="000" maxlength="3" max="100" min="001" v-model:value="userID" @oninput="onInput"/>
        <span class="one"></span>
        <span class="two"></span>
        <span class="thr"></span>
      </div>
      <a-button class="btn" type="primary" @click="onSubmit">送出</a-button>
    </div>
    <div class="footer">
      <div class="shadow"></div>
    </div>
  </div>
</template>
<script setup>
import { ref, watch } from 'vue'
import { findID,  } from '../api/index'

const userID = ref('')

const onSubmit = () => {
  findID(userID.value)
  //console.log(userID.value)
}
const onInput = () => {
  userID.value= userID.value.replace(/[^0-9.]/g, '').replace(/(\..*?)\..*/g, '$1');
}

watch(userID,(newValue, oldValue) => {
  if(newValue.length > 3){
    userID.value = oldValue.slice(0,3)
  }
})
</script>
<style>
.custom-input {
  position: relative;
  transform: translate(1rem);
  margin: 1rem auto;
  width: 16rem;
}

.custom-input .input {
    margin: 0;
    -webkit-appearance: none;
    font-size: 3.2rem;
    color: #fff;
    border: 0;
    background-color: transparent;
    letter-spacing: 3.2rem;
    width: 20rem;
    transform: translate(0.8rem);
    text-align: left !important;
}
.custom-input .input:focus-visible {
  border: 0;
  outline:none !important;
}
.custom-input .input:focus{
  box-shadow: none !important;
}

.custom-input span {
  content: "";
  width: 4rem;
  height: 100%;
  background: #3c3c43cc;
  border-radius: 4px;
  border: 1px solid #7474802e;
  position: absolute;
  pointer-events: none;
  z-index: -100;
}

.custom-input span.one {
  top: 0;
  left: 0;
}

.custom-input span.two {
  top: 0;
  left: 5.4rem;
}

.custom-input span.thr {
  top: 0;
  left: 10.8rem;
}

.logo {
  width: 100vw;
  background: url('../assets/images/logo-01.png') no-repeat;
  background-position: center left;
  background-size: auto 60%;
  height: 6vh;
  text-align: right;
  line-height: 6vh;
  font-size: 0.8rem;
  padding-right: 8px;
}

.content {
  width: 100vw;
  height: 84vh;
  background: url('../assets/images/suit-whisky.png') no-repeat center;
  background-position: bottom center;
  background-size: auto 105%;
  padding: 18vh 8vw;
  text-align:center;
}

.content p {
  color: #cda674;
  font-size: 1.6rem;
  margin-bottom: 1.6rem;
  text-align: center;
  text-shadow: #000 0.01rem 0.01rem;
}

.content .input {
  border-color: #cda674;
  text-align: center;
}

.content .btn {
  background-color: #cda674;
}

.footer {
  background: url('../assets/images/foot-bg.png') repeat;
  background-size: 36%;
  height: 12vh;
  width: 100vw;
}

.footer .shadow {
  height: 12vh;
  width: 100%;
  box-shadow: #000 inset 0px 15px 25px;
}</style>