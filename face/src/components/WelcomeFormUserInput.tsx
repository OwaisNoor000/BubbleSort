"use client"

import {
  Combobox,
  Portal,
  useFilter,
  useListCollection,
} from "@chakra-ui/react"
import { useQuery } from "@tanstack/react-query"
import { useEffect, useState } from "react"
import {getUsers} from "../services/UserServices";



type ComponentSize = ""

type WelcomeFormUserInputProps = {
    css:Record<string,string>
    placeholder:string
    size:"sm" | "md" | "lg" | "xs" | undefined
    usernameValue:string
    setUsernameValue: (value:string)=>void
}

type Framework = {
    label:string,
    value:string
}

export default function WelcomeFormUserInput({css,placeholder,size,usernameValue,setUsernameValue}:WelcomeFormUserInputProps) {
    const{status, data, error} = useQuery(
        {
            queryKey:["users"],
            queryFn:getUsers
        }
    )

    const [frameworks,setFrameworks] = useState<Framework[]>([]);

    useEffect(()=>{
        if(data !== undefined && status === "success"){
            console.log(data);
            const records:Framework[] = data.map((user) => ({
            label: user.email,
            value: user.email,
            }));
            setFrameworks(records);
        }
        
    },[status,data])
    


    

  const { contains } = useFilter({ sensitivity: "base" })

  const { collection, filter } = useListCollection({
    initialItems: frameworks,
    filter: contains,
  })

  return (
    <Combobox.Root
      collection={collection}
      onInputValueChange={(e) => filter(e.inputValue)}
      size={size}
    >
      <Combobox.Control>
        <Combobox.Input placeholder={placeholder} css={css} value={usernameValue} onChange={(e)=>setUsernameValue(e.target.value)}/>
        <Combobox.IndicatorGroup>
          <Combobox.ClearTrigger onClick={()=>{setUsernameValue("")}} className="cursor-pointer"/>
          <Combobox.Trigger className="cursor-pointer"/>
        </Combobox.IndicatorGroup>
      </Combobox.Control>
      <Portal>
        <Combobox.Positioner>
          <Combobox.Content>
            <Combobox.Empty>No items found</Combobox.Empty>
            {collection.items.map((item) => (
              <Combobox.Item item={item} key={item.value} onClick={()=>{setUsernameValue(item.value)}}>
                {item.label}
                <Combobox.ItemIndicator />
              </Combobox.Item>
            ))}
          </Combobox.Content>
        </Combobox.Positioner>
      </Portal>
    </Combobox.Root>
  )
}

