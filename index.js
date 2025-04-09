import express from "express";
import bodyParser from "body-parser";
import pg from "pg";

const app = express();
const port = 3000;

const db = new pg.Client({
  user: "postgres",
  host: "localhost",
  database: "database_name",
  password: "your_passwords",
  port: 5432,
});

db.connect();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));
app.set("view engine", "ejs");

// GET home page
app.get("/", async (req, res) => {
  const data = await db.query("SELECT * FROM book_notes ORDER BY id ASC");
  const books = data.rows;
  res.render("index.ejs", { items: books });
});

//GET ratings 
app.get("/ratings", async(req, res) => {
    try {
        const rate = await db.query("SELECT * FROM book_notes ORDER BY rate DESC");
        res.render("index.ejs", { items: rate.rows });
    } catch (error) {
        console.log("Error getting ratings!")
    }
});

// POST Add new book
app.post("/add", async (req, res) => {
  const { newTitle, newAuthname, newSum, newNote, newISBN, newRate } = req.body;

  const coverURL = newISBN
    ? `https://covers.openlibrary.org/b/isbn/${newISBN}-L.jpg`
    : null;

  try {
    await db.query(
      "INSERT INTO book_notes (book_title, author, summary, note, isbn, cover_url, rate) VALUES ($1, $2, $3, $4, $5, $6,$7)",
      [newTitle, newAuthname, newSum, newNote, newISBN, coverURL, newRate]
    );
    res.redirect("/");
  } catch (error) {
    console.error("Error adding book:", error);
    res.redirect("/");
  }
});

// POST Edit book
app.post("/edit/:id", async (req, res) => {
  const id = req.params.id;
  const { book_title, author, summary, note, isbn, rate } = req.body;
  const coverURL = isbn
    ? `https://covers.openlibrary.org/b/isbn/${isbn}-L.jpg`
    : null;

  try {
    await db.query(
      "UPDATE book_notes SET book_title = $1, author = $2, summary = $3, note = $4, isbn = $5, cover_url = $6, rate = $7 updated_at = NOW() WHERE id = $8",
      [book_title, author, summary, note, isbn, coverURL, rate, id]
    );
    res.redirect("/");
  } catch (error) {
    console.error("Error updating book:", error);
    res.redirect("/");
  }
});

// POST Delete book
app.post("/delete/:id", async (req, res) => {
  const id = req.params.id;
  try {
    await db.query("DELETE FROM book_notes WHERE id = $1", [id]);
    res.redirect("/");
  } catch (error) {
    console.error("Error deleting book:", error);
    res.redirect("/");
  }
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
