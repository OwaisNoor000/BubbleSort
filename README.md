

# 🧼 Bubble Sort Visualizer with Chat & Admin Panel

This is an interactive bubble sort visualization tool with:

* ✅ A **chat interface** for user-friendly interaction
* ✅ An **admin panel** for user management
* ✅ Full **authentication** (register + login)

---

## 🚀 How to Run the Project

### 📦 Frontend

```bash
cd frontend
npm install
npm run dev
```

### 🔧 Backend

```bash
cd backend
uvicorn api:app --reload --port=8000
```

---

## 🎥 Demo Video

Watch it in action: 

[![Demo Video](https://img.youtube.com/vi/SRIlfU6hCKM/0.jpg)](https://youtu.be/SRIlfU6hCKM)

---

## 🛠️ Technologies Used

* **ReactJS**
* **TypeScript**
* **Zustand** (state management)
* **TanStack Query** (data fetching)
* **React Admin** (admin panel)
* **Tailwind CSS** + Chakra UI (styling)

---

## 📁 Project Structure

### Frontend (`/frontend`)

```
/public
/src
  /admin        → Admin module logic
  /assets       → Images
  /components   → Reusable UI components
  /contexts
    ZustandAppContext.ts   → Zustand state management (currently used)
    MessagesProvider.tsx   → React Context (legacy)
  /enums        → Enum definitions
  /pages        → Full pages made from components
  /routes       → Application routes
  /services     → Axios request functions

main.tsx
index.html
style.css     → Tailwind input
output.css    → Tailwind output
tsconfig.json
package.json
```

### Backend (`/backend`)

```
api.py        → REST API and business logic
users.txt     → Acts as a flat-file database
```

---

Feel free to clone, explore, and contribute!
