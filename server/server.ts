import { Request, Response } from "express";
import OpenAI from 'openai';

require('dotenv').config();

const express = require('express');
const app = express();

const cors = require('cors');

app.use(cors())
app.use(express.json());
app.use(express.urlencoded());

const openai = new OpenAI({
    apiKey: process.env['OPENAI_API_KEY'],
});

app.post('/api/send-animation-request', async (req: Request, res: Response) => {
    var animationName: string = req.body.animationName

    const chatCompletion = await openai.chat.completions.create({
        messages: [
            { role: 'system', content: 'You must generate a CSS animation with the given description. Dont write anything else other than the code itself. only write the @keyframes. dont write ``` or anything like that' },
            { role: 'user', content: animationName }
        ],
        model: 'gpt-3.5-turbo',
    });

    var response: string | null = chatCompletion.choices[0].message.content

    if (response != null)
        res.send(response)
    else
        res.send("Error")
})

app.listen(process.env.PORT, () => {
    console.log("Server is listening on port " + process.env.PORT);
})