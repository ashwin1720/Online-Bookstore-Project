const express = require('express');

const router = express.Router();
const usersData = require('../data/authors');
// const usersData = data.users;

router.get('/', async (req, res) => {
    try {
      if(!req.session.user){
        return res.render('users/author_login',{titleName:'Author Login'})
      }if(req.session.user && req.session.user.usertype ==="author"){
        return res.render('users/author_index',{titleName:'Author Main Page'})
      }
     } catch (error) {
      res.status(500).json({error:error})
    }
  });

  router.post('/', async (req, res) => {
  

    try {
      let requestBody = req.body;
      let error =[]

      if(!requestBody.username || !requestBody.password){
        error.push('Passowrd or username cannot be empty')
        res.status(400).render('users/author_login', {errors:error, titleName:'Login' ,hasErrors: true,});
        return;
      }

      if(requestBody.username.length<4){
        error.push('username should be atleast 4 characters')
      
        return res.status(400).render('users/author_login', {
          errors: error,
          titleName:'Login',
          hasErrors: true,
          });
       
      }

      if(hasWhiteSpace(requestBody.username)){
        error.push('username cannot have spaces')
        
        return res.render('users/author_login', {
          errors: error,
          titleName:'Login',
          hasErrors: true,
          });
        
      } 

      function hasWhiteSpace(s) {
        return /\s/g.test(s);
       
      }

      let usernameLower = requestBody.username.toLowerCase();

      if (!usernameLower.match(/^[0-9a-z]+$/)){
        error.push('username should be alphanumeric')
        return res.status(400).res.render('users/author_login', {
          errors: error,
          titleName:'Login',
          hasErrors: true,
          });
      
      } 

      if(requestBody.password.length<6){
        error.push('password should be atleast 6 characters')
       
        return res.status(400).render('users/author_login', {
          errors: error,
          titleName:'Login',
          hasErrors: true,
          });

        }
        
        const {username,password} = requestBody;
        const newUser = await usersData.checkUser(username,password)
       

        if(newUser.authenticated){
          const usertype ="author"
          req.session.user ={username:username,usertype:usertype};
           res.redirect('/author_index')
      
        }
        
     
    } catch (error) {
      res.render('users/author_login',{errors:error,hasErrors:true})
    }
  })  
module.exports = router;