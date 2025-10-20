# MySQL API

A simple API I built using Express.js and MySQL to test how Create, Read, Update, Delete work with a relational database.  
It connects to a local MySQL instance and lets you add, view, update, and delete users through REST endpoints.

---

## Overview

This project was mainly for learning: setting up a database connection in Node, working with `.env` files, and seeing data flow from a client request to SQL queries and back.  

Endpoints cover full CRUD functionality:
- `POST /users` – Add a new user  
- `GET /users` – Retrieve all users  
- `PUT /users/:id` – Update user info  
- `DELETE /users/:id` – Delete a user  
