import { configureStore } from "@reduxjs/toolkit";
import userSlice from "./UserSlice";

const makestore=()=>{
    return configureStore({
        reducer:{
            userstate:userSlice.reducer
        }
    })
}
export default makestore