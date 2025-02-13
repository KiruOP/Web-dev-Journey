import express from "express";
import bodyParser from "body-parser";
import pg from "pg";

const app = express();
const port = 3000;

const db = new pg.Client({
    host: "localhost",
    user: "postgres",
    password: "1234",
    database: "Read Books",
    port: 5432,
});
db.connect();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));

app.get("/", async (req,res) => {
    const allBooksData = await db.query("Select * from books order by id asc");
    const allBooks = allBooksData.rows;
    res.render("index.ejs", {books : allBooks});
});

app.post("/add", async (req,res) => {
    const data = req.body;
    const coverURL = "https://www.amazon.in/";
    await db.query("insert into books (title, read_date, ratings, reviews, summary, cover_url, author) values ($1, $2, $3, $4, $5, $6, $7)",[data.bookTitle,data.bookReadDate,data.bookRatings,data.bookReviews,data.bookSummary,coverURL,data.bookAuthor]);
    res.redirect("/");
});

app.post("/edit?:id", async (req,res) => {
    const data = req.body;
    const bookID = req.params.id;
    const coverURL = "https://www.amazon.in/";
    await db.query("update books set title = '$1', read_date = '$2', ratings = '$3', reviews = '$4', summary = '$5', cover_url = '$6', author = '$7' where id = $8",[data.editbookTitle,data.editbookReadDate,data.editbookRatings,data.editbookReviews,data.editbookSummary,coverURL,data.editbookAuthor,bookID]);
    res.redirect("/");
});

app.listen(port, () => {
    console.log(`Server is running on ${port}.`);
});