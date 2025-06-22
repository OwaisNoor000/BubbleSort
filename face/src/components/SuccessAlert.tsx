import { Alert, CloseButton } from "@chakra-ui/react"
import { useState, } from "react";

export type displayType = "none"|"flex";

type SuccessAlertProps = {
    text:string
    display:displayType
    setDisplay:React.Dispatch<React.SetStateAction<displayType>>
}


export default function SuccessAlert({text,display,setDisplay}:SuccessAlertProps){

  return (
    <Alert.Root css={{"position":"absolute","top":"10px",'width':"500px","display":`${display}`}}>
      <Alert.Indicator />
      <Alert.Content>
        <Alert.Title>Success!</Alert.Title>
        <Alert.Description>
            {text}
        </Alert.Description>
      </Alert.Content>
      <CloseButton pos="relative" top="-2" insetEnd="-2" onClick={()=>{setDisplay("none")}}/>
    </Alert.Root>
  )
}
