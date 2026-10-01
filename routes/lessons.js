const express = require('express');
const router = express.Router();
const { pool } = require('../config/database');
const { verifyToken, checkRole } = require('../middleware/auth');

// Get lessons by course
router.get('/course/:courseId', async (req, res) => {
  try {
    const result = await pool.query(
      'SELECT id, title, description, course_id, order_index, created_at FROM lessons WHERE course_id = $1 ORDER BY order_index',
      [req.params.courseId]
    );
    res.json(result.rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Create lesson (teacher only)
router.post('/', verifyToken, checkRole(['admin', 'teacher']), async (req, res) => {
  try {
    const { title, description, course_id, content, order_index } = req.body;
    const result = await pool.query(
      'INSERT INTO lessons (title, description, course_id, content, order_index) VALUES ($1, $2, $3, $4, $5) RETURNING *',
      [title, description, course_id, content, order_index || 1]
    );
    res.status(201).json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Mark lesson as complete
router.post('/:lessonId/complete', verifyToken, async (req, res) => {
  try {
    const result = await pool.query(
      'INSERT INTO student_progress (student_id, lesson_id, completed, score) VALUES ($1, $2, $3, $4) ON CONFLICT (student_id, lesson_id) DO UPDATE SET completed = $3 RETURNING *',
      [req.user.id, req.params.lessonId, true, req.body.score || 100]
    );
    res.json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
