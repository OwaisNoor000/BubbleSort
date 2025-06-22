import { MdAdsClick } from "react-icons/md"
import { PasswordInput } from "./ui/password-input";
import {  useState } from "react";
import WelcomeFormUserInput from "./WelcomeFormUserInput";
import { useQuery } from "@tanstack/react-query";
import {createUser, getUsers} from "../services/UserServices";
import { Button, Input, Popover, Portal, Text } from "@chakra-ui/react"
import { Error } from "../enums/Error";
import {useMutation,useQueryClient} from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";



type FormType = "register"|"login"

const toggleFormType = (ftype:FormType)=>{
    return ftype === "login" ? "register" : "login";
}

type WelcomeFormProps = {
   formType:FormType 
}


export default function WelcomeForm({formType}:WelcomeFormProps){
    const [ftype,setFtype] = useState(formType);
    const [username,setUsername] = useState("");
    const [password,setPassword] = useState("");
    const [formError,setFormError] = useState<Error[]>([]);
    const [errorVisibility,setErrorVisibility] = useState(false);
    const navigate = useNavigate();
    

    const{status, data, error} = useQuery(
        {
            queryKey:["users"],
            queryFn:getUsers
        }
      )

    const mutation = useMutation({
      mutationFn:createUser,
      onSuccess:()=>{
        navigate("/chat");
      }
    });


    const switchFormType = ()=>{
        setFtype(toggleFormType(ftype));
    }

    const populateErrors = (additionalErrors?:Error[]) => {
      const errors: Error[] = [];

      if (username.trim().replace(/\s+/g, " ") === "") {
        errors.push(Error.no_username);
      }
      if (password.trim().replace(/\s+/g, " ") === "") {
        errors.push(Error.no_password);
      }

      if(data===undefined){
        errors.push(Error.no_users_available);
      }

      if (
        data !== undefined &&
        data.some(user => user.email === username) &&
        ftype === "register"
      ) {
        errors.push(Error.username_exists);
      }

      if (additionalErrors !== undefined){
        for(const error of additionalErrors){
          errors.push(error);
        }
      }
      


      setFormError(errors);
      return errors; // optional, for immediate logic
    };

    const register = ()=>{
      console.log("Register() is working"); 
      const errors = populateErrors();

      if(errors.length > 0){
        setErrorVisibility(true);
        return;
      }else{
        setErrorVisibility(false);
      }
      
      // Create new user
      mutation.mutate({
        "email":username,
        "password":password  
      });

    }

    const login = ()=>{
      const errors = populateErrors();

      if(errors.length > 0){
        setErrorVisibility(true);
          return;
        }else{
          setErrorVisibility(false);
        }
      
      if(data!== undefined){
        for(const user of data){
          console.log("user");
          console.log(user);
          if(user.email===username.trim().replace(/\s+/g, " ")){
            if(user.password === password){
              navigate("/chat");
              return
            }else{
              const errors = populateErrors([Error.wrong_password]);
              if(errors.length > 0){
                setErrorVisibility(true);
                }else{
                  setErrorVisibility(false);
                }
            }
        }
      
    
      const errors = populateErrors([Error.user_nonexistent]);
      if(errors.length > 0){
        setErrorVisibility(true);
        }else{
          setErrorVisibility(false);
          }
        }
      }
    }


    return (
        <div className="h-[500px] w-[500px] flex flex-col items-center">
            <div className="" style={{fontWeight:"bold",fontSize:"30px"}}>
                {ftype.charAt(0).toUpperCase() + ftype.slice(1) + " "} 
                to your account</div>
            <div style={{margin:"5px 0 20px 0"}}>Enter your email and password below to sign in</div>
            <div className="" style={{margin:"10px 0px 10px 0px"}}>
                <WelcomeFormUserInput css={{ "--focus-color": "#F5145F","--focus-width":"20px","border":"2px solid pink ","border-radius":"10px" 
                    ,"width":"400px"
                }} placeholder="Username" size="lg" usernameValue={username} setUsernameValue={setUsername}/>
            </div>
            <div className="" style={{margin:"10px 0px 10px 0px"}}>
                <PasswordInput placeholder="Password"
                css={{ "--focus-color": "#F5145F","--focus-width":"20px","border":"2px solid pink ","border-radius":"10px" 
                    ,"width":"400px"
                }} 
                size="xl" value={password} onChange={(e)=>{setPassword(e.target.value)}}/>
            </div>
            <div className="flex flex-row items-center w-[400px]">
                <span style={{margin:"0 10px 0 0"}}>
                    {ftype=="login"? "First time user?": "Already registered?"}
                </span>
                <span style={{fontWeight:"bold",color:"#F5145F"}} className="cursor-pointer hover:scale-110"
                onClick={switchFormType}>
                    {ftype=="login"? "Sign up": "Sign in"}
                </span>
            </div>
              
              
              <Popover.Root open={errorVisibility} closeOnInteractOutside={true} onOpenChange={(e) => setErrorVisibility(e.open)}>
                <Popover.Trigger asChild>
                  <Button loading={false} css={{"backgroundColor":"#F5145F","marginTop":"15px","width":"400px"}}
                    className="hover:scale-105" onClick={ftype=="register"?register:login}>
                        <MdAdsClick /> Click me to   
                            {ftype=="register"? " Sign up": " Sign in"}
                  </Button>  
                </Popover.Trigger>
                <Portal>
                  <Popover.Positioner>
                    <Popover.Content>
                      <Popover.Arrow />
                      <Popover.Body>
                        <Text my="4">
                          {formError.map((err,index)=>(
                            <div key={index}>{index+1 +". "+ err}</div>
                          ))}
                        </Text>
                      </Popover.Body>
                    </Popover.Content>
                  </Popover.Positioner>
                </Portal>
              </Popover.Root>  
              
        </div>
        )
}
