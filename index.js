const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
var _ = require("lodash");
const nodemailer = require("nodemailer");
const mongoose = require("mongoose");

mongoose
  .connect(
    "mongodb+srv://siddhantkankaria:siddhant@dailyjournal.2nojxt4.mongodb.net/blogDB",
    {
      useNewUrlParser: true,
    }
  )
  .then(console.log("connected to mongodb server"));
const app = express();
app.use(bodyParser.urlencoded({ extended: true }));
app.set("view engine", "ejs");
app.use(express.static("public"));

const postSchema = new mongoose.Schema({
  title: { type: String },
  post: { type: String },
});

const Post = mongoose.model("Post", postSchema);

const x = "";
const homeStartingContent =
  "Explore a world of inspiration and self-expression. Read captivating stories and insightful reflections carefully curated by our team. Feel inspired? Share your voice in our Compose section! Publish your thoughts, creative pieces, or heartfelt messages with the world. Unleash your creativity, connect with others, and become part of our growing community! Happy journaling!";
const aboutContent =
  "Hello , I'm SIDDHANT KANKARIA Computer Science Engineer. ";
const aboutcontentone =
  "I am deeply interested in Web Development, finding joy in the creative process of crafting impactful and user-friendly websites.";
const contactContent = "Contact No: 9352132617";
app.get("/", function (req, res) {
  const readPost = async () => {
    try {
      const Getpost = await Post.find();
      // console.log(Getpost);
      res.render("home", {
        startingContent: homeStartingContent,
        posts: Getpost,
      });
    } catch {
      console.log("error in getting post");
    }
  };
  readPost();

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
app.post("/contact", function (req, res) {
  var name = req.body.Name;
  var email = req.body.email;
  var message = req.body.message;
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: "siddhantkankaria122@gmail.com",
      pass: "lstidijkqjjmcauw",
    },
  });
  var mailoptions = {
    from: req.body.email,
    to: "siddhantkankaria122@gmail.com",
    subject: "Hello",
    text: `Name:${name} \nMessage: ${req.body.message}`,
  };
  transporter.sendMail(mailoptions, function (error, info) {
    if (error) {
      console.log(error);
    } else {
      res.render("thanks");
      console.log("email sent" + info.response);
    }
  });
});

app.get("/compose", function (req, res) {
  res.render("compose");
});
app.post("/compose", function (req, res) {
  const post = { Title: req.body.postTitle, content: req.body.postBody };

  const newPost = Post({
    title: post.Title,
    post: post.content,
  });
  newPost.save();
  res.redirect("/");
});
// express routing parameters
app.get("/posts/:postId", function (req, res) {
  const requestedPostId = req.params.postId;
  console.log(requestedPostId);
  const readPost = async () => {
    try {
      const Gets = await Post.findOne({ _id: requestedPostId });
      console.log(typeof Gets);
      res.render("post", {
        givenTitle: Gets.title,
        contents: Gets.post,
      });
    } catch {
      console.log("error in getting post");
    }
  };
  readPost();
});
app.post("/delete", function (req, res) {
  const deletePostid = req.body.checkbox;
  Post.findByIdAndDelete(deletePostid)
    .then(() => {
      console.log("deleted");
    })
    .catch(() => {
      console.log(err);
    });
  res.redirect("/");
});
app.listen(5000, function () {
  console.log("5000 server running");
});
