<template>
    <router-view></router-view>
</template>
<script setup>
import { socket } from "@/socket"
import { ref, computed, onMounted } from 'vue'
const connected = computed(()=>{{
    return socket.connected
}})
onMounted(() => {
    if(connected) {
        console.log("Connected")
    }else{
        socket.connect();
    }
})
</script>