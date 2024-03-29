const express = require("express");
const cors=require('cors')
const app=express()

const rootRouter=require('./routes/index')


app.use(cors())
app.use(express.json())
app.use('/api/v1',rootRouter)

const PORT=8000;

app.listen(PORT, ()=>{
    console.log(`Server is running on port ${PORT}`)
})

