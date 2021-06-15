const express = require('express')
const { pool } = require('mssql')
const router = express.Router()
const { poolPromise } = require('../connection')

router.get('/', async (req, res)=>{
    try{
        const pool  = await poolPromise
        const result  = await pool.request()
            .query(`select distinct(DisplayName) from Bot`)
            console.log(result.recordset);
            res.json(result.recordset)
    }catch(err){
        res.status(500)
        res.send(err.message)
    }
})


module.exports = router