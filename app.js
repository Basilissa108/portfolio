const express = require("express");
const data = require("./data.json");
const path = require("path");

// instatiate express app
const app = express();
// set view engine to pug
app.set("view engine", "pug");
// serve static files
app.use('/static', express.static(path.join(__dirname, 'public')));
app.use("/images", express.static(path.join(__dirname, 'images')));

// index route
app.get("/", (req, res) => {
    res.render("index.pug", {
        "projects": data.projects
    });
});

// about route
app.get("/about", (req, res) => {
    res.render("about.pug");
});

app.get("/project/:id", (req, res) => {
    // get project id from params
    var id = req.params.id;
    // find project by id in data.projects array
    var project = data.projects.find(project => project.id == id);
    
    // check if there is a project with the id and display it, otherwise redirect to the 404 to change the URL and display an error using the fallback route
    if (project) {
        res.render("project.pug", {
            ...project
        });
    } else {
        res.redirect("/404");
    }
});

// set up a fallback route to display a 404 error for not existing routes
app.get("*", (req, res) => {
    res.render("error.pug");
});

app.listen(3000, () => console.log(`Example app listening on port ${3000}!`))