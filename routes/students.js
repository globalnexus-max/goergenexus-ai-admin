const express = require('express');
const router = express.Router();
const { pool } = require('../config/database');
const { verifyToken, checkRole } = require('../middleware/auth');

// Get all students (admin only)
router.get('/', verifyToken, checkRole(['admin']), async (req, res) => {
  try {
    const result = await pool.query(
      'SELECT id, name, email, grade, created_at FROM users WHERE role = \'student\' ORDER BY created_at DESC'
    );
    res.json(result.rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Get student profile
router.get('/profile/:id', verifyToken, async (req, res) => {
  try {
    const result = await pool.query(
      'SELECT id, name, email, grade, bio, avatar_url, created_at FROM users WHERE id = $1 AND role = \'student\'',
      [req.params.id]
    );
    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Student not found' });
    }
    res.json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Get student progress
router.get('/:id/progress', verifyToken, async (req, res) => {
  try {
    const result = await pool.query(
      `SELECT courses.id, courses.name, COUNT(lessons.id) as total_lessons,
              SUM(CASE WHEN student_progress.completed = true THEN 1 ELSE 0 END) as completed_lessons
       FROM courses
       LEFT JOIN lessons ON courses.id = lessons.course_id
       LEFT JOIN student_progress ON lessons.id = student_progress.lesson_id AND student_progress.student_id = $1
       GROUP BY courses.id, courses.name`,
      [req.params.id]
    );
    res.json(result.rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
