-- First clear all existing data
TRUNCATE roles, users, user_roles, categories, threads, posts, attachments CASCADE;

-- 1. Populate roles table
INSERT INTO roles (role_name, description)
VALUES ('admin', 'Administrator with full access to all features'),
       ('moderator', 'Can moderate discussions and manage content'),
       ('member', 'Regular forum member');

-- 2. Populate users table
INSERT INTO users (username, email, password_hash, display_name, bio, avatar_url)
VALUES ('john_doe', 'john@example.com', '$2a$10$Vb9VkC3XTfNS1xPWN1XFxOsH3NVzwlO7DkqjA7ZbCO7HLIq.UHrIe', 'John Doe',
        'Database enthusiast and software developer', 'https://example.com/avatars/john.png'),
       ('sarah_smith', 'sarah@example.com', '$2a$10$QX9LyNsZBcMxQogJ4qfCVeleKcUyQy.P0x4XSbXWf/lDHbmXxTgWW',
        'Sarah Smith', 'PostgreSQL expert with 10 years of experience', 'https://example.com/avatars/sarah.png'),
       ('tech_guru', 'guru@example.com', '$2a$10$7W.J/fmHLO6Rm8C5HW9kBeGg4kLWL2tVgvScs.oQKW75Uc.ZcXXji', 'Tech Guru',
        'Technology consultant specializing in database optimization', 'https://example.com/avatars/guru.png'),
       ('data_wizard', 'wizard@example.com', '$2a$10$GQoVYNeH6AzEIJOYW.mHi.f.qRezrKMVIleMJxQkfZJA4xU8.FGxm',
        'Data Wizard', 'Data scientist with a passion for efficient database design',
        'https://example.com/avatars/wizard.png'),
       ('alice_johnson', 'alice@example.com', '$2a$10$Xr0s3FZXoa3JzMeVW5lz1OlMQD3POYRMj5tTdt4R1NRbKnLsvLyHu',
        'Alice Johnson', 'Full-stack developer interested in database architectures',
        'https://example.com/avatars/alice.png'),
       ('bob_brown', 'bob@example.com', '$2a$10$jWMmKf5vl.d/uxjYXgXCReQpDLJ/LwNlZ/lgQLUKCB/HvFIrjaCIi', 'Bob Brown',
        'DevOps engineer focusing on database performance', 'https://example.com/avatars/bob.png'),
       ('carol_white', 'carol@example.com', '$2a$10$Mx8EQftODWQwbzYZ5MCHG.xdCL3UJbDEuIH3n1nIRAw6OQhIpi.1.',
        'Carol White', 'Back-end developer with expertise in query optimization',
        'https://example.com/avatars/carol.png'),
       ('dave_green', 'dave@example.com', '$2a$10$uKRl2nbKxfuBdvdvLc/bQeeUGlxuRGdmeGJtYz8TXFqnux5xyJZ4y', 'Dave Green',
        'Cloud architect specializing in distributed database systems', 'https://example.com/avatars/dave.png'),
       ('emma_black', 'emma@example.com', '$2a$10$kp9c0jtdyqFX9zyNtJH.KuzSP0dkhV2Vy/vg/4/9Bw5V5xVGLgZJO', 'Emma Black',
        'Systems analyst with a focus on database security', 'https://example.com/avatars/emma.png'),
       ('frank_lee', 'frank@example.com', '$2a$10$Suf3BnApbiZ3mFsK1Dmp7e1lXJ6VWyxZZDiuPXlV8Mbl6LZSULpWe', 'Frank Lee',
        'Enterprise architect with experience in large-scale database deployments',
        'https://example.com/avatars/frank.png'),
       ('grace_kim', 'grace@example.com', '$2a$10$JuNpHqIDZZ7yeAJUGFy5c.2koxRcx9fakA9FyJRvJ2KQtLNTdKoPi', 'Grace Kim',
        'Database administrator with a specialty in performance tuning', 'https://example.com/avatars/grace.png');

-- 3. Populate categories table
INSERT INTO categories (name, description)
VALUES ('PostgreSQL', 'Discussions about PostgreSQL database management system'),
       ('Database Design', 'Topics related to database design principles and best practices'),
       ('Performance Tuning', 'Optimizing database performance and query execution'),
       ('Database Security', 'Security concerns and solutions for database systems'),
       ('Tools & Utilities', 'Software tools and utilities for database management');

