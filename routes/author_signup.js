const express = require('express');

const xss = require('xss');
const router = express.Router();
const data = require('../data/authors');
module.exports = router;

async function check(str, res){
    if(str.length==0){
      return false;
      }
    
    let chkEmpty=0
    for(let j=0;j<str.length;j++){
        if(str[j]==' '){
            chkEmpty=0;
        }
        else{
            chkEmpty=1
            break;
        }
    }
    if (chkEmpty==0) {
    return false;
  }

  }

  router.get('/', async (req, res) => {
    try {
      if(!xss(req.session.user)){
        return res.render('users/author_signup',{titleName:'Author Signup'})
      }if(xss(req.session.user) && xss(req.session.user.usertype) ==="author"){
        return res.render('users/author_index',{titleName:'Author Main Page'})
      }
     } catch (error) {
      res.status(500).json({error:error})
    }
  });

  router.post('/', async (req, res) => {
      try {
        let un = xss(req.body.username)
        let pw = xss(req.body.password)
        let authorName = xss(req.body.name)
  
          if(typeof(un)!='string' || typeof(pw)!='string'  || typeof(authorName)!='string')
          {
            res.status(400).render('users/author_signup', {notString:true, titleName:'Signup' });
            return;
          }
  
          let bool_un, bool_pw
          bool_un = await check(un, res)
          bool_pw = await check(pw, res)
          if(bool_un===false){

            res.status(400).render('users/author_signup', {isEmptyUn:true, titleName:'Signup'});
            return;
          }
          if(bool_pw===false){
              res.status(400).render('users/author_signup', {isEmptyPw:true, titleName:'Signup'});
              return;
          }
          let bool1 = await data.createUser(un,authorName, pw)
          if(bool1===false){
            res.render('users/author_signup', {already:true})
          }
          if(bool1['userInserted']===true){
            console.log('Success !!!')
            res.redirect('/author_login')
          }
          
      } catch (e) {
        res.status(500).render('users/author_signup',{hasErrors:true, errors:e});
        return;
      
      }
  
    });
  