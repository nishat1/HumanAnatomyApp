const express = require("express");
const QuizModel = require("../models/quizzes");
const verifyAdmin = require("../util/verifyToken");

const initializeQuizRoutes = (app) => {
    const quizRouter = express.Router();
    app.use('/quiz', quizRouter);

    /* create a quiz */
    quizRouter.post('/', verifyAdmin,  async (req, res, next) => {
        const quiz = new QuizModel(req.body);
        try {
            await quiz.save().then((item) => res.send(item));
        } catch (e) {
            console.error(e);
            return next(e);
        }
    });

    /* get a quiz with id */
    quizRouter.get('/:id', async (req, res, next) => {
        try {
            const quiz = await QuizModel.findById(req.params.id);
            if (quiz === null) {
                throw new Error(`No quiz found with id ${req.params.id}`);
            } else {
                res.status(200);
                await res.json(quiz);
            }
        } catch (e) {
            console.error(e);
            return next(e);
        }
    });

    /* get all the quizzes or by query*/
    quizRouter.get('/', async (req, res, next) => {
        try {
            const quizzes = await QuizModel.find(req.query);
            if (quizzes === null || quizzes.length === 0) {
                res.status(404).send(`No such quizzes found`);
            } else {
                res.status(200);
                await res.json(quizzes);
            }
        } catch (e) {
            console.error(e);
            return next(e);
        }
    });

    /* remove a quiz with the id */
    quizRouter.delete('/:id', verifyAdmin,  async (req, res, next) => {
        const id = req.params.id.trim();
        try {
            const quiz = await QuizModel.findOneAndRemove({_id: id});
            if (quiz === null) {
                throw new Error(`No quiz found with the id ${id}`);
            } else {
                res.status(200).send(`removed the quiz with id ${id}`);
            }
        } catch (e) {
            console.error(e);
            return next(e);
        }
    });
};

module.exports = initializeQuizRoutes;
