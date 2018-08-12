import {createStore, combineReducers} from 'redux';
import uuid from 'uuid';

//ADD_EXPENSE
const addExpense = ({description = '',
                    note = '', 
                    amount = 0,
                    createdAt = 0} = {}) => {
    return {
        type : 'ADD_EXPENSE',
        expense : {
            id : uuid(),
            description,
            note,
            amount,
            createdAt
        }
    }
}

//Remove Expense

const removeExpense = ({id}) => ({
    type : 'REMOVE_EXPENSE',
    id
})

//Edit Expense
const editExpense = (id,updates) => ({
    type: 'EDIT_EXPENSE',
    id,
    updates
})

// set text value

const setTextFilter = (text = '') => ({
    type : 'SET_TEXT_FILTER',
    text
})

// sort by date

const sortByDate = () => ({
    type: 'SORT_BY_DATE'
})

const sortByAmount = () => ({
    type: 'SORT_BY_AMOUNT'
})

const setStartDate = (startDate) => ({
    type : 'SET_START_DATE',
    startDate
})

const setEndDate = (endDate) => ({
    type : 'SET_END_DATE',
    endDate
})

// Expenses Reducer
const expensesReducerDefaultState = []
const expensesReducer = (state = expensesReducerDefaultState,action)=> {
    switch(action.type) {
        case 'ADD_EXPENSE': 
        return [
            ...state,
            action.expense
        ]
        case 'REMOVE_EXPENSE':
        return state.filter(({id}) => {
                return id !== action.id
        })
        case 'EDIT_EXPENSE' :
        return state.map((expense) => {
            if(expense.id === action.id) {
                return {
                    ...expense,...action.updates
                }
            }
            else {
                return expense
            }
        })
        default :
        return state;
    }
}

const filtersReducerDefault = {
    text : '',
    sortBy : 'date',
    startDate : undefined,
    endDate : undefined
}

//Filters Reducer
const filtersReducer = (state = filtersReducerDefault,action) => {
    switch(action.type) {
        case 'SET_TEXT_FILTER' :
        return {...state, text:action.text}
        case 'SORT_BY_AMOUNT' :
        return {
            ...state,sortBy : 'amount'
        }
        case 'SORT_BY_DATE' :
        return {
            ...state,sortBy : 'date'
        }
        case 'SET_START_DATE':
        return {
            ...state, startDate : action.startDate
        }
        case 'SET_END_DATE':
        return {
            ...state, endDate : action.endDate
        }
        default: return state
    }
}

// Store
const store = createStore(combineReducers({
    expenses : expensesReducer,
    filters : filtersReducer
}));


const demoState = {
    expenses : [{
        id:'asdasdad',
        note:'This is the rent',
        amount: 50,
        description:'Jan Rent',
        createdAt:0
    }],
    filters : {
        text: 'rent',
        sortBy : 'amount', //or date
        startDate: undefined,
        endDate: undefined
    }
}

// get visible expenses
const getVisibleExpenses = (expenses,{text,sortBy,endDate,startDate}) => {
    // console.log(text)
    return expenses.filter((expense) => {
        const startDateMatch = typeof startDate !== 'number' || expense.createdAt >= startDate; 
        const endDateMatch = typeof endDate !== 'number' || expense.createdAt <= endDate;
        const textMatch = expense.description.toLowerCase().includes(text.toLowerCase());
        // const textMatch = true

        return startDateMatch && endDateMatch && textMatch;
    }).sort((a,b) => {
        if(sortBy === 'date') {
            return a.createdAt < b.createdAt ? 1 : -1
        }
        else if(sortBy === 'amount') {
            return a.amount < b.amount ? 1 : -1
        }
    })
}

store.subscribe(() => {
    const state = store.getState();
    const visibleExpenses = getVisibleExpenses(state.expenses, state.filters)
    console.log(visibleExpenses)
})

const expenseOne = store.dispatch(addExpense({description : 'Rent',amount : 100,createdAt : 100}))
store.dispatch(addExpense({description : 'Coffee',amount : 300,createdAt : 500}))

// store.dispatch(removeExpense({ id : expenseOne.expense.id}))

// store.dispatch(editExpense(expenseOne.expense.id,{description:'tmobileBill'}))

// store.dispatch(editExpense(expenseOne.expense.id,{description:'internet bill'}))


store.dispatch(setTextFilter('e'))

// store.dispatch(sortByDate())

// store.dispatch(sortByAmount())

// store.dispatch(setStartDate(550))
// // store.dispatch(setStartDate())

// store.dispatch(setEndDate(600))