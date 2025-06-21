import { useContext, useEffect, useRef, useState } from "react";
import { useAppStore } from "../contexts/ZustandAppStore";

type MessageBoardProps = {
    children:React.ReactNode,
}

export default function MessageBoard({children}:MessageBoardProps){
        
        const messages = useAppStore((state)=>state.messages);
        const containerBottom = useRef<HTMLDivElement|null>(null);

        useEffect(()=>{
            // Scroll to bottom whenever children change
            containerBottom.current?.scrollIntoView({
                behavior:"smooth"
            });
        },[messages]);


    return(
        
        <div  style={{height:"60vh",overflow:"scroll",marginTop:"100px",scrollbarWidth:"none"}} 
            className="flex flex-col items-center" >
                {/*<Message text="Just testing to see if this works"/>
                <Response text="Responding to the above text" waiting={true} />
                <Message text="Just testing to see if this works"/>
                <Response text="Responding to the above text" />*/}

                {/* {children} */}
                
                {messages}
                <div ref={containerBottom} className=""></div>
                
        </div>

    )
}