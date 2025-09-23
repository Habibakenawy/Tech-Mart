import {createSlice} from "@reduxjs/toolkit";


const initialState={
    count:20
}

const counterSlice= createSlice({
    name:'counter',
    initialState,
    reducers:{

    }
})


export const counterReducer=counterSlice.reducer