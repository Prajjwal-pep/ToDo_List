import express from "express";
import bodyParser from "body-parser";
import axios from "axios";
const app = express();
const port = 3000;

 const API_URL = "http://localhost:4000";

 app.use(express.static("public"));
 app.use(bodyParser.json());
 app.use(bodyParser.urlencoded({ extended: true }));

 app.get("/", async (req, res) => {
    try {
        const response = await axios.get(`${API_URL}/posts`);
        console.log(response);
        res.render("index.ejs", {posts: response.data});
    } catch (error) {
        res.status(500).json({message: "error fetching the post"})
    }
 });
 app.post("/api/posts", async(req, res) => {
    try {
        const response = await axios.post(`${API_URL}/posts`, req.body);
        res.redirect("/");
    } catch (error) {
        res.status(500).json({ message: "Error creating post" });
    }
 });
app.get("/api/posts/delete/:id", async (req, res) => {
    try {
        await axios.delete(`${API_URL}/posts/${req.params.id}`);
        res.redirect("/");
    } catch (error) {
        res.status(500).json({ message: "Error deleting post" });
    }
});
app.listen(port, ()=>{
    console.log(`Listening on port ${port}.`);
});