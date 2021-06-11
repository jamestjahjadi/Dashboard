const express = require('express')
const { pool } = require('mssql')
const router = express.Router()
const { poolPromise } = require('../connection')

router.get('/', async (req, res)=>{
    try{
        const pool  = await poolPromise
        const{month, name, year} = req.query
        console.log(month);
        console.log(name);
        console.log();
        const result  = await pool.request()
            .query(`select DAY(CreatedDate) as CreatedDate, DisplayName from bot where YEAR(CreatedDate) = ${year} and MONTH(CreatedDate) = ${month} and DisplayName = '${name}'`)
            var props = result.recordset
            console.log(props);
            var output = [...props.reduce( (mp, o) => {
                const key = JSON.stringify([o.CreatedDate, o.DisplayName]);
                if (!mp.has(key)) mp.set(key, { ...o, count: 0 });
                mp.get(key).count++;
                return mp;
                }, new Map).values()];
                return res.status(200).send(output)
    }catch(err){
        res.status(500)
        res.send(err.message)
    }
})


module.exports = router