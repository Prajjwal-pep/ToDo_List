import express from "express";
import bodyParser from "body-parser";
const app = express();
const port = 4000;

let posts = [{
    id: 1,
    content: "walk a mile"
},
{
    id: 2,
    content: "talk a while"
}]

let lastId = 2;

 app.use(bodyParser.json());
 app.use(bodyParser.urlencoded({ extended: true }));

 app.get("/posts", (req, res) => {
    res.json(posts);
 })

 app.post("/posts", (req, res) => {
        const newId = lastId += 1;
        const post = {
            id: newId,
            content: req.body.task,
        };
        lastId = newId;
        posts.push(post);
        res.status(200).json(post);
 });

 app.delete("/posts/:id", (req, res) => {
    const id = parseInt(req.params.id);
    const indexId = posts.findIndex((post) => post.id === id);
    if(indexId===-1) return res.status(404).json({message: "post not found"});
    posts.splice(indexId, 1);
    res.status(200).json({message: "post deleted"});
 })

app.listen(port, ()=>{
    console.log(`Listening on port ${port}.`);
});