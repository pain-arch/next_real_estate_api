const express = require('express');

const app = express();

app.use("/api/test", (req, res) => {
    res.send("It working!");
});

app.listen(8000, () => {
    console.log("Server is running on port 8000");
});