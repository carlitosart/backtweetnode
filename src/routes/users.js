const express = require('express');
const router = express.Router();

const bodyparser = require('body-parser');
const jsonparser = bodyparser.json()



const mysqlConnection = require('../database');

router.get('/',(req,res)=>{
    mysqlConnection.query('SELECT * FROM users',(err,rows,fields)=>{
        if(!err){
            res.json(rows);
        }else{
            console.log(err)
        }
    });
});

router.get('/:id',(req,res)=>{
    const {id} = req.params;
    mysqlConnection.query('SELECT * FROM users WHERE user_id = ?',[id],(err,rows,fields)=>{
        if(!err){
            res.json(rows[0]);
        }else{
            console.log(err)
        }
    });
});
router.get('/:id/tweet',(req,res)=>{
    const {id} = req.params;
    mysqlConnection.query('SELECT * FROM tweets WHERE users_user_id = ?',[id],(err,rows,fields)=>{
        if(!err){
            res.json(rows[0]);
        }else{
            console.log(err)
        }
    });
});


router.post('/:id/tweet',jsonparser,(req,res)=>{
    const valores = req.body
    const {id} = req.params;
    /* const query = 'INSERT INTO tweets (tweet_id,text,date,users_user_id) values ('+valores.tweet_id+', '+valores.text+','+id+')'
     */
    //res.json(query);
    mysqlConnection.query('INSERT INTO tweets VALUES ('+valores.tweet_id+', "'+valores.text+'", "'+valores.date+'", '+id+')',[id],(err,rows,fields)=>{

        if(!err){
            res.json({Status: 'TweetCreado'})
        }else{
            console.log(err);
        }
    });
});

//PARA SEGUIR
router.post('/:id/follow',jsonparser,(req,res)=>{
    const valores = req.body
    const {id} = req.params;
    /* const query = 'INSERT INTO tweets (tweet_id,text,date,users_user_id) values ('+valores.tweet_id+', '+valores.text+','+id+')'
     */
    //res.json(query);
    mysqlConnection.query('INSERT INTO follows VALUES ('+id+','+valores.users_user_id1+')',(err,rows,fields)=>{

        if(!err){
            res.json({Status: 'Siguiendo a Usuario'})
        }else{
            console.log(err);
        }
    });
});

//GENERANDO TIMELINE
router.get('/:id/timeline',(req,res)=>{
    const {id} = req.params;
    mysqlConnection.query('SELECT * FROM users WHERE user_id = ?',[id],(err,rows,fields)=>{
        if(!err){
            res.json(rows[0]);
        }else{
            console.log(err)
        }
    });
});



router.post('/',(req,res)=>{
    const {id,username} = req.body;
    const query = `
        CALL userAddOrEdit(?,?);
    `;
    mysqlConnection.query(query,[id,username],(err,rows,fields)=>{
        if(!err){
            res.json({Status: 'Usuario Guardado'})
        } else{
            console.log(err);
        }
    });
});

router.put('/:id',(req,res)=>{
    const {username} = req.body;
    const {id} = req.params;
    const query = 'CALL userAddOrEdit(?,?)';
    mysqlConnection.query(query,[id,username],(err,rows,fields)=>{
        if(!err){
            res.json({status: 'Usuario Actualizado'});
        }else{
            console.log(err);
        }
    });
});

router.delete('/:id',(req,res)=>{
    const {id} = req.params;
    mysqlConnection.query('DELETE FROM users WHERE user_id = ?',[id],(err,rows,fields)=>{
        if(!err){
            res.json({status: 'Usuario Deleteado'});
        }else{
            console.log(err);
        }
    });
});
module.exports = router;
