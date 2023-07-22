const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
var _ = require("lodash");

const app = express();
app.use(bodyParser.urlencoded({ extended: true }));
app.set("view engine", "ejs");
app.use(express.static("public"));
app.use(express.static("images"));

const posts = [];
let x = "";
const homeStartingContent =
  "Explore a world of inspiration and self-expression. Read captivating stories and insightful reflections carefully curated by our team. Feel inspired? Share your voice in our Compose section! Publish your thoughts, creative pieces, or heartfelt messages with the world. Unleash your creativity, connect with others, and become part of our growing community! Happy journaling!";
const aboutContent =
  "Hello , I'm SIDDHANT KANKARIA Computer Science Engineer. ";
const aboutcontentone =
  "I am deeply interested in Web Development, finding joy in the creative process of crafting impactful and user-friendly websites.";
const contactContent = "Contact No: 9352132617";
app.get("/", function (req, res) {
  res.render("home", { startingContent: homeStartingContent, posts: posts });

  // console.log(posts);
});

app.get("/about", function (req, res) {
  res.render("about", {
    aboutPageContent: aboutContent,
    aboutPageContentone: aboutcontentone,
  });
});
app.get("/contact", function (req, res) {
  res.render("contact", { contactPageContent: contactContent });
});
app.get("/compose", function (req, res) {
  res.render("compose");
});
app.post("/compose", function (req, res) {
  const post = { Title: req.body.postTitle, content: req.body.postBody };
  posts.push(post);
  res.redirect("/");
});
// express routing parameters
app.get("/posts/:postName", function (req, res) {
  x = _.lowerCase(req.params.postName);
  for (let j = 0; j < posts.length; j++) {
    if (_.lowerCase(posts[j].Title) === x) {
      res.render("post", { givenTitle: x, contents: posts[j].content });
    }
  }
});

app.listen(8000, function () {
  console.log("8000 server running");
});
