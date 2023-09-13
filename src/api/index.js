import axios from 'axios'
import { ref ,reactive} from 'vue'
import { message } from 'ant-design-vue'

//depoly 
const api_path = 'https://whisky-code-server.onrender.com/api/'
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
export const competitorName = ref('')
export const competitorResult = ref('')
export const loading = ref(false)
export const playerListNAME = ref([])
export const playerListID = ref([])
export const matchList = ref([])
export const rankList =ref([])
export const matchRecord = ref(null)
export const pkData = ref(null)
export const player = reactive({
    name: '',
    userID: '',
    id: 0,
    score: 0,
    cost: 0,
    money: 0
  })
export const allPlayer = ref(null)  

export function findID(userID){
    $http.get(`/getOne/${userID}`).then((res)=>{
        player.name = res.data.name
        player.userID = res.data.userID
        player.id = res.data._id
        player.score = res.data.score
        step.value = res.data.step
    }).catch((err)=>{
        console.error(err)
    })
}
export function getNameByID(userID){
    $http.get(`/getOne/${userID}`).then((res)=>{
        return res.data.name
    })
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
    
    // let taken = playerListNAME.value.includes(name)
    // if(taken) {
    //     message.error('這個名字已經有人用了，再想想吧！')
    // }else
    // {
        $http.put(`/update/${id}`,{
            name: name,
            step: 'Question1_1',
            score: 0
        }).then((res)=>{
            player.name = res.data.name
            player.userID = res.data.userID
            player.id = res.data.id
        })
        step.value = 'Question1_1'
        localStorage.setItem('userID', res.data.userID)
        localStorage.setItem('name', res.data.name)
}

export function getPlayerNameList(){
    $http.get('/getAll').then((res)=>{
        playerListNAME.value = Object.values(res.data).map(item => item.name)
        console.log(playerListNAME)
    }).catch((err)=>{
        console.error(err)
    })
}
export function getPlayerIDList(){
    $http.get('/getAll').then((res)=>{
        playerListID.value = Object.values(res.data).map(item => item.userID)
        console.log(playerListID)
    }).catch((err)=>{
        console.error(err)
    })
}

export function getAllPlayer(){
    $http.get('/getAll').then((res)=>{
        allPlayer.value = Object.values(res.data)
    }).catch((err)=>{
        console.error(err)
    })
}
export function createMatchList(data){

    $http.post('/createMatchList',{
        matchID: data.matchID,
        teamA: data.teamA,
        teamB: data.teamB,
    }
    ).then((res)=>{
        createPK(res.data.teamA,res.data.matchID,'teamA',res.data.teamB)
        createPK(res.data.teamB,res.data.matchID,'teamB',res.data.teamA)
    }).catch((err)=>{
        console.error(err)
    })
}
export function getMatchList(){
    $http.get('/getMatchList').then((res)=>{
        matchList.value = res.data
    }).catch((err)=>{
        console.error(err)
    })
}

export function createPK(userID,matchID,team,pk){
    loading.value = true
    $http.post('/pk',{
        userID: userID,
        matchID: matchID,
        team: team,
        pk:pk,
        result:''
    }).catch((err)=>{
        console.error(err)
    })
    loading.value = false
}

export function updateResult(data){
    $http.put(`/updateResult/${data.userID}`,{
        result: data.result
    }).catch((err)=>{
        console.error(err)
    })
    console.log("updateResult:",data)
}
export function getPK(userID){
    $http.get(`/getPK/${userID}`).then((res)=>{
        pkData.value = res.data
        getCompetitorName(res.data.pk)
    }).catch((err)=>{
        console.error(err)
    })
}

export function getMatchRecord(matchID){
    $http.get(`/matchResult/${matchID}`).then((res)=>{
        matchRecord.value = res.data
    }).catch((err)=>{
        console.error(err)
    })
}

export function getRecordByMatchID(){
    $http.get('/getMatchList').then((res)=>{
        matchList.value = res.data
    }).catch((err)=>{
        console.error(err)
    })
}
export function getCompetitorName(userID){
    $http.get(`/getOne/${userID}`).then((res)=>{
        competitorName.value = res.data.name
    })
}

export function getCompetitorResult(userID){
    $http.get(`/getPK/${userID}`).then((res)=>{
        console.log(res.data.result)
        competitorResult.value = res.data.result
    })
}

export function getPlayerScore(userID){
    $http.get(`/getOne/${userID}`).then((res)=>{
        localStorage.setItem('score', res.data.score)
        player.score = res.data.score
    })
}

export function getPlayerMoneyCost(userID){
    $http.get(`/getOne/${userID}`).then((res)=>{
        localStorage.setItem('score', res.data.score)
        localStorage.setItem('cost', res.data.cost)
        localStorage.setItem('money', res.data.money)
        player.score = res.data.score
        player.cost = res.data.cost
        player.money = res.data.money
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

export function setupMoneyCost(player, cost, money){
    $http.put(`/update/${player.userID}`,{
        name: player.name,
        userID: player.userID,
        step: player.step,
        score: player.score,
        cost: cost,
        money: money   
    })
    localStorage.setItem('cost', cost)
    localStorage.setItem('money', money)
    player.cost = cost
    player.money = money
}


export function setStep(step,player){
    $http.put(`/update/${player.userID}`,{
        name: player.name,
        userID: player.userID,
        step: step,
        score: localStorage.getItem('score')
    })
    localStorage.setItem('step', step)
}
 

export function getRank(){
    $http.get('/getRank').then((res)=>{
        rankList.value = res.data
    }).catch((err)=>{
        console.error(err)
    })
}



export function createWine(userID,data){
    loading.value = true
    $http.post('/createWine',{
        userID: userID,
        wine1_1: data.wine1_1,
        wine2_1: data.wine2_1,
        wine3_1: data.wine3_1,
    }).then((res)=>{
        console.log(res)
    })
    loading.value = false
}

export function getWine(userID){
    $http.get(`/wine/${userID}`).then((res)=>{
        if(res.data){
            localStorage.setItem('wine1_1', res.data.wine1_1)
            localStorage.setItem('wine1_2', res.data.wine1_2)
            localStorage.setItem('wine1_3', res.data.wine1_3)
            localStorage.setItem('wine2_1', res.data.wine2_1)
            localStorage.setItem('wine2_2', res.data.wine2_2)
            localStorage.setItem('wine2_3', res.data.wine2_3)
            localStorage.setItem('wine3_1', res.data.wine3_1)
            localStorage.setItem('wine3_2', res.data.wine3_2)
            localStorage.setItem('wine3_3', res.data.wine3_3)
        }
    }).then((res)=>{
       // console.log(res)
    })
}


export function setWineNumber(player,data){
    $http.put(`/newBuyWine/${player.userID}`,data).then((res)=>{
        if(!res.data){
            createWine(player.userID,data)
        }
    })
}

export function deleteMatchData(userID){
    $http.delete(`/deleteMatchData`).then((res)=>{
       console.log(res)
    })
}