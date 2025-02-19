import express from "express";
import bodyParser from "body-parser";
import axios from "axios";
import pg from "pg";
import dotenv from "dotenv";
dotenv.config();

const app = express();
const port = process.env.PORT || 3000;

const db = new pg.Client({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    port: process.env.DB_PORT,
});

db.connect()
    .then(() => console.log("Connected to the database"))
    .catch((err) => console.error("Database connection error:", err));

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));

// Fetch and render all books
app.get("/", async (req, res) => {
    try {
        const allBooksData = await db.query("SELECT TO_CHAR(read_date, 'Mon DD YYYY') AS reads_date, * FROM books ORDER BY id ASC");
        res.render("index.ejs", { books: allBooksData.rows});
    } catch (error) {
        console.error("Error fetching books:", error);
        res.status(500).send("Internal Server Error");
    }
});

// Add a new book
app.post("/add", async (req, res) => {
    try {
        const { bookTitle, bookReadDate, bookRatings, bookReviews, bookSummary, bookAuthor } = req.body;
        let coverURL;

        try {
            const response = await axios.get(`https://bookcover.longitood.com/bookcover?book_title=${bookTitle}&author_name=${bookAuthor}`);
            coverURL = response.data.url || "https://placehold.co/150x220?text=No+Cover";
        } catch (coverError) {
            console.warn("Cover not found, using default placeholder.");
            coverURL = "https://placehold.co/150x220?text=No+Cover";
        }
        await db.query(
            "INSERT INTO books (title, read_date, ratings, reviews, summary, cover_url, author) VALUES ($1, $2, $3, $4, $5, $6, $7)",
            [bookTitle, bookReadDate, bookRatings, bookReviews, bookSummary, coverURL, bookAuthor]
        );

        res.redirect("/");
    } catch (error) {
        console.error("Error adding book:", error);
        res.status(500).send("Error adding book");
    }
});

// Edit an existing book
app.post("/edit", async (req, res) => {
    try {
        const { updatedItemId, editbookTitle, editbookReadDate, editbookRatings, editbookReviews, editbookSummary, editbookAuthor } = req.body;
        await db.query(
            "UPDATE books SET title = $1, read_date = $2, ratings = $3, reviews = $4, summary = $5, author = $6 WHERE id = $7",
            [editbookTitle, editbookReadDate, editbookRatings, editbookReviews, editbookSummary, editbookAuthor, updatedItemId]
        );

        res.redirect("/");
    } catch (error) {
        console.error("Error updating book:", error);
        res.status(500).send("Error updating book");
    }
});

app.get("/delete/:id", async (req,res)=>{
    try {
        const deleteBookId = req.params.id;
        await db.query(
            "DELETE from books where id = $1",
            [deleteBookId]
        );
        res.redirect("/");
    } catch (error) {
        console.error("Error deleting book:", error);
        res.status(500).send("Error deleting book");
    }
});

app.get("/book/:id", async (req,res) => {
    try {
        const bookId = req.params.id;
        const book = await db.query(
            "SELECT TO_CHAR(read_date, 'Mon DD YYYY') AS reads_date, * FROM books where id = $1",
            [bookId]
        );
        if (!book) {
            return res.status(404).send("Book not found!");
        }
        res.render("book.ejs", {book: book.rows[0]});
    } catch (error) {
        console.error("Error finding book:", error);
        res.status(500).send("Error finding book");
    }
    
});

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
