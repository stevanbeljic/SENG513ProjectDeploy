-- schema script

-- USE mmgadb;

CREATE DATABASE IF NOT EXISTS mmgadb;
USE mmgadb;

CREATE TABLE IF NOT EXISTS users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    role VARCHAR(10) NOT NULL,
    username VARCHAR(20) UNIQUE NOT NULL,
    password VARCHAR(100) NOT NULL,
    bio VARCHAR(150)
);

CREATE TABLE IF NOT EXISTS friends (
    user1_id INT,
    user2_id INT,
    PRIMARY KEY (user1_id, user2_id),
    FOREIGN KEY (user1_id) REFERENCES users(id),
    FOREIGN KEY (user2_id) REFERENCES users(id)
);

CREATE TABLE IF NOT EXISTS developer (
    developer_id INT PRIMARY KEY,
    FOREIGN KEY (developer_id) REFERENCES users(id)
);

CREATE TABLE IF NOT EXISTS game (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(50) NOT NULL UNIQUE,
    description VARCHAR(400) NOT NULL,
    genre VARCHAR(50) NOT NULL,
    thumbnail VARCHAR(100), -- relative path to image
    appstoreprice DECIMAL(4, 2),
    playstoreprice DECIMAL(4, 2),
    publisher VARCHAR(20),
    author_id INT,
    FOREIGN KEY (author_id) REFERENCES developer(developer_id)
);

CREATE TABLE IF NOT EXISTS discussion (
    discussion_id INT AUTO_INCREMENT PRIMARY KEY,
    title VARCHAR(100),
    description VARCHAR(2500),
    poster_id INT,
    game_id INT,
    post_date DATE NOT NULL,
    FOREIGN KEY (poster_id) REFERENCES users(id),
    FOREIGN KEY (game_id) REFERENCES game(id)
);

CREATE TABLE IF NOT EXISTS comments (
    comment_text VARCHAR(2500),
    comment_ordinal INT AUTO_INCREMENT,
    discussion_id INT NOT NULL,
    poster_id INT NOT NULL,
    FOREIGN KEY (discussion_id) REFERENCES discussion(discussion_id),
    FOREIGN KEY (poster_id) REFERENCES users(id),
    PRIMARY KEY (comment_ordinal),
    UNIQUE (discussion_id, comment_ordinal)
);

CREATE TABLE IF NOT EXISTS friendrequests (
    requestTo INT,
    requestFrom INT, 
    FOREIGN KEY (requestTo) REFERENCES users(id),
    FOREIGN KEY (requestFrom) REFERENCES users(id),
    PRIMARY KEY (requestTo, requestFrom)
);

CREATE TABLE IF NOT EXISTS topgames (
    user_id INT,
    game_id INT,
    FOREIGN KEY (user_id) REFERENCES users(id),
    FOREIGN KEY (game_id) REFERENCES game(id),
    PRIMARY KEY (user_id, game_id)
);

CREATE TABLE IF NOT EXISTS likes (
    user_id INT,
    discussion_id INT,
    FOREIGN KEY (user_id) REFERENCES users(id),
    FOREIGN KEY (discussion_id) REFERENCES discussion(discussion_id),
    PRIMARY KEY (user_id, discussion_id)
);
