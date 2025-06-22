import {Pagination, ResourceDefinitionContext, type DataProvider} from "react-admin";
import axios from "axios";

const API_URL = "http://localhost:8000"

export const CustomDataProvider:DataProvider = {
    getList:async (resource,params)=>{
        const page = params.pagination?.page;
        const perPage = params.pagination?.perPage;
        const sort = params.sort?.field;
        const reverse:boolean = params.sort?.order === "ASC"?false:true;
        
        const response = await axios
            //.get(`${API_URL}/get_users?page=${page}&perPage=${perPage}&sort_by=${sort}&sort_reverse=${reverse}`)
            .get(`${API_URL}/get_users?page=${page}&perPage=${perPage}&sort_reverse=${reverse}`)
            .then((response)=>{
                return response
            });
           
        return{
            data:response.data.users,
            total:response.data.users.length
        }
    },
    
    
    getOne:async (resource,params)=>{
        const user_id = params.id;

        const response = await axios
            .get(`${API_URL}/get_user/{user_id}`)
            .then((response)=>{
                return response.data
            });

        return {
            data:response.json
        }

    },

    getMany:async (resource,params)=>{
        const ids = params.ids;
        let modified_ids:string[] = [];
        for(const id of ids){
            modified_ids.push("ids="+id);
        }
        const args = modified_ids.join("&");

        const response = await axios
            .get(`${API_URL}/get_users_by_ids?${params}`)
            .then((response)=>{return response.data.users})
            
        return {
            data:response.json
        }
    },

   create:async (resource,params)=>{
        const response = await axios.post(`${API_URL}/create_user`,{
            "email":"test@test.com",
            "password":"testpass"
        });
        
        return{
            data:response.data
        }
   }, 
   
    
   update:async (resource,params)=>{
        const response = await axios.post(`${API_URL}/create_user`,{
            "email":"test@test.com",
            "password":"testpass"
        });
        
        return{
            data:response.data
        }
   }, 
   
    
   updateMany:async (resource,params)=>{
        const response = await axios.post(`${API_URL}/create_user`,{
            "email":"test@test.com",
            "password":"testpass"
        });
        
        return{
            data:response.data
        }
   }, 
   
    
   delete:async (resource,params)=>{
        const response = await axios.post(`${API_URL}/create_user`,{
            "email":"test@test.com",
            "password":"testpass"
        });
        
        return{
            data:response.data
        }
   }, 
   
    
   deleteMany:async (resource,params)=>{
        const response = await axios.post(`${API_URL}/create_user`,{
            "email":"test@test.com",
            "password":"testpass"
        });
        
        return{
            data:response.data
        }
   }, 
   
     getManyReference:async (resource,params)=>{
        const response = await axios.post(`${API_URL}/create_user`,{
            "email":"test@test.com",
            "password":"testpass"
        });
        
        return{
            data:response.data
        }
   } 
   

   
}