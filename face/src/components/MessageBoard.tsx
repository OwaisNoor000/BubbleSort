import { useContext, useEffect, useRef, useState } from "react";
import Message from "./Message";
import Response from "./Response";
import { AppContext } from "../contexts/MessagesProvider";

type MessageBoardProps = {
    children:React.ReactNode,
}

export default function MessageBoard({children}:MessageBoardProps){
        const {appData,setAppData} = useContext(AppContext);
        const [inputText, setInputText] = useState("");
        const containerBottom = useRef<HTMLDivElement|null>(null);
        


        useEffect(()=>{
            // Scroll to bottom whenever children change
            containerBottom.current?.scrollIntoView({
                behavior:"smooth"
            });
        },[appData]);


    return(
        
        <div  style={{height:"60vh",overflow:"scroll",marginTop:"100px",scrollbarWidth:"none"}} 
            className="flex flex-col items-center" >
                {/*<Message text="Just testing to see if this works"/>
                <Response text="Responding to the above text" waiting={true} />
                <Message text="Just testing to see if this works"/>
                <Response text="Responding to the above text" />*/}

                {/* {children} */}
                
                {appData.messages}
                <div ref={containerBottom} className=""></div>
                
        </div>

    )
}