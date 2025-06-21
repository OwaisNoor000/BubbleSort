import { useContext } from "react";
import ProfilePicture from "../assets/pp.jpg";
import { AppContext } from "../contexts/MessagesProvider";
import ReactMarkdown from 'react-markdown';
import Markdown from "react-markdown";
import LegoBlocks from "./LegoBlocks";


 function Loading(){
    return(
        <div className="flex space-x-2 ml-2 mt-1">
            <div className="h-2 w-2 bg-gray-300 rounded-full animate-bounce [animation-delay:0ms]" />
            <div className="h-2 w-2 bg-gray-300 rounded-full animate-bounce [animation-delay:150ms]" />
            <div className="h-2 w-2 bg-gray-300 rounded-full animate-bounce [animation-delay:300ms]" />
        </div>
    );
}

type ResponseProps = {
    text:string[];
    reverse:string[];
    waiting?:boolean;
    steps:number[][];
}

export default function Response({text,waiting,steps,reverse}:ResponseProps){


    return (
        <div className="w-1/2">
            <div className="w-full text-white flex flex-col items-start my-5">
                    <img src={ProfilePicture} className="rounded-full mr-5 mb-6" style={{height:"30px", width:"30px"}}/>
                        {/*!waiting && <Markdown>{text}</Markdown>*/}
                        {!waiting && <LegoBlocks letters={text} steps={steps} reverse={reverse}/>}
                        {waiting && <Loading/>}
            </div> 
        </div>
    )
}