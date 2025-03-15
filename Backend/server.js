const express = require("express");
const mysql = require("mysql");
const bodyParser = require("body-parser");
const path = require('path');

const app = express();
app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Serve static files
app.use(express.static(path.join(__dirname, '..', 'Frontend')));

// MySQL Connection
const db = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "Arun&sunny",
    database: "blog"
});

db.connect(err => {
    if (err) throw err;
    console.log("MySQL Connected...");
});

// Fetch all posts
app.get("/posts", (req, res) => {
    db.query("SELECT * FROM posts", (err, results) => {
        if (err) return res.status(500).json({ error: 'Database query failed' });
        res.json(results);
    });
});

// Add a new post
app.post("/add", (req, res) => {
    const { title, content } = req.body;
    db.query("INSERT INTO posts (title, content) VALUES (?, ?)", [title, content], (err) => {
        if (err) throw err;
        res.redirect("/");
    });
});

// Delete a post
app.post("/delete/:id", (req, res) => {
    db.query("DELETE FROM posts WHERE id = ?", [req.params.id], (err) => {
        if (err) throw err;
        res.redirect("/");
    });
});

// Update a post
app.post("/update/:id", (req, res) => {
    const { title, content } = req.body;
    db.query("UPDATE posts SET title = ?, content = ? WHERE id = ?", [title, content, req.params.id], (err) => {
        if (err) throw err;
        res.redirect("/");
    });
});

// Start the server
app.listen(3000, () => {
    console.log("Server running on port 3000");
});