-- 4. Assign roles to users using a safer approach with joins
INSERT INTO user_roles (user_id, role_id)
SELECT u.user_id, r.role_id
FROM (VALUES ('john_doe', 'admin'),
             ('sarah_smith', 'moderator'),
             ('tech_guru', 'moderator'),
             ('data_wizard', 'member'),
             ('alice_johnson', 'member'),
             ('bob_brown', 'member'),
             ('carol_white', 'member'),
             ('dave_green', 'member'),
             ('emma_black', 'member'),
             ('frank_lee', 'member'),
             ('grace_kim', 'moderator')) AS data(username, role_name)
         JOIN users u ON data.username = u.username
         JOIN roles r ON data.role_name = r.role_name;

-- 5. Populate threads table using a safer approach with joins
INSERT INTO threads (category_id, user_id, title, is_locked, is_sticky)
SELECT c.category_id, u.user_id, t.title, t.is_locked, t.is_sticky
FROM (VALUES ('PostgreSQL', 'john_doe', 'PostgreSQL Performance Tuning Tips', FALSE, TRUE),
             ('Database Design', 'alice_johnson', 'Database Normalization Discussion', FALSE, FALSE),
             ('Performance Tuning', 'emma_black', 'Time-series Database Options Comparison', FALSE, FALSE),
             ('Database Security', 'tech_guru', 'Best Practices for Database Security', FALSE, TRUE),
             ('Tools & Utilities', 'carol_white', 'Recommended Tools for PostgreSQL Administration', FALSE,
              FALSE)) AS t(category_name, username, title, is_locked, is_sticky)
         JOIN categories c ON t.category_name = c.name
         JOIN users u ON t.username = u.username;

-- Get a list of thread IDs for reference
CREATE TEMPORARY TABLE thread_lookup AS
SELECT t.thread_id, t.title
FROM threads t;

-- 6. Populate posts table using a safer approach with joins
-- First, insert top-level posts
WITH post_data AS (SELECT t.thread_id,
                          u.user_id,
                          pd.content,
                          pd.likes
                   FROM (VALUES ('PostgreSQL Performance Tuning Tips', 'john_doe',
                                 'This is the first post in thread 1. I have a question about PostgreSQL performance tuning. We have a database with tables containing millions of rows, and some of our queries are starting to slow down. What are some general tips for improving performance?',
                                 5),
                                ('PostgreSQL Performance Tuning Tips', 'sarah_smith',
                                 'Here''s another top-level post in thread 1. Has anyone tried using EXPLAIN ANALYZE to identify bottlenecks? I''ve found it extremely helpful for pinpointing issues.',
                                 3),
                                ('Database Normalization Discussion', 'alice_johnson',
                                 'I''m starting a new discussion about database normalization. How far do you typically normalize your schemas? Do you always aim for BCNF or do you stop at 3NF for practical reasons?',
                                 10),
                                ('Database Normalization Discussion', 'bob_brown',
                                 'Normalization is important, but don''t forget about the performance implications. Sometimes denormalization makes sense for read-heavy workloads.',
                                 12),
                                ('Time-series Database Options Comparison', 'emma_black',
                                 'Has anyone used TimescaleDB for time-series data? We''re collecting IoT sensor data and considering different options.',
                                 15),
                                ('Time-series Database Options Comparison', 'frank_lee',
                                 'TimescaleDB has been great for our IoT application. We''re handling about 10,000 data points per second without any issues.',
                                 11)) AS pd(thread_title, username, content, likes)
                            JOIN thread_lookup t ON pd.thread_title = t.title
                            JOIN users u ON pd.username = u.username)
INSERT
INTO posts (thread_id, user_id, parent_post_id, content, likes)
SELECT thread_id, user_id, NULL, content, likes
FROM post_data;

-- Create a lookup table for parent posts
CREATE TEMPORARY TABLE post_lookup AS
SELECT p.post_id, p.content, u.username, t.title AS thread_title
FROM posts p
         JOIN users u ON p.user_id = u.user_id
         JOIN threads t ON p.thread_id = t.thread_id;

