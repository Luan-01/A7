const sqlite3 =require('sqlite3').verbose();
const sqlite = require('sqlite');
const express = require('express');
const cors = require('cors');

const app = express();
const port = 3001;
let db;
app.use(express.json());
app.use(cors());
async function api_start()
{
    db = await sqlite.open({
        filename: 'games.db',
        driver: sqlite3.Database
    });
}
//Collection Request
app.get("/api", async function( req,res){

    const results = await db.all("SELECT rowid as id, * FROM Games")
    res.json(results);
});

app.put("/api", async (req, res) => {
    const newCollection = req.body;
  
      await db.run("DELETE FROM Games");
  
      for (const item of newCollection) {
        const { title, genre, platform, releaseYear } = item;
            await db.run(
            "INSERT INTO Games (title, genre, platform, releaseYear) VALUES (?, ?, ?, ?)",
            [title, genre, platform, releaseYear]
            );
        }
        res.json({ status: "REPLACE COLLECTION SUCCESSFUL" });
      });
  
  app.post("/api", async (req, res) =>{
    const { title, genre, platform, releaseYear } = req.body;
  
    await db.run(
      "INSERT INTO Games (title, genre, platform, releaseYear) VALUES (?, ?, ?, ?)",
      [title, genre, platform, releaseYear]
    );
  
    res.json({ message: "Game added successfully" });
  });

  app.delete("/api", async (req, res) => {
      await db.run("DELETE FROM Games");
      res.json({ message: "Delete collection successfully" });
    });

//Item Request
app.get("/api/:id", async function(req, res) {
    const { id } = req.params;
    const results = await db.all("SELECT rowid as id, * FROM Games WHERE rowid=?", [id]);
    res.json(results);
  });

  app.put("/api/:id", async (req, res) => {
    const id = req.params.id;
    const { title, genre, platform, releaseYear } = req.body;
  
    await db.run(
      "UPDATE Games SET title=?, genre=?, platform=?, releaseYear=? WHERE rowid=?",
      [title, genre, platform, releaseYear, id]
    );
  
    res.json({ status: "UPDATE ITEM SUCCESSFUL" });
  });
  
  app.delete("/api/:id", async (req, res) => {
    const { id } = req.params;
  
    await db.run("DELETE FROM Games WHERE rowid=?", [id]);
  
    res.json({ message: "Game deleted successfully" });
  });
  

  

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
  });
  api_start();
