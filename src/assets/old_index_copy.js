import axios from 'axios'
import { ref ,reactive} from 'vue'
import { message } from 'ant-design-vue'


const api_path = "https://whisky-code-server.onrender.com" //"http://localhost:8888"

export const step = ref('')
export const loading = ref(false)
export const playerList = ref([])
export const player = reactive({
    name: '',
    userID: '',
    id: 0,
    score: 0
  })

export function findID(userID){
    getPlayerList()
    loading.value = true
    axios.get(`${api_path+'/player?userID='+userID}`).then((res)=>{
        if(res.data[0]){
            localStorage.setItem('userID', res.data[0].userID)
            localStorage.setItem('name', res.data[0].name)
            localStorage.setItem('id', res.data[0].id)
            localStorage.setItem('step', res.data[0].step)
            player.name = res.data[0].name
            player.userID = res.data[0].userID
            player.id = res.data[0].id
            step.value = res.data[0].step
        }else{
            signUpID(userID)
        } 
    })
    loading.value = false
}

export function signUpID(userID){
    loading.value = true
    axios.post(`${api_path+'/player'}`,{
        name: "",
        userID: userID,
        step: 'NewOne'
    }).then((res)=>{
        player.name = res.data.name
        player.userID = res.data.userID
        player.id = res.data.id
        localStorage.setItem('userID', res.data.userID)
        localStorage.setItem('name', res.data.name)
        localStorage.setItem('id', res.data.id)
        step.value = 'NewOne'
    })
    
    loading.value = false
}

export function setupName(name,id){
    loading.value = true
    let taken = playerList.value.includes(name)
    if(taken) {
        message.error('這個名字已經有人用了，再想想吧！')
    }else{
        axios.put(`${api_path+'/player/'+id}`,{
            name: name,
            userID: player.userID,
            step: 'Question1_1'
        }).then((res)=>{
            player.name = res.data.name
            player.userID = res.data.userID
            player.id = res.data.id
            localStorage.setItem('userID', res.data.userID)
            localStorage.setItem('name', res.data.name)
            localStorage.setItem('id', res.data.id)
        })
        step.value = 'Question1_1'
    }

    loading.value = false
}

export function getPlayerList(){
    axios.get(`${api_path+'/player/'}`).then((res)=>{
        playerList.value = Object.values(res.data).map(item => item.name)
        console.log(playerList.value)
    })
}

export function getPlayerScore(userID){
    axios.get(`${api_path+'/score/'+userID}`).then((res)=>{
        localStorage.setItem('score', res.data.record)
        player.score = res.data.record
    })
}

export function setupScore(score,userID){
    axios.post(`${api_path+'/score/'}`,{
        id: userID,
        record: score,
    })
    localStorage.setItem('score', score)
    player.score = score
}

export function setupScore(score,userID){
    axios.put(`${api_path+'/score/'+userID}`,{
        record: score,
    })
    localStorage.setItem('score', score)
    player.score = score
}


export function setStep(step,id){
    axios.put(`${api_path+'/player/'+id}`,{
        step: step,
        name: player.name,
        userID: player.userID,
    })
    localStorage.setItem('step', step)
}
 

export function rankscore(){
    let data 
    axios.get(`${api_path+'/score/'}`).then((res)=>{
        data = res.data
    })
    return data
}