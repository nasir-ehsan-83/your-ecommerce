import express from "express";

const app = express();

const PORT = process.env.PORT || 4000;

app.get('/', (req, res) => {
    res.status(200).json({
        "message": "successfully runed"
    });
});

app.listen(PORT, (err) => {
    if (err) {
        console.error(err);
    }

    console.log(`Server running on ${PORT}`);
});