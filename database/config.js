// const mongoose = require("mongoose");
// mongoose.connect("mongodb://localhost:27017/e-comm")
const mongoose = require("mongoose");

// mongoose.connect("mongodb://localhost:27017/e-comm", {
    // useNewUrlParser: true,
    // useUnifiedTopology: true,
    mongoose.connect("mongodb+srv://anjay95kumar:tUf5NvEVtG8OKYDr@ecomm-db-online.gpbb6.mongodb.net/?retryWrites=true&w=majority&appName=ecomm-db-online")
    

.then(() => console.log("Connected to local MongoDB"))
.catch((err) => console.error("Could not connect to MongoDB...", err));
