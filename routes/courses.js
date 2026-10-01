const express = require('express');
const router = express.Router();
const { pool } = require('../config/database');
const { verifyToken, checkRole } = require('../middleware/auth');

// Get all courses
router.get('/', async (req, res) => {
  try {
    const result = await pool.query(
      'SELECT id, name, description, grade_level, teacher_id, created_at FROM courses ORDER BY created_at DESC'
    );
    res.json(result.rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Create course (admin/teacher only)
router.post('/', verifyToken, checkRole(['admin', 'teacher']), async (req, res) => {
  try {
    const { name, description, grade_level } = req.body;
    const result = await pool.query(
      'INSERT INTO courses (name, description, grade_level, teacher_id) VALUES ($1, $2, $3, $4) RETURNING *',
      [name, description, grade_level, req.user.id]
    );
    res.status(201).json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Get course details
router.get('/:id', async (req, res) => {
  try {
    const result = await pool.query(
      'SELECT * FROM courses WHERE id = $1',
      [req.params.id]
    );
    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Course not found' });
    }
    res.json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
