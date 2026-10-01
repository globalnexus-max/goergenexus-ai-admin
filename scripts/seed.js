const { pool } = require('../config/database');
const bcrypt = require('bcryptjs');

async function seed() {
  try {
    console.log('🌱 Seeding database...');

    // Create admin user
    const adminPassword = await bcrypt.hash('admin123', 10);
    await pool.query(
      'INSERT INTO users (name, email, password, role) VALUES ($1, $2, $3, $4) ON CONFLICT DO NOTHING',
      ['Admin User', 'admin@goergenexus.com', adminPassword, 'admin']
    );

    // Create teacher user
    const teacherPassword = await bcrypt.hash('teacher123', 10);
    await pool.query(
      'INSERT INTO users (name, email, password, role, grade) VALUES ($1, $2, $3, $4, $5) ON CONFLICT DO NOTHING',
      ['Teacher User', 'teacher@goergenexus.com', teacherPassword, 'teacher', '10']
    );

    // Create sample students
    for (let i = 1; i <= 5; i++) {
      const studentPassword = await bcrypt.hash('student123', 10);
      await pool.query(
        'INSERT INTO users (name, email, password, role, grade) VALUES ($1, $2, $3, $4, $5) ON CONFLICT DO NOTHING',
        [`Student ${i}`, `student${i}@goergenexus.com`, studentPassword, 'student', `${9 + (i % 4)}`]
      );
    }

    // Create sample courses
    const courseNames = ['Riyaziyyat', 'İngilis Dili', 'Biologiya', 'Tarix'];
    for (const name of courseNames) {
      await pool.query(
        'INSERT INTO courses (name, description, grade_level, teacher_id) VALUES ($1, $2, $3, $4) ON CONFLICT DO NOTHING',
        [name, `${name} dərsi 9-12 siniflər üçün`, '9-12', 2]
      );
    }

    console.log('✅ Database seeded successfully!');
    process.exit(0);
  } catch (err) {
    console.error('❌ Seeding failed:', err);
    process.exit(1);
  }
}

seed();
