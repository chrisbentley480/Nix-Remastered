# Nix-Remastered
This project is in the process of being ported from PHP to Node.js and also remade.

## About  
### What is this site?  
NixMsg is a messenger service, people can sign up and message each other for free.  

### How does it work?   
Users can login with a username, enter a password and a combination, this data is used to generate RSA keys on the fly, no keys are saved or need to be transported. The username and public key is sent to the server and stored when a user is created. Messages can be sent from one user to another, encryptped with a strong AES-256 key, which is then encrypted with the user's RSA keys. This forms a hybrid encryption model similar to PGP or any other known standards. The server logs a list of usernames, their associated keys, and a list of messages and the users associated.  

### Is it secure?  
No. I mean ideally, but right now it is more of a proof of concept. Nothing here has been vetted by a cryptologist and i'm sure someone smart enough could break it. In fact i'd love if anyone found a way to break it. But even in it's current form i'm sure it would offer much more privacy than using facebook.   

### Why?  
Originally this was going to be a simple project for a class where I had to choose an idea, but turned into an exploration and education of encryption algorithms. Because I couldn't find a framework to do what I wanted originally and was stubborn, I kind of developed my own form of PGP. It's also been interesting and good experience with full stack development.

## Instructions  
Clone git repo:      
$ git clone https://github.com/chrisbentley480/Nix-Remastered.git  

Install express:  
$ npm install express body-parser

Run server:  
$ node server.js    

## SQL Instructions  

Ideally everything could be bundled into an exe, but if you want to set this up yourself, you will need to know how to run a SQL server.

1) Set up a SQL server  

2) Copy contents of data.SQL  

3) Paste into SQL query and execute.   

4) Replace url, password, port of your server in Keys.js  

## Access

Site is served at localhost:3000   
