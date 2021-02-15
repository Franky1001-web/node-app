var express = require("express");
var app = express();
var path = require("path");
var methodOverride = require('method-override');
var bodyParser = require('body-parser');
const { v4: uuidv4 } = require('uuid');
const { NONAME } = require("dns");
uuidv4();

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views")); //For avoiding problem which can arise while executing file outside express_practice directory
app.use(express.static(path.join(__dirname, "\public"))); //To serve static files such as css, javascript
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(methodOverride('_method'));
app.use(bodyParser.urlencoded({extended: true}));

let comments = [
  {
    id:uuidv4(),
    name: "Sumit Mittal",
    line:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi pharetra et leo a aliquet. Mauris nec ex enim. Ut facilisis mollis felis. Quisque vel consectetur enim. In non odio purus. Nullam eu tortor nulla. Suspendisse tristique tortor nisl, eget ullamcorper dolor aliquet sit amet. Nam euismod nibh hendrerit tincidunt gravida. Curabitur lacinia porta blandit. Nullam egestas magna vitae mattis dapibus. Maecenas et congue arcu. Sed nec neque quam. Donec id ipsum pharetra nunc laoreet pulvinar. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas.",
  },
  {
    id:uuidv4(),
    name: "Sunil Mittal",
    line:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi pharetra et leo a aliquet. Mauris nec ex enim. Ut facilisis mollis felis. Quisque vel consectetur enim. In non odio purus. Nullam eu tortor nulla. Suspendisse tristique tortor nisl, eget ullamcorper dolor aliquet sit amet. Nam euismod nibh hendrerit tincidunt gravida. Curabitur lacinia porta blandit. Nullam egestas magna vitae mattis dapibus. Maecenas et congue arcu. Sed nec neque quam. Donec id ipsum pharetra nunc laoreet pulvinar. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas.",
  },
  {
    id:uuidv4(),
    name: "Sapna Mittal",
    line:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi pharetra et leo a aliquet. Mauris nec ex enim. Ut facilisis mollis felis. Quisque vel consectetur enim. In non odio purus. Nullam eu tortor nulla. Suspendisse tristique tortor nisl, eget ullamcorper dolor aliquet sit amet. Nam euismod nibh hendrerit tincidunt gravida. Curabitur lacinia porta blandit. Nullam egestas magna vitae mattis dapibus. Maecenas et congue arcu. Sed nec neque quam. Donec id ipsum pharetra nunc laoreet pulvinar. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas.",
  },
  {
    id:uuidv4(),
    name: "Sanjana Mittal",
    line:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi pharetra et leo a aliquet. Mauris nec ex enim. Ut facilisis mollis felis. Quisque vel consectetur enim. In non odio purus. Nullam eu tortor nulla. Suspendisse tristique tortor nisl, eget ullamcorper dolor aliquet sit amet. Nam euismod nibh hendrerit tincidunt gravida. Curabitur lacinia porta blandit. Nullam egestas magna vitae mattis dapibus. Maecenas et congue arcu. Sed nec neque quam. Donec id ipsum pharetra nunc laoreet pulvinar. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas.",
  },
];

app.get("/comments", (req, res) => {
  res.render("showComments", { comments });
});

app.get("/comments/new", (req, res) => {
  res.render("form");
});

 app.post("/comments", (req, res) => {
  let add = {
    id: uuidv4(),
    name: req.body.name,
    line: req.body.comment
  }
  comments.push(add);
  res.render("showComments", {comments});
 });

app.get("/comments/:id", (req, res) => {
let id = (req.params.id);
// console.log(id);
let comment_to_show={};
for(let i=0;i<comments.length;i++){
  if(comments[i].id === id){
    comment_to_show=comments[i];
    break;
  }
}
   res.render("showCommentById", { comment_to_show });
});

app.get('/comments/:id/edit' , (req,res) => {
  let id= req.params.id;
  res.render("formByID", {id});
})

app.patch('/comments/:id', (req,res) => {
  //  console.log(req.body);
  //  console.log(req.params);
   let id = req.params.id;
   let newCommentText = req.body.newComment;
   let comment_to_show ={};
   for(let i=0;i<comments.length;i++){
     if(comments[i].id === id){
       comment_to_show=comments[i];
       break;
     }
   }
  //  console.log(comment_to_show);
   comment_to_show.line=newCommentText;
   res.redirect('/comments');
  // res.send("hello");
})

app.delete('/comments/:id', (req,res) => {
  let id = req.params.id;
  let index=0;
  for(let i=0;i<comments.length;i++){
    if(comments[i].id===id){
      index=i;
      break;
    }
  }
  comments.splice(index,1);
  res.redirect('/comments');
})
app.listen(process.env.PORT || 3000, () => {
  console.log("server is live!!!");
})