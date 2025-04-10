# 📚 Book Notes App

A cozy, dark-themed web app to jot down notes and summaries of your favorite books — now with cover images and sortable ratings!

---

## 🌟 Features

- ✍️ Add, edit, and delete your personal book notes  
- 📖 View book cover images via the Open Library Covers API  
- 🔢 Rate your books (0–10 scale)  
- 📊 Sort books by rating  
- 🧠 Save summaries and thoughts  
- 🌙 Clean dark theme

---

## 🛠️ Tech Stack

- **Backend**: Node.js, Express.js  
- **Database**: PostgreSQL  
- **Templating**: EJS  
- **Frontend**: HTML, CSS, JavaScript  
- **API**: [Open Library Covers API](https://openlibrary.org/dev/docs/api/covers)

---

## 💾 Setup Instructions

### 1. Clone the repositor
- ```git clone https://github.com/your-username/book-notes-app.git```
- ```cd book-notes-app```

### 2. Install dependencies
- ```npm install```
### 3. Configure the PostgreSQL Database
- Make sure PostgreSQL is installed and running on your system.
- Create a database named Book_Notes and run the following SQL schema:
- ```CREATE TABLE book_notes (
  id SERIAL PRIMARY KEY,
  book_title TEXT NOT NULL,
  author TEXT,
  summary TEXT,
  note TEXT,
  isbn TEXT,
  rate INT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ); 
- Update the database credentials in your index.js file if needed:
- ```const db = new pg.Client({
  user: "your-username",
  host: "localhost",
  database: "Book_Notes",
  password: "your-password",
  port: 5432,});
### 4. Start the App
- ```node index.js```

## 📜 License
- This project is licensed under the **MIT License**.

### Made with ☕, curiosity, and lots of bookmarked pages.
