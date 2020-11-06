const mongoose = require('mongoose');


const connectDb = async () => {
    try {
        
        const conn = await mongoose.connect('mongodb+srv://proshopdb:SbNTjyr8bu90TzP8@cluster0.q7vm8.mongodb.net/proshop?retryWrites=true&w=majority' ,
        {
            useNewUrlParser : true ,
            useCreateIndex : true,
            useUnifiedTopology: true,
            useFindAndModify : false
        })

        console.log(`MongoDb Connected ${conn.connection.host}`.cyan.underline.bold)
    } catch (err) {
        console.log(`Error ${err.message}`.red)
        process.exit(1);
    }
}

module.exports = connectDb ;