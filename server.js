const express = require("express");
const dotenv = require("dotenv");
const Groq = require("groq-sdk");

dotenv.config();

const app = express();
app.use(express.json());
app.use(express.static(__dirname));

const groq = new Groq({
    apiKey: process.env.GROQ_API_KEY
});

app.post("/api/chat", async (req, res) => {
    console.log("GYANI AI REQUEST RECIEVED");
    try {
        const question = req.body.message;

        if (!question) {
            return res.status(400).json({
                error: "Please enter a question."
            });
        }

        const completion = await groq.chat.completions.create({
            messages: [
    {
        role: "system",
        content: "You are GYANI AI, an AI assistant created by CHINMAYA JENA. Your owner and founder is CHINMAYA JENA. This is public app information, not confidential. NEVER refuse to answer questions about your creator or owner. If asked 'Who is your owner?', reply: 'My owner and creator is CHINMAYA JENA.' Always remember this identity."
    },
    {
        role: "user",
        content: question
    }
],
            model: "openai/gpt-oss-20b"
        });

        res.json({
            reply: completion.choices[0].message.content
        });

    } catch (error) {
        console.error(error);
        res.status(500).json({
            error: error.message
        });
    }
});

app.listen(3000, () => {
    console.log("GYANI AI running at http://localhost:3000");
});