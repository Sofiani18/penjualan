const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const app = express();
const path = require("path");
const cookieParser = require('cookie-parser');

const PORT = process.env.PORT || 8082;

app.use(cors());
app.use(express.json());
app.use(cookieParser());
app.use(bodyParser.urlencoded({
    extended : true
}));
app.use(require("./routers/index"));

app.use((req,res,next) => {
    res.status(200).json({
        key : "value"
    });
});
app.use((req,res,next)=> {
    const error = new Error("not found");
    error.status = 404;
    next(error);
});
app.use((error,req,res,next) => {
    res.status(error.status || 500).json({
        error : error.message
    });
});

app.listen(PORT, () => {
    console.log(`server running in http://localhost:${PORT}`);
});
