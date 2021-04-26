const express = require('express')
const { pool } = require('mssql')
const router = express.Router()
const { poolPromise } = require('../connection')

router.get('/:month', async (req , res) =>{
    try{
        const pool = await poolPromise
        const {month} = req.params

        const result = await pool.request()
                .query(`select * from Bot where MONTH(CreatedDate) = ${month}`)

            res.json(result.recordset)
    }catch(err) {
        res.status(500)
        res.send(err.message)
    }
})
module.exports = router