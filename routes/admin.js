const express = require('express');
const router = express.Router();
const { pool } = require('../config/database');
const { verifyToken, checkRole } = require('../middleware/auth');

// Get dashboard analytics
router.get('/analytics', verifyToken, checkRole(['admin']), async (req, res) => {
  try {
    const stats = await Promise.all([
      pool.query('SELECT COUNT(*) as total FROM users WHERE role = \'student\''),
      pool.query('SELECT COUNT(*) as total FROM courses'),
      pool.query('SELECT COUNT(*) as total FROM lessons'),
      pool.query('SELECT AVG(score) as average_score FROM student_progress WHERE score IS NOT NULL')
    ]);

    res.json({
      total_students: stats[0].rows[0].total,
      total_courses: stats[1].rows[0].total,
      total_lessons: stats[2].rows[0].total,
      average_score: parseFloat(stats[3].rows[0].average_score || 0).toFixed(2)
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Get system logs
router.get('/logs', verifyToken, checkRole(['admin']), async (req, res) => {
  try {
    const result = await pool.query(
      'SELECT * FROM system_logs ORDER BY created_at DESC LIMIT 100'
    );
    res.json(result.rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
