const express = require('express')
const { pool } = require('mssql')
const router = express.Router()
const { poolPromise } = require('../connection')

router.get('/:date', async (req , res) =>{
    try{
       
        const pool = await poolPromise
        const {date} = req.params

        const result = await pool.request()
                .query(`select count (CreatedDate) as count from bot where convert(date, CreatedDate, 111) = '${date}';`)
            res.json(result.recordset)

    }catch(err) {
        res.status(500)
        res.send(err.message)
    }
})
module.exports = router