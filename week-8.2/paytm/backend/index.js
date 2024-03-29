const express = require("express");
const bodyParser=require('body-parser')
const app=express()
const rootRouter=require('./routes/index')

app.use(bodyParser.json())
app.use('/api/v1',rootRouter)

const PORT=8000;

app.listen(PORT, ()=>{
    console.log(`Server is running on port ${PORT}`)
})

