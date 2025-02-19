# 📚 Book Review Website  

A simple book review website where users can add, view, edit, and delete book entries, inspired by Derek Sivers' book notes site. Built using **Node.js, Express, PostgreSQL, and EJS**.

## 🌟 Features  

- 📖 **Add Books** – Users can add books with details like title, author, date read, rating, review, and summary.  
- 🔍 **View Books** – Displays all books in a list with sorting options by rating and recency.  
- ✏️ **Edit Books** – Update book details via a popup form.  
- ❌ **Delete Books** – Remove books from the library.  
- 📸 **Book Covers** – Fetches book covers using an external API. If the cover is unavailable, a default placeholder is used.  



## 🛠️ Tech Stack  

- **Frontend**: HTML, CSS, JavaScript, EJS  
- **Backend**: Node.js, Express.js  
- **Database**: PostgreSQL  
- **APIs**: Open Library Covers API (for book covers)  



## 🚀 Installation & Setup  

### 1️⃣ Clone the Repository  

```bash
git clone https://github.com/yourusername/book-review-website.git
cd book-review-website
```

### 2️⃣ Install Dependencies  

```bash
npm install
```

### 3️⃣ Set Up the Database  

Make sure PostgreSQL is installed and running. Then, create a database and a `books` table:  

```sql
CREATE DATABASE book_reviews;
\c book_reviews;

CREATE TABLE books (
    id SERIAL PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    author VARCHAR(255),
    read_date DATE,
    ratings INT CHECK (ratings BETWEEN 1 AND 5),
    reviews TEXT,
    summary TEXT,
    cover_url TEXT
);
```

### 4️⃣ Configure Environment Variables  

Create a `.env` file in the root directory:  

```plaintext
PORT=3000
DATABASE_URL=postgres://username:password@localhost:5432/book_reviews
DEFAULT_COVER_URL=https://your-placeholder-image-url.com/default-cover.jpg
```

Replace `username:password` with your PostgreSQL credentials.

### 5️⃣ Start the Server  

```bash
npm start
```

Server will run at `http://localhost:3000`.


## 📜 License  

This project is open-source and available under the **MIT License**.  


## ✨ Acknowledgments  

- **Derek Sivers** for the inspiration.  
- **Open Library API** for book covers.  



🚀 Happy coding! If you like this project, give it a ⭐ on GitHub!  