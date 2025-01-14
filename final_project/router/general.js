const express = require('express');
let books = require("./booksdb.js");
let isValid = require("./auth_users.js").isValid;
let users = require("./auth_users.js").users;
const public_users = express.Router();


const doesExist = (username)=>{
    let userswithsamename = users.filter((user)=>{
      return user.username === username
    });
    if(userswithsamename.length > 0){
      return true;
    } else {
      return false;
    }
  }
  
  const authenticatedUser = (username,password)=>{
    let validusers = users.filter((user)=>{
      return (user.username === username && user.password === password)
    });
    if(validusers.length > 0){
      return true;
    } else {
      return false;
    }
  }
  
public_users.post("/register", (req,res) => {
    const username = req.body.username;
    const password = req.body.password;
  
    if (username && password) {
      if (!doesExist(username)) { 
        users.push({"username":username,"password":password});
        return res.status(200).json({message: "User successfully registred. Now you can login"});
      } else {
        return res.status(404).json({message: "User already exists!"});    
      }
    } 
    return res.status(404).json({message: "Unable to register user."});
});

// Get the book list available in the shop
public_users.get('/',function (req, res) {
  //Write your code here  
  //res.send(JSON.stringify(books));
  let book={}
  for (var i=1; i<Object.keys(books).length+1; i++){
    
    book[i]+=books[i]['title']
    }
    let myPromise = new Promise((resolve,reject) => {
        setTimeout(() => {
          resolve(book)
     },600)})
     myPromise.then((successMessage) => {
        res.send(book);
  })
    
});

// Get book details based on ISBN
public_users.get('/isbn/:isbn',function (req, res) {
  //Write your code here
  let myPromise = new Promise((resolve,reject) => {
    setTimeout(() => {
      resolve(books[req.params.isbn])
 },600)})
 myPromise.then((successMessage) => {
    res.send(JSON.stringify(req.params.isbn));
})
  
 });
  
// Get book details based on author
public_users.get('/author/:author',function (req, res) {  
  authr=""
  for (var i=1; i<Object.keys(books).length+1; i++){
    
    if(books[i]['author']==req.params.author) {
        authr=books[i]['title']
      }
    }
    let myPromise = new Promise((resolve,reject) => {
        setTimeout(() => {
          resolve(books[req.params.isbn])
     },600)})
     myPromise.then((successMessage) => {
        res.send(JSON.stringify(authr));
    })
  
});

// Get all books based on title
public_users.get('/title/:title',function (req, res) {
    let book=""
    for (var i=1; i<Object.keys(books).length+1; i++){    
        if(books[i]['title']==req.params.title) {
            book=books[i]['author']
          }
        }
        let myPromise = new Promise((resolve,reject) => {
            setTimeout(() => {
              resolve(books[req.params.isbn])
         },600)})
         myPromise.then((successMessage) => {
            res.send(JSON.stringify(book));
        })  
  
});

//  Get book review
public_users.get('/review/:isbn',function (req, res) {
    let review=""
    for (var i=1; i<Object.keys(books).length+1; i++){    
        if(books[i]['title']==req.params.title) {
            review=books[i]['review']
          }
        }
        return res.send(books[req.params.isbn]['review'])
});

module.exports.general = public_users;
