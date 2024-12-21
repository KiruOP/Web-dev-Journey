import express from "express";
import bodyParser from "body-parser";

const app = express();
const port = 3000;

var posts = [
    {
        id: 1,
        title: "How to Get Started with Node.js",
        description: "Node.js is a powerful JavaScript runtime built on Chrome’s V8 engine. Here’s a quick guide to get you started with the basics.",
        content: "Node.js is a powerful JavaScript runtime built on Chrome’s V8 engine. Here’s a quick guide to get you started with the basics."
    },
    {
        id: 2,
        title: "Express.js Tips and Tricks for Beginners",
        description: "Express.js is a fast, unopinionated framework for building web applications. Here’s what you need to know.",
        content: "Node.js is a powerful JavaScript runtime built on Chrome’s V8 engine. Here’s a quick guide to get you started with the basics."
    },
    {
        id: 3,
        title: "How to Build a Blog with Node.js and Express.js",
        description: "Express.js is a fast, unopinionated framework for building web applications. Here’s what you need to know.",
        content: "In this tutorial, we’ll walk through how to build a simple blog with Node.js and Express.js."
    },
    {
        id: 4,
        title: "How to Create a Simple REST API with Node.js",
        description: "Express.js is a fast, unopinionated framework for building web applications. Here’s what you need to know.",
        content: "REST APIs are a great way to connect different services. Here’s how to create a simple REST API with Node.js."
    },
    {
        id: 5,
        title: "Understanding Templating with EJS",
        description: "Express.js is a fast, unopinionated framework for building web applications. Here’s what you need to know.",
        content: "Learn how EJS can help you create dynamic web pages with embedded JavaScript."
    },
    {
        id: 6,
        title: "10 CSS Tips for Building Responsive Web Apps",
        description: "Express.js is a fast, unopinionated framework for building web applications. Here’s what you need to know.",
        content: "CSS is essential for responsive design. These tips will help you build websites that look great on any device."
    }
];

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));

function shortenContent(desc) {
    if (desc.length > 100) {
        return desc.substring(0, 100) + "...";
    } else {
        return desc;
    }
}

function storingPosts(req, res, next) {
    if (req.body.title && req.body.content) {
        posts.push({
            id: posts.length + 1,
            title: req.body.title,
            content: req.body.content
        });
    }
    next();
}
app.use(storingPosts);

app.get("/", (req, res) => {
    if (posts.length > 0) {
        posts.forEach(post => post.description = shortenContent(post.content));
        res.render("index.ejs", {
            posts: posts
        });
    }else{
        res.render("index.ejs");
    }
})

app.get("/about", (req, res) => {
    res.render("about.ejs");
})

app.get("/contact", (req, res) => {
    res.render("contact.ejs");
})

app.post("/submit-contact", (req, res) => {
    res.redirect("/contact");
    console.log("Thank you for your message!");
})

app.get("/posts/new", (req, res) => {
    res.render("newpost.ejs");
})

app.post("/posts", (req, res) => {
    res.redirect("/");
})

app.get("/posts/:id/edit", (req, res) => {
    const index = posts.findIndex(post => post.id === Number(req.params.id));
    if (index > -1) {
        var postTitle = posts[index].title;
        var postContent = posts[index].content;
    }
    res.render("editpost.ejs",{
        id: req.params.id,
        title: postTitle,
        content: postContent
    });
})

app.post("/posts/:id", (req, res) => {
    const index = posts.findIndex(post => post.id === Number(req.params.id));
    if (index > -1) {
        posts[index].title = req.body.newTitle || posts[index].title;
        posts[index].content = req.body.newContent || posts[index].content;
    }
    res.redirect("/");
})

app.get("/posts/:id/delete", (req, res) => {
    const index = posts.findIndex(post => post.id === Number(req.params.id));
    if (index > -1) {
        posts.splice(index, 1);
    }
    res.redirect("/");
})

app.get("/posts/:title", (req, res) => { ///posts/<%= post.title %> this is the url for each post card in the index.ejs
    const index = posts.findIndex(post => post.title === req.params.title);
    if (index > -1) {
        var postTitle = posts[index].title;
        var postContent = posts[index].content;
    }
    res.render("blogpost.ejs", {
        title: postTitle,
        content: postContent
    })
})

app.listen(port, () => {
    console.log(`Listening on port http://localhost:${port}/`);
})