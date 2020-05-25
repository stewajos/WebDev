const express = require('express');
const app = express();
const port = 8080;
app.use(express.json());
app.use(express.urlencoded({ extended: true}))

function getUsers(req, res){
    res.send("hello");
}
function putUsers(req, res){
    res.send("world.")

}

app.get("/users", getUsers);
app.put("/users", putUsers);

app.listen(port, () => console.log(`begin; listening on port ${port}`));