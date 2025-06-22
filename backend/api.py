from typing import List
from fastapi import FastAPI, Query,Request,HTTPException
from typing import List, Literal
from operator import itemgetter
from pydantic import BaseModel
from fastapi.middleware.cors import CORSMiddleware
import json
import uuid
import os
import logging

def bubble_sort(word:str,verbose:bool=False)->List[str]:
    arr = list(word)
    n = len(arr)
    steps = []
    for i in range(n):
        swapped = False  # optimization
        for j in range(0, n - i - 1):  # last i elements are already sorted
            if arr[j] > arr[j + 1]:
                if verbose:
                    steps.append([j,j+1])
                arr[j], arr[j + 1] = arr[j + 1], arr[j]  # swap
                swapped = True
        if not swapped:
            break
        
    if verbose:
        return arr,steps
    else:
        return arr





app = FastAPI()
DB_FILE = "users.txt"
origins = [
    "http://localhost:5173",  # React frontend
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,             # origins allowed to access
    allow_credentials=True,
    allow_methods=["*"],               # allow all HTTP methods
    allow_headers=["*"],               # allow all headers
)


# Load users from file
def load_users():
    if not os.path.exists(DB_FILE):
        return []
    with open(DB_FILE, "r") as f:
        return [json.loads(line) for line in f if line.strip()]

# Save all users to file
def save_users(users):
    with open(DB_FILE, "w") as f:
        for user in users:
            f.write(json.dumps(user) + "\n")

# Generate a new user ID
def generate_id():
    return str(uuid.uuid4())

def chunk_list(lst, n):
    return [lst[i:i + n] for i in range(0, len(lst), n)]

class SortRequest(BaseModel):
    data: str
    
@app.post("/sort")
def sort_data(request: SortRequest):
    sorted_word = bubble_sort(request.data)
    return {"word": sorted_word}

@app.post("/sort_verbose")
def sort_verbose(request:SortRequest):
    sorted_word,steps = bubble_sort(request.data,verbose=True)
    return {"word":sorted_word,"steps":steps}


# CRUD operations for user
@app.post("/create_user")
async def create_user(request: Request):
    data = await request.json()
    users = load_users()

    user = {
        "id": generate_id(),
        "email": data.get("email"),
        "password": data.get("password")
    }

    users.append(user)
    save_users(users)
    return {"message": "User created", "user": user}


@app.get("/get_users")
def get_users(
    page: int = Query(0, ge=0),
    perPage: int = Query(10, ge=0),
    sort_by: Literal["id", "email", "password"] = Query("id"),
    sort_reverse:bool = Query(False)
):
    users = load_users()
    # Sort users by selected field
    users_sorted = sorted(users, key=itemgetter(sort_by),reverse=sort_reverse)

    pages = chunk_list(users_sorted,perPage)
    if(page>len(pages)):
        return {"error":"Page does not exist"}

    requested_page = pages[page-1]

    return {"users": requested_page}


@app.get("/get_user/{id}")
def get_user_by_id(id: str):
    users = load_users()
    for user in users:
        if user["id"] == id:
            return user
    raise HTTPException(status_code=404, detail="User not found")



@app.get("/get_users_by_ids")
def get_users_by_ids(ids: List[str] = Query(...)):
    users = load_users()
    matched_users = [user for user in users if user.get("id") in ids]
    return {"users": matched_users}

@app.put("/update_user")
async def update_user(request: Request):
    data = await request.json()
    id = data.get("id")

    users = load_users()
    for user in users:
        if user["id"] == id:
            user["email"] = data.get("email", user["email"])
            user["password"] = data.get("password", user["password"])
            save_users(users)
            return {"message": "User updated", "user": user}

    return {"error": "User not found"}



@app.delete("/delete_user/{id}")
def delete_user(id: str):
    users = load_users()
    new_users = [u for u in users if u["id"] != id]

    if len(new_users) == len(users):
        return {"error": "User not found"}

    save_users(new_users)
    return {"message": "User deleted"}

