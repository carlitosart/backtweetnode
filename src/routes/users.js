const express = require('express');
const router = express.Router();


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
