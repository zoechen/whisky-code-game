import axios from 'axios'
import { ref ,reactive} from 'vue'
import { message } from 'ant-design-vue'


const api_path = 'https://mongodb-whisky-code.onrender.com/api/' //depoly
//const api_path = 'http://localhost:3000/api/'    //localhost


const $http = axios.create(
    {
        baseURL: api_path,
        headers: {
            'Content-Type': 'application/json',
            //'Access-Control-Request-Headers': '*',
            'Access-Control-Allow-Origin': '*',
            //'api-key': 'JS4QSxjXUgQYgixzo3iFnHgkneYmlzz6aYb1OMO1FPQlsBVJ5yzzwvuiMkXhTM5p'
          },
      }
)

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
    $http.get(`/getOne/${userID}`).then((res)=>{
        if(res.data){
            localStorage.setItem('userID', res.data.userID)
            localStorage.setItem('name', res.data.name)
            localStorage.setItem('id', res.data._id)
            localStorage.setItem('step', res.data.step)
            localStorage.setItem('score', res.data.score)
            player.name = res.data.name
            player.userID = res.data.userID
            player.id = res.data._id
            player.score = res.data.score
            step.value = res.data.step
        }else{
            signUpID(userID)
        } 
    })
    loading.value = false
}

export function signUpID(userID){
    loading.value = true
    $http.post('/new',{
        name: "0",
        userID: userID,
        step: 'NewOne',
        score: '0'
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
        $http.put(`/update/${player.userID}`,{
            name: name,
            userID: player.userID,
            step: 'Question1_1',
            score: '0'
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
    $http.get('/getAll').then((res)=>{
        let teamA = []
        let teamB = []
        let templist = []
        for (let i = 0; i < res.data.length; i++){
           if(i%2){
            teamA.push(res.data[i]) 
           }else{
            teamB.push(res.data[i]) 
           }
        }
        for (let i = 0; i < teamA.length; i++){
            let matchData = {
                match_id: i,
                teamA: teamA[i],
                teamB: teamB[i]
            }
            templist.push(matchData)
        }
        playerList.value = templist

        console.log("playerList:",playerList.value)

    })
}

export function getPlayerScore(userID){
    $http.get(`/getOne/${userID}`).then((res)=>{
        localStorage.setItem('score', res.data.score)
        player.score = res.data.score
    })
}

export function setupScore(score,player){
    $http.put(`/update/${player.userID}`,{
        name: player.name,
        userID: player.userID,
        step: player.step,
        score: score   
    })
    localStorage.setItem('score', score)
    player.score = score
}


export function setStep(step,player){
    $http.put(`/update/${player.userID}`,{
        name: player.name,
        userID: player.userID,
        step: step,
        score: player.score 
    })
    localStorage.setItem('step', step)
}
 

export function rankScore(){
    let data 
    $http.get(`${api_path+'/score/'}`).then((res)=>{
        data = res.data
    })
    return data
}

export function pk(match,result){
    loading.value = true
    $http.post('/pk',{
        match: match,
        result: result
    }).then((res)=>{
        console.log(res)
    })
    console.log("game finished")
    loading.value = false
}