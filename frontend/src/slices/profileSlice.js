import { createSlice } from "@reduxjs/toolkit";

const initialValue={
     user: localStorage.getItem("user") ? JSON.parse(localStorage.getItem("user")) : null,
    loading: false,
}


const profileSlice=createSlice({
    name:"profile",
    initialState:initialValue,
    reducers:{
        setUser:(state,action)=>{
            state.user=action.payload;
        },
        setLoading:(state,action)=>{
            state.loading=action.payload;
        }
    }
})


export const {setUser,setLoading} =profileSlice.actions;
export default profileSlice.reducer;