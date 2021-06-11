const express = require('express')
const bodyParser = require('body-parser')
const app = express()
const summaryRouter = require('./routes/summaryReport')
const monthlyRouter = require('./routes/monthlyReport')
const filterName = require('./routes/filterName')
const cors = require('cors')

app.use(bodyParser.urlencoded({extended : true} )); 
app.use(bodyParser.json());
app.use(cors())
app.use('/summary', summaryRouter)
app.use('/monthly',monthlyRouter)
app.use('/filter',filterName)

const server = app.listen(process.env.PORT || 5000, () => {
    const host = server.address().address
    const port = server.address().port
    console.log(`app listening at http://${host}:${port}`);
})