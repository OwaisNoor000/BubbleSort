import { LuMessageSquare } from "react-icons/lu";
import {create} from "zustand";

type AppStore = {
    llmStatus:string,
    messages:React.ReactNode[]
    appendMessage:(element:React.ReactNode)=>void,
    replaceLastMessage:(element:React.ReactNode)=>void
}

export const useAppStore = create<AppStore>((set)=>({
    llmStatus:"normal",
    messages:[],
    appendMessage:(element:React.ReactNode)=>{
       set((state)=>({
        llmStatus:state.llmStatus,
        messages:[...state.messages,element]
       })) 
    },
    replaceLastMessage:(element:React.ReactNode)=>{
        set((state)=>({
            llmStatus:state.llmStatus,
            messages:[...state.messages.slice(0,-1),element]
        }));
    }
}));