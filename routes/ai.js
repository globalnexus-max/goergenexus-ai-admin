const express = require('express');
const router = express.Router();
const { verifyToken } = require('../middleware/auth');
const AIService = require('../services/aiService');

// Ask AI tutor a question
router.post('/ask', verifyToken, async (req, res) => {
  try {
    const { question, context } = req.body;
    if (!question) {
      return res.status(400).json({ error: 'Question required' });
    }

    const response = await AIService.askTutor(question, context);
    res.json({ answer: response });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'AI service error' });
  }
});

// Generate quiz
router.post('/generate-quiz', verifyToken, async (req, res) => {
  try {
    const { topic, difficulty, questionCount } = req.body;
    const quiz = await AIService.generateQuiz(topic, difficulty || 'medium', questionCount || 5);
    res.json(quiz);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Quiz generation failed' });
  }
});

// Generate lesson plan
router.post('/lesson-plan', verifyToken, async (req, res) => {
  try {
    const { topic, grade, duration } = req.body;
    const plan = await AIService.generateLessonPlan(topic, grade, duration || 45);
    res.json(plan);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Lesson plan generation failed' });
  }
});

module.exports = router;
