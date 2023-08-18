
import { createStore } from 'vuex'
export default createStore({
    state () {
      return {
        count: 0,
        name:localStorage.getItem('name'),
        userID:localStorage.getItem('userID'),
        id:localStorage.getItem('id'),
        scroe: localStorage.getItem('scroe')
      }
    },
    mutations: {
      increment (state) {
        state.count++
      },
    },
    action:{
      setPlayer(state){
        state.userID = localStorage.getItem('userID'),
        state.name = localStorage.getItem('name'),
        state.id = localStorage.getItem('id')
      }
    }
  })