-- Insert replies (using partial content to identify parent posts)
WITH reply_data AS (SELECT t.thread_id,
                           u.user_id,
                           p.post_id AS parent_post_id,
                           rd.content,
                           rd.likes
                    FROM (VALUES ('PostgreSQL Performance Tuning Tips', 'tech_guru', 'This is the first post',
                                  'I can help with PostgreSQL performance. What specific issues are you facing? Are you seeing slow performance on specific queries or general system slowness?',
                                  7),
                                 ('PostgreSQL Performance Tuning Tips', 'john_doe', 'I can help with PostgreSQL',
                                  'My queries are taking too long when joining large tables. For example, we have a customers table with 2 million rows and an orders table with 15 million rows.',
                                  2),
                                 ('PostgreSQL Performance Tuning Tips', 'data_wizard', 'I can help with PostgreSQL',
                                  'Have you tried adding indexes to the columns used in your JOIN conditions? That''s usually the first step in optimizing join performance.',
                                  8),
                                 ('PostgreSQL Performance Tuning Tips', 'john_doe', 'Have you tried adding indexes',
                                  'Not yet, I''ll try that. Do you have any specific index types you recommend for this scenario? Would a B-tree index be appropriate?',
                                  1),
                                 ('Database Normalization Discussion', 'carol_white', 'I''m starting a new discussion',
                                  'I agree, 3NF is usually sufficient for most applications. Going further can sometimes create too many joins for common queries.',
                                  6),
                                 ('Database Normalization Discussion', 'alice_johnson', 'I agree, 3NF is usually',
                                  'What about BCNF? When would you recommend going beyond 3NF?', 4),
                                 ('Database Normalization Discussion', 'dave_green', 'What about BCNF?',
                                  'BCNF is useful when you have multiple candidate keys that can lead to anomalies. In practice, I rarely find cases where 3NF isn''t enough.',
                                  9),
                                 ('Time-series Database Options Comparison', 'grace_kim', 'Has anyone used TimescaleDB',
                                  'How does the performance compare to InfluxDB? We''re currently using Influx but considering a switch.',
                                  3),
                                 ('Time-series Database Options Comparison', 'emma_black',
                                  'How does the performance compare',
                                  'That''s exactly what I was wondering. Any benchmarks between the two for similar workloads?',
                                  2),
                                 ('Time-series Database Options Comparison', 'frank_lee',
                                  'That''s exactly what I was wondering',
                                  'We found TimescaleDB to be more flexible with complex queries while maintaining good performance. InfluxDB might be faster for simple queries, but we needed SQL compatibility.',
                                  7)) AS rd(thread_title, username, parent_content, content, likes)
                             JOIN thread_lookup t ON rd.thread_title = t.title
                             JOIN users u ON rd.username = u.username
                             JOIN post_lookup p
                                  ON p.thread_title = rd.thread_title AND p.content LIKE (rd.parent_content || '%'))
INSERT
INTO posts (thread_id, user_id, parent_post_id, content, likes)
SELECT thread_id, user_id, parent_post_id, content, likes
FROM reply_data;

-- 7. Add attachments using post IDs safely
WITH attachment_data AS (SELECT p.post_id,
                                ad.file_url,
                                ad.file_type,
                                ad.file_size
                         FROM (VALUES ('john_doe', 'This is the first post',
                                       'https://example.com/files/query_example.sql', 'text/plain', 2048),
                                      ('john_doe', 'My queries are taking',
                                       'https://example.com/files/execution_plan.png', 'image/png', 153600),
                                      ('alice_johnson', 'I''m starting a new discussion',
                                       'https://example.com/files/normalization_cheatsheet.pdf', 'application/pdf',
                                       512000),
                                      ('emma_black', 'Has anyone used TimescaleDB',
                                       'https://example.com/files/timescale_diagram.jpg', 'image/jpeg', 204800),
                                      ('frank_lee', 'We found TimescaleDB',
                                       'https://example.com/files/benchmark_results.xlsx',
                                       'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
                                       307200)) AS ad(username, post_content, file_url, file_type, file_size)
                                  JOIN post_lookup p
                                       ON p.username = ad.username AND p.content LIKE (ad.post_content || '%'))
INSERT
INTO attachments (post_id, file_url, file_type, file_size)
SELECT post_id, file_url, file_type, file_size
FROM attachment_data;

-- Clean up temporary tables
DROP TABLE IF EXISTS thread_lookup;
DROP TABLE IF EXISTS post_lookup;

-- Verify data with summary query
SELECT c.name                    AS category,
       t.title                   AS thread,
       u.username                AS thread_starter,
       COUNT(DISTINCT p.post_id) AS post_count,
       MAX(p.created_at)         AS last_post_date
FROM categories c
         JOIN
     threads t ON c.category_id = t.category_id
         JOIN
     users u ON t.user_id = u.user_id
         JOIN
     posts p ON t.thread_id = p.thread_id
GROUP BY c.name, t.title, u.username
ORDER BY c.name, last_post_date DESC;