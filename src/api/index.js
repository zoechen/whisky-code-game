import axios from 'axios'
import { ref ,reactive} from 'vue'


const api_path = "http://localhost:8888"

export const step = ref('')
export const playerList = ref([])
export const player = reactive({
    name: '',
    userID: '',
    id: 0,
    scroe: 0
  })

export function findID(userID){
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
}

export function signUpID(userID){
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
}

export function setupName(name,id){
    
    axios.put(`${api_path+'/player/'+id}`,{
        name: name,
        userID: player.userID,
        step: 'Question01'
    }).then((res)=>{
        player.name = res.data.name
        player.userID = res.data.userID
        player.id = res.data.id
        localStorage.setItem('userID', res.data.userID)
        localStorage.setItem('name', res.data.name)
        localStorage.setItem('id', res.data.id)
        step.value = 'Question01'
    })
}

export function getPlayerList(){
    axios.get(`${api_path+'/player/'}`).then((res)=>{
        playerList.value = Object.values(res.data).map(item => item.name)
    })
}

export function getPlayerscroe(userID){
    axios.get(`${api_path+'/scroe/'+userID}`).then((res)=>{
        localStorage.setItem('scroe', res.data.record)
        player.scroe = res.data.record
    })
}

export function createScroe(scroe,userID){
    axios.post(`${api_path+'/scroe/'}`,{
        id: userID,
        record: scroe,
    })
    localStorage.setItem('scroe', scroe)
    player.scroe = scroe
}

export function setupscroe(scroe,userID){
    axios.put(`${api_path+'/scroe/'+userID}`,{
        record: scroe,
    })
    localStorage.setItem('scroe', scroe)
    player.scroe = scroe
}


export function setStep(step,id){
    axios.put(`${api_path+'/player/'+id}`,{
        step: step,
        name: player.name,
        userID: player.userID,
    })
    localStorage.setItem('step', step)
}
 

export function rankscroe(){
    let data 
    axios.get(`${api_path+'/scroe/'}`).then((res)=>{
        data = res.data
    })
    return data
}