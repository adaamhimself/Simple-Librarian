# Simple Librarian
  
## Description  
Simple librarian is an application designed to store and maintain users' book collection. 
  
## Features  
Authentication / Authorization
Add / Delete / Update / Find books
  
## Routes  
  
/api/auth/registerUser -> register a new user  
/api/auth/login -> login
  
/api/user/addBook -> add a new book to the collection
/api/user/deleteBook -> delete a book from the collection
/api/user/updateBook -> update a book's details
/api/user/findBooksByAuthor -> find all books by a given author
/api/user/findBooksByGenre -> find all books of a given genre
/api/user/findBooksByTitle -> find a book with a given title
/api/user/findAllBooks -> find all books in the collection

## Frameworks used  
Express, Mongoose, Passport, Jsonwebtoken, bcrypt, dotenv, cors
