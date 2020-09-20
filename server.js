import express from 'express';
import bodyParser from 'body-parser';
import bcrypt from 'bcrypt-nodejs';
import cors from 'cors';
import knex from 'knex';


import register from './controllers/register';
import signIn from './controllers/signIn';
import profile from './controllers/profile';
import image from './controllers/image';

////--exec babel-node

const db = knex({
    client: 'pg',   
    //where this database lives
    connection: {
      host : '127.0.0.1', // basically local host
      user : 'postgres',
      password : 'whiteTiger',
      database : 'smart-brain'
    }
  });

// db.select('*').from('users').then(data =>{
//     console.log(data);
// });

const app=express()

app.use(bodyParser.json())
app.use(cors())


app.get('/',(req,res)=>{
    res.send('it is working');
})

app.post('/SignIn',(req,res) => {signIn.handleSignIn(req,res,db,bcrypt)})
  
//                                 Dependency injection
app.post('/Register',(req,res) => {register.handleRegister(req,res,db,bcrypt)})

//for future devs probably   {profile.handleProfileGet(req,res,db)} 
// we are running handleProfileGet with db and when profile gets hit we are passing req res , so running the function again. So that this order is the same as the order in the profile.js
// first we execute handleProfileGet with db and when profile gets a hit , it automatically gets req and res so we run that. So first handleProfileGet(db) gets run and req and res gets called with profile
app.get('/profile/:id', profile.handleProfileGet(db) ) // we are first running this function with db and it automatically recieves req and res. so first this func gets run and req and res gets called.


app.put('/image',(req,res)=> {image.handleImage(req,res,db)})

app.post('/imageUrl',(req,res)=> {image.handleApiCall(req,res)})

// bcrypt.hash(password, null, null, function(err, hash) {
//     console.log(hash);
// }); 

app.listen(process.env.PORT || 3000,()=>{
    console.log('app is running on port', process.env.PORT);
})




/*
Endpoints
/ --> res = this is working
why do we have POST for signin when we already have the account?because we want the password to e in the request body and not the query string
/SigIn --> POST success/fail
/register -->  POST = return the new user obj
/profile/:userId --> GET = user
/image --> PUT --> return whatever we have updated(user)

*/