import axios from "axios";

type User = {
    user_id?:string,
    email:string,
    password:string
}

export type SELECT = {
    users:User[]
}

export type INSERT = {
    message:string
    user:User
}

export const getUsers:()=>Promise<User[]> = ()=>{
    return axios
        .get<SELECT>("http://localhost:8000/get_users")
        .then((response)=>{
            return response.data.users
        });
};

export const createUser:(user:User)=>Promise<User> = (user:User)=>{
    return axios
        .post<INSERT>("http://localhost:8000/create_user",{
            email:user.email,
            password:user.password
        }).then((response)=>{
            return response.data.user
        });

}

