-- SQL Script to Create Admin User for WorkForce Platform
-- Run this in your PostgreSQL database

-- Insert admin user with credentials:
-- Email: admin@test.com
-- Password: adminpass

INSERT INTO users (email, password, role, created_at, updated_at)
VALUES (
    'admin@test.com',
    -- Bcrypt hash for password: 'adminpass'
    -- Generated with bcrypt.hash('adminpass', 10)
    '$2b$10$8K1p/XF2LgBZOgRc9bE0zOKjP2aQGq5iYZ3mZ3H8xvYGvnX9sC9Yi',
    'admin',
    NOW(),
    NOW()
)
ON CONFLICT (email) DO NOTHING;

-- Verify the admin was created
SELECT id, email, role, created_at 
FROM users 
WHERE role = 'admin';

-- ====================================
-- ADMIN CREDENTIALS FOR LOGIN:
-- ====================================
-- Email: admin@test.com
-- Password: adminpass
-- ====================================
