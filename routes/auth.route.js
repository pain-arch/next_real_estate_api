import express from "express";

const router = express.Router();

router.post("/register", (req, res) => {
    res.send("get-posts working!");
});

router.post("/login", (req, res) => {
    res.send("get-posts working!");
});

router.post("/logout", (req, res) => {
    res.send("get-posts working!");
});



export default router;