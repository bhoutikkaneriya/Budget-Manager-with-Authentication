import { createStore } from 'redux';

const defaultState = {
  count:0
}

const incrementCount = ({incrementBy = 5} = {}) => {
  return {
    type: 'increment',
    incrementBy
  }
}

const decrementCount = ({decrementBy = 10} = {}) => ({
  type: 'decrement',
  decrementBy
})

const resetCount = () => ({
  type: 'reset'
})

const setCount = ({count}) => ({
  type: 'set',
  count
})

const countReducer = ((state = defaultState,action) => {
  switch(action.type) {
    case 'increment':
         return {
           count : state.count + action.incrementBy
         }
     case 'decrement':
     return {
       count : state.count - action.decrementBy
     }
     case 'reset' :
     return {
       count: 0
     }
     case 'set' : 
     return {
       count : action.count
     }
         default:
         return state;
  }
})

const store = createStore(countReducer);

const unsubscribe = store.subscribe(() => {
  console.log(store.getState())
})

store.dispatch(incrementCount());
store.dispatch(incrementCount({incrementBy : 20}))

store.dispatch(decrementCount());
store.dispatch(decrementCount({decrementBy : 20}))

store.dispatch(resetCount())

store.dispatch(setCount({count : 301}))

// store.dispatch({
//   type:'increment',
//   incrementBy : 5
// })
// store.dispatch({
//   type:'increment'
// })
// store.dispatch({
//   type:'increment',
//   incrementBy : 3
// })
// store.dispatch({
//   type:'reset'
// })

// store.dispatch({
//   type: 'set',
//   count : 101
// })


