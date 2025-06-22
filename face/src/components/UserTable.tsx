import { Edit, PasswordInput, SimpleForm, TextInput,Create } from 'react-admin';
import { DataTable, EmailField, List } from 'react-admin';
import {
  ActionBar,
  Button,
  Checkbox,
  Kbd,
  Portal,
  Table,
} from "@chakra-ui/react"
import { useState } from "react"
export const UserList = () => (
    <List>
        <DataTable>
            <DataTable.Col source="id" />
            <DataTable.Col source="email">
                <EmailField source="email" />
            </DataTable.Col>
            <DataTable.Col source="password" />
        </DataTable>
    </List>
);

// style={{border:"2px solid pink",border-radius:"10px" 
                    // ,width:"400px"}}

export const UserEdit = () => (
    <Edit>
        <SimpleForm style={{backgroundColor:"rd"}}>
            <TextInput source="id" disabled style={{width:"400px",}}/>
            <TextInput source="email" style={{width:"400px"}}/>
            <PasswordInput source="password" style={{width:"400px"}}/>
        </SimpleForm>
    </Edit>
);



export const UserCreate = () => (
    <Create>
        <SimpleForm style={{backgroundColor:"rd"}}>
            <TextInput source="id" disabled style={{width:"400px",}}/>
            <TextInput source="email" style={{width:"400px"}}/>
            <PasswordInput source="password" style={{width:"400px"}}/>
        </SimpleForm>
    </Create>
);