# database

## Schema

Our database's schema is defined by the following:

```postgresql
CREATE TABLE users
(
    user_id       SERIAL PRIMARY KEY,
    username      VARCHAR(50) UNIQUE  NOT NULL,
    email         VARCHAR(255) UNIQUE NOT NULL,
    password_hash VARCHAR(255)        NOT NULL,
    display_name  VARCHAR(100),
    bio           TEXT,
    avatar_url    VARCHAR(255),
    created_at    TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at    TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE roles
(
    role_id     SERIAL PRIMARY KEY,
    role_name   VARCHAR(50) UNIQUE NOT NULL,
    description TEXT
);

CREATE TABLE user_roles
(
    user_id INT REFERENCES users (user_id) ON DELETE CASCADE,
    role_id INT REFERENCES roles (role_id) ON DELETE CASCADE,
    PRIMARY KEY (user_id, role_id)
);

CREATE TABLE categories
(
    category_id SERIAL PRIMARY KEY,
    name        VARCHAR(100) UNIQUE NOT NULL,
    description TEXT,
    created_at  TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE threads
(
    thread_id   SERIAL PRIMARY KEY,
    category_id INT          REFERENCES categories (category_id) ON DELETE SET NULL,
    user_id     INT          REFERENCES users (user_id) ON DELETE SET NULL,
    title       VARCHAR(255) NOT NULL,
    created_at  TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at  TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    is_locked   BOOLEAN                  DEFAULT FALSE,
    is_sticky   BOOLEAN                  DEFAULT FALSE
);

CREATE TABLE posts
(
    post_id        SERIAL PRIMARY KEY,
    thread_id      INT REFERENCES threads (thread_id) ON DELETE CASCADE,
    user_id        INT  REFERENCES users (user_id) ON DELETE SET NULL,
    parent_post_id INT REFERENCES posts (post_id) ON DELETE CASCADE,
    content        TEXT NOT NULL,
    likes          INT                      DEFAULT 0,
    created_at     TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at     TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE attachments
(
    attachment_id SERIAL PRIMARY KEY,
    post_id       INT REFERENCES posts (post_id) ON DELETE CASCADE,
    file_url      VARCHAR(255) NOT NULL,
    file_type     VARCHAR(50),
    file_size     INT,
    uploaded_at   TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE private_messages
(
    message_id  SERIAL PRIMARY KEY,
    sender_id   INT REFERENCES users (user_id) ON DELETE CASCADE,
    receiver_id INT REFERENCES users (user_id) ON DELETE CASCADE,
    subject     VARCHAR(255),
    body        TEXT NOT NULL,
    sent_at     TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    is_read     BOOLEAN                  DEFAULT FALSE
);
```

For performance reasons, we utilize the following indexes:

```postgresql
CREATE INDEX idx_threads_category_id ON threads (category_id);
CREATE INDEX idx_posts_thread_id_created_at ON posts (thread_id, created_at);
CREATE INDEX idx_thread_tags_tag_id ON thread_tags (tag_id);
```

For text search, we utilize the following index:

```postgresql
ALTER TABLE posts
    ADD COLUMN tsv_content tsvector GENERATED ALWAYS AS (to_tsvector('english', content)) STORED;

CREATE INDEX idx_posts_tsv_content ON posts USING GIN (tsv_content);
```

## Examples

To Fetch Thread with Posts:

```postgresql
SELECT t.thread_id,
       t.title,
       t.created_at,
       u.username   AS author,
       p.post_id,
       p.content,
       p.created_at AS post_created_at
FROM threads t
         JOIN users u ON t.user_id = u.user_id
         LEFT JOIN posts p ON t.thread_id = p.thread_id
WHERE t.thread_id = $1
ORDER BY p.created_at ASC;
```

To Search Posts:

```postgresql
SELECT p.post_id,
       p.content,
       p.created_at,
       u.username
FROM posts p
         JOIN users u ON p.user_id = u.user_id
WHERE p.tsv_content @@ plainto_tsquery('search terms')
ORDER BY p.created_at DESC
LIMIT 50;
```
