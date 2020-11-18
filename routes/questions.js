const express = require('express');
const router = express.Router();

// As a DB collection or ORM
const QuestionsService = require('../QuestionsService');
const questionService = new QuestionsService();

function asyncHandler(cb){
    return async (req, res, next) => {
        try {
            await cb(req, res, next);
        } catch(err) {
            next(err);
        }
    };
}

router.get('/', asyncHandler( async (req, res) => {
    const questions = await questionService.questions;
    // res.json(questions);
    res.render('questions', { questions: questions });
}));

router.post('/', asyncHandler( async (req, res) => {
    if(req.body.question && req.body.answer) {
        const question = await questionService.createQuestion({
            question: req.body.question,
            answer: req.body.answer
        });
        res.status(201).json(question);
    } else {
        res.status(400).json({ message: "Question and answer required." });
    }
}));

router.get('/:id', asyncHandler( async (req, res) => {
    const question = await questionService.getQuestion(req.params.id);
    if(question) {
        res.json(question);
    } else {
        res.status(404).json({ message: "Question not found." });
    }
}));

router.put('/:id', asyncHandler( async (req, res) => {
    const question = await questionService.getQuestion(req.params.id);
    if(question) {
        question.question = req.body.question;
        question.author = req.body.author;

        await questionService.updateQuestion(question);
        res.status(204).end();
    } else {
        res.status(404).json({ message: "Question not found." });
    }
}));

router.delete('/:id', asyncHandler( async (req, res) => {
    const question = await questionService.getQuestion(req.params.id);
    if(question) {
        await questionService.updateQuestion(question);
        res.status(204).end();
    } else {
        res.status(404).json({ message: "Question not found." });
    }
}));


module.exports = router;