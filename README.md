# 📝 TuduX – Modern To-Do App  

**TuduX** is a clean, modern, and feature-rich **to-do application** designed to make task management simple, fast, and efficient. Whether you are planning your daily schedule, tracking project tasks, or managing personal goals, TuduX helps you stay on top of everything with ease.  

---

## 🚀 Why TuduX?  
In today’s busy world, productivity tools are often cluttered with unnecessary features. TuduX focuses on what really matters — **adding tasks quickly, staying organized, and completing work on time**. With its intuitive interface and seamless performance, TuduX ensures that managing tasks feels natural and stress-free.  

---

## ✨ Key Features  
- 📝 Create, edit, and delete tasks effortlessly  
- ✅ Mark tasks as completed and track progress in real-time  
- 📅 Stay on schedule with due dates & reminders  
- 🔔 Smart notifications to never miss a task (upcoming) 
- 📆 Google Calendar integration (upcoming)  
- 🔒 Secure authentication with JWT  
- 🌐 Cross-platform ready – works across devices  

---

## ⚡ Tech Stack  
- **Frontend:** React.js / Next.js  
- **Backend:** Node.js + Express.js  
- **Database:** PostgreSQL with Drizzle ORM  
- **Authentication:** JWT  
- **Deployment:** Railway

---

## 🗂 Folder Structure (Recommended)

```plaintext
tudux/
├── src/                       # Backend code
├── postman/                   # Postman collection
│   └── TuduX_API.postman_collection.json
├── README.md
└── .env.example               # Sample environment variables
```


---

## 🏃‍♂️ Getting Started  

Follow these steps to run TuduX locally:  

### 1. Clone the repo

```bash
git clone https://github.com/your-username/tudux.git
cd tudux
```

### 2. Install dependencies

```bash
npm install
``` 

### 3. Setup environment variables

Create a .env file in the root directory and add:
```bash
PORT=5000
DATABASE_URL=postgresql://username:password@host:port/dbname
JWT_SECRET=your_jwt_secret
```

### 4. Run the server

```bash
npm run dev
```

The backend will run on http://localhost:5000.

### 5. Test APIs

* Use Postman and import the collection inside postman/TuduX_API.postman_collection.json

* Set BASE_URL and TOKEN environment variables

* Start testing Auth & Todo routes


---

## Postman API Collection

You can test all API routes using Postman. The collection is inside the `postman/` folder.

### Steps to use:
1. Open Postman.
2. Click `Import` → `File` → select `postman/TuduX_API.postman_collection.json`.
3. Set environment variables (if needed) like:
   - `BASE_URL` = `https://tudux.onrender.com`
   - `TOKEN` = <Your JWT Token after login>
4. Start testing routes!


---

## 🎯 Goal  
The vision behind TuduX is to provide a **minimal yet powerful productivity tool** that combines simplicity with advanced features like notifications and calendar sync.  

Whether you are a student, professional, or team member, **TuduX** adapts to your workflow and keeps you productive.  

---

💡 *Stay focused. Stay productive. Finish smarter with **TuduX.***  