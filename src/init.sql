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
    likes       INT                      DEFAULT 0,
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
