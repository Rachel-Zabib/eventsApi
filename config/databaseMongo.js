let mongoose=require("mongoose");
require("dotenv").config()

mongoose.connect(`mongodb+srv://dbRachel:${process.env.MONGODB_PASS}@cluster0.nq9ib.mongodb.net/EmployeesDB?retryWrites=true&w=majority`,{  useNewUrlParser: true,useUnifiedTopology: true,useCreateIndex: true})

mongoose.connection.on("connected",()=>{
    console.log("mongo db connected");
})