const express = require('express')
const { pool } = require('mssql')
const router = express.Router()
const { poolPromise } = require('../connection')

router.get('/', async (req , res) =>{
    try{
        const pool = await poolPromise
        var date = new Date()
        var year = date.getFullYear()
        var month = date.getMonth()
        const result = await pool.request()
                .query(`select DAY(CreatedDate) as CreatedDate, DisplayName from bot where MONTH(CreatedDate) = ${month} and YEAR(CreatedDate) = ${year}`)
                
                var props = result.recordset
                var output = [...props.reduce( (mp, o) => {
                    const key = JSON.stringify([o.CreatedDate, o.DisplayName]);
                    if (!mp.has(key)) mp.set(key, { ...o, count: 0 });
                    mp.get(key).count++;
                    return mp;
                    }, new Map).values()];
                    return res.status(200).send(output)
           
    }catch(err) {
        res.status(500)
        res.send(err.message)
    }
})


module.exports = router