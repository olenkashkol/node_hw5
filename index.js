const express = require('express')
const mongoose = require('mongoose')

const configs = require("./configs/configs")
const {userRouter} = require("./routers")
mongoose.connect(configs.MONGO_URL, { useUnifiedTopology: true })

const app = express()
app.use(express.json())

app.use('/users', userRouter)

app.use('*', (req, res) => {
    res.status(404).json('Router not found')
})

app.use((err,req,res,next)=>{
    res
        .status(err.status || 500)
        .json({
            error:err.message||'Unknown error',
            code:err.status||500
        })
})

app.listen(configs.PORT, async () => {
    console.log(`Started on port ${configs.PORT}`)
})


