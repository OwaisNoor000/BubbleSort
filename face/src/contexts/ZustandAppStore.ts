import {create} from "zustand";

type LLMStatus = "normal" | "generating"

type AppStore = {
    llmStatus:LLMStatus,
    messages:React.ReactNode[]
    appendMessage:(element:React.ReactNode)=>void,
    replaceLastMessage:(element:React.ReactNode)=>void
    toggleLlmStatus:()=>void;
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
    },
    toggleLlmStatus:()=>{
        set((state)=>({messages:state.messages,llmStatus:state.llmStatus=="normal"?"generating":"normal"}));
    }
}));