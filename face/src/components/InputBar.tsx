import { IoIosAttach } from "react-icons/io";
import { FaArrowUp } from "react-icons/fa";
import { use, useContext, useEffect, useRef, useState} from "react";
import {useAppStore} from "../contexts/ZustandAppStore";
import { io } from 'socket.io-client';
import Message from "./Message";
import Response from "./Response";




type Props = {
    disableBtn:boolean;
}

export default function({disableBtn}:Props) {

    const [inputText, setInputText] = useState("");
    const [response,setResponse] = useState([]);
    const [steps,setSteps] = useState([]);
    
    // Zustand context state variables
    const messages = useAppStore((state)=>(state.messages));
    const llmStatus = useAppStore((state)=>(state.llmStatus));
    const addNewMessage = useAppStore((state)=>(state.appendMessage));
    const replaceLastMessage = useAppStore((state)=>(state.replaceLastMessage));
    const toggleAppStatus = useAppStore((state)=>(state.toggleLlmStatus));


    const sendMessage = ()=>{

        // This part of the code updates the frontend
        const newMessage:React.ReactNode = <Message text={inputText}/>;
        const newResponse:React.ReactNode = <Response text={[""]} steps={[]} waiting={true} reverse={[]}/>;
        toggleAppStatus()
        addNewMessage(newMessage);
        addNewMessage(newResponse);

        
        setInputText("");

        // This part of the code gets data from the backend
        fetch(`http://localhost:8000/sort_verbose`,{
            method:"POST",
            headers:{"Content-Type":"application/json"},
            body:JSON.stringify({"data":inputText})
        })
            .then(res=>res.json())
            .then((result)=>{
               setResponse(result["word"]);
               setSteps(result["steps"]);
                const newResponse:React.ReactNode = <Response text={inputText.split("")} reverse={result["word"]} steps={result["steps"]}/>
                
                toggleAppStatus(); // Set state back to normal
                replaceLastMessage(newResponse);
            });
    }


    return(
        <div className="w-full flex flex-row justify-center fixed bottom-0">
            <div className="bg-[#2E2E2E] m-10  w-1/2 rounded-3xl flex flex-row items-center justify-between">
                <input onChange={(e) => setInputText(e.target.value)} value={inputText}
                onKeyDown={(e)=>{if(e.key==="Enter" && llmStatus=="normal"){sendMessage()}}}
                className="placeholder-gray-300 py-4 px-6 outline-none focus:outline-none text-white w-full" type="text" placeholder="Type in a Word to sort"/>
                <div className="w-full flex flex-row justify-end h-fit relative mr-4">
                        <button
                            onClick={sendMessage}
                            disabled={llmStatus === "generating"}
                            className={` bg-[#F5145F] p-2 rounded-full mr-10s  ${llmStatus === "generating" ? "opacity-50" : ""}`}
                            >
                            <FaArrowUp className="text-white" />
                            </button>
                </div>
            </div>
        </div>
    )
}