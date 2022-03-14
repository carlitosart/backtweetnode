const express = require('express');
const router = express.Router();

const mysqlConnection = require('../database');

/* router.get('/tweets',(req,res)=>{
    mysqlConnection.query
}); */

router.get('time/:id',(req,res)=>{
    const {id} =req.params;
    mysqlConnection.query('SELECT * FROM tweets',[id],(err,rows,fields)=>{
        if(!err){
            res.json(rows[0]);
        }else{
            console.log(err)
        }
    });
})