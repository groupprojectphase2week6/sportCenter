const router = require('express').Router()

const userRouting = require('./userRouter')

router.use('/users',userRouting)


module.exports = router