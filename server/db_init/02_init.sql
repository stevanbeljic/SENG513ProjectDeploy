-- seeding script
-- Users Seeding
INSERT IGNORE INTO `users` (`id`, `role`, `username`, `password`, `bio`) VALUES (NULL, 'registered', 'bobby1234', '$2b$04$euTPi6HvPUN2iPjJtYz1SO5EKl4NbnTPR6nJE0KngduFGRJDjK5e2', 'I like games!');
INSERT IGNORE INTO `users` (`id`, `role`, `username`, `password`, `bio`) VALUES (NULL, 'registered', 'jill_the_thrill', '$2b$04$euTPi6HvPUN2iPjJtYz1SO5EKl4NbnTPR6nJE0KngduFGRJDjK5e2', 'I really like games!');
INSERT IGNORE INTO `users` (`id`, `role`, `username`, `password`, `bio`) VALUES (NULL, 'developer', 'JimboGames', '$2b$04$euTPi6HvPUN2iPjJtYz1SO5EKl4NbnTPR6nJE0KngduFGRJDjK5e2', 'If youre reading this get a life');
INSERT IGNORE INTO `users` (`id`, `role`, `username`, `password`, `bio`) VALUES (NULL, 'developer', 'PammySpammy', '$2b$04$euTPi6HvPUN2iPjJtYz1SO5EKl4NbnTPR6nJE0KngduFGRJDjK5e2', 'this is my bio');
INSERT IGNORE INTO `users` (`id`, `role`, `username`, `password`, `bio`) VALUES (NULL, 'registered', 'Timmy', '$2b$04$euTPi6HvPUN2iPjJtYz1SO5EKl4NbnTPR6nJE0KngduFGRJDjK5e2', 'this is also my bio');
INSERT IGNORE INTO `users` (`id`, `role`, `username`, `password`, `bio`) VALUES (NULL, 'registered', 'Gerard Terinval', '$2b$04$euTPi6HvPUN2iPjJtYz1SO5EKl4NbnTPR6nJE0KngduFGRJDjK5e2', 'hows this look');
INSERT IGNORE INTO `users` (`id`, `role`, `username`, `password`, `bio`) VALUES (NULL, 'developer', 'Dabella', '$2b$04$euTPi6HvPUN2iPjJtYz1SO5EKl4NbnTPR6nJE0KngduFGRJDjK5e2', 'MAKE MOBILE GREAT AGAIN');
INSERT IGNORE INTO `users` (`id`, `role`, `username`, `password`, `bio`) VALUES (NULL, 'registered', 'BobMarleyEnthusiast', '$2b$04$euTPi6HvPUN2iPjJtYz1SO5EKl4NbnTPR6nJE0KngduFGRJDjK5e2', 'nice');
INSERT IGNORE INTO `users` (`id`, `role`, `username`, `password`, `bio`) VALUES (NULL, 'registered', 'FonkHonkBonk', '$2b$04$euTPi6HvPUN2iPjJtYz1SO5EKl4NbnTPR6nJE0KngduFGRJDjK5e2', 'so nice');
INSERT IGNORE INTO `users` (`id`, `role`, `username`, `password`, `bio`) VALUES (NULL, 'developer', 'Wukonga', '$2b$04$euTPi6HvPUN2iPjJtYz1SO5EKl4NbnTPR6nJE0KngduFGRJDjK5e2', 'my password is password');

-- Developer Seeding
INSERT IGNORE INTO `developer` (`developer_id`) VALUES ('3');
INSERT IGNORE INTO `developer` (`developer_id`) VALUES ('4');
INSERT IGNORE INTO `developer` (`developer_id`) VALUES ('7');
INSERT IGNORE INTO `developer` (`developer_id`) VALUES ('9');

-- Friends Seeding
INSERT IGNORE INTO `friends` (`user1_id`, `user2_id`) VALUES ('1', '2');
INSERT IGNORE INTO `friends` (`user1_id`, `user2_id`) VALUES ('2', '1');
INSERT IGNORE INTO `friends` (`user1_id`, `user2_id`) VALUES ('5', '1');
INSERT IGNORE INTO `friends` (`user1_id`, `user2_id`) VALUES ('1', '5');
INSERT IGNORE INTO `friends` (`user1_id`, `user2_id`) VALUES ('5', '2');
INSERT IGNORE INTO `friends` (`user1_id`, `user2_id`) VALUES ('2', '5');
INSERT IGNORE INTO `friends` (`user1_id`, `user2_id`) VALUES ('5', '6');
INSERT IGNORE INTO `friends` (`user1_id`, `user2_id`) VALUES ('6', '5');
INSERT IGNORE INTO `friends` (`user1_id`, `user2_id`) VALUES ('3', '4');
INSERT IGNORE INTO `friends` (`user1_id`, `user2_id`) VALUES ('4', '3');
INSERT IGNORE INTO `friends` (`user1_id`, `user2_id`) VALUES ('10', '9');
INSERT IGNORE INTO `friends` (`user1_id`, `user2_id`) VALUES ('9', '10');

-- Game Seeding
INSERT IGNORE INTO `game` (`id`, `name`, `description`, `genre`, `appstoreprice`, `playstoreprice`, `publisher`, `author_id`) 
VALUES (NULL, 'Evil Mario', 'Can you be the first to beat this once heroic Italian plumber turned bad? Step up to the plate and find out for yourself', 
'Horror', '3.99', '3.49', 'BadGuyGames', '3');

INSERT IGNORE INTO `game` (`id`, `name`, `description`, `genre`, `appstoreprice`, `playstoreprice`, `publisher`, `author_id`) 
VALUES (NULL, 'Jumpy Frogs', 'Ribbit. Hop across the pond without falling in. Be sure to watch out for the birds looking for a tastey snack.', 
'Adventure', '12.99', '12.99', NULL, '4');

INSERT IGNORE INTO `game` (`id`, `name`, `description`, `genre`, `appstoreprice`, `playstoreprice`, `publisher`, `author_id`) 
VALUES (NULL, 'Hot Dog Mania', 'Race to be the first to find and eat the most hot dogs befor the timer runs out.', 
'Indie', '0', '0', 'That Indie Studio', '7');

INSERT IGNORE INTO `game` (`id`, `name`, `description`, `genre`, `appstoreprice`, `playstoreprice`, `publisher`, `author_id`) 
VALUES (NULL, 'Escape The Jungle', 'Be the first out of the jungle, but be sure to watch out for the wild animals trying to stop you', 
'Action', '2.99', '3.99', NULL, '9');

INSERT IGNORE INTO `game` (`id`, `name`, `description`, `genre`, `appstoreprice`, `playstoreprice`, `publisher`, `author_id`) 
VALUES (NULL, 'Heisty Heist', 'Attempt to make as much money as possible before being caught by the cops.', 
'Action', NULL, NULL, 'BadGuyGames', '3');

INSERT IGNORE INTO `game` (`id`, `name`, `description`, `genre`, `appstoreprice`, `playstoreprice`, `publisher`, `author_id`) 
VALUES (NULL, 'Rancher Pros 2', 'Run a popular ranch in this relaxing look into another way of life.', 
'Farming', '0.99', '0.99', NULL, '9');

-- Discussion Seeding
INSERT IGNORE INTO `discussion` (`discussion_id`, `title`, `description`, `poster_id`, `game_id`, `post_date`) 
VALUES (NULL, 'Evil Mario is very Difficult', "I don\'t know how the developer of this game ever expects anyone 
to succeed at this game with this absurd difficulty. Not worth purchasing in my opinion.", '1', '1', '2024-03-13');

INSERT IGNORE INTO `discussion` (`discussion_id`, `title`, `description`, `poster_id`, `game_id`, `post_date`) 
VALUES (NULL, 'What a peaceful and relaxing game', 'After a long hard day of work, this is the perfect game for me 
to kick back and relax while playing. Absolutely would recommend this to anyone considering purchasing it.', '1', '2', '2024-03-13');

INSERT IGNORE INTO `discussion` (`discussion_id`, `title`, `description`, `poster_id`, `game_id`, `post_date`) 
VALUES (NULL, 'So Scary', 'I was almost out of the jungle when I was attacked by a snake. I was so scared I could not sleep for a week. 
Never playing this game again', '5', '4', '2024-03-14');

INSERT IGNORE INTO `discussion` (`discussion_id`, `title`, `description`, `poster_id`, `game_id`, `post_date`) 
VALUES (NULL, 'What an Excellent Idea for a Game', 'I absolutely love the way you brought this idea to life, 
I hope some day I can make something as wonderful as this!', '9', '1', '2024-03-14');

INSERT IGNORE INTO `discussion` (`discussion_id`, `title`, `description`, `poster_id`, `game_id`, `post_date`) 
VALUES (NULL, 'What am I Supposed to do?', 'This game lacks a tutorial that explains the controls or how I win. 
Might be a good thing for the developer to add as currently I no longer want to play the game', '10', '3', '2024-03-05');

-- Comment Seeding
INSERT IGNORE INTO `comments` (`comment_text`, `discussion_id`, `poster_id`) 
VALUES ('It really is not that hard kid. You must just be really bad at the game lol', '1', '2');

INSERT IGNORE INTO `comments` (`comment_text`, `discussion_id`, `poster_id`) 
VALUES ('Hey thats not nice :( I am trying really hard but I am just stuck', '1', '1');

INSERT IGNORE INTO `comments` (`comment_text`, `discussion_id`, `poster_id`) 
VALUES ('Ok ok I am sorry, how you win is run away every time he winds up for a power attack,
and only go after him after he becomes vulnerable', '1', '2');

INSERT IGNORE INTO `comments` (`comment_text`, `discussion_id`, `poster_id`) 
VALUES ('Thank you for the feedback. Maybe in the future we can collaborate on another hit game!', '4', '3');

INSERT IGNORE INTO `comments` (`comment_text`, `discussion_id`, `poster_id`) 
VALUES ('Thank you for your feedback. I will look into adding something like what you suggested so that the game is easier to play.', '5', '7');

INSERT IGNORE INTO `comments` (`comment_text`, `discussion_id`, `poster_id`) 
VALUES ('This is a hilarious review for this game. Yes there are some jump scares but it is really not that bad.', '3', '10');

-- Friend request seesing
INSERT IGNORE INTO `friendrequests` (`requestTo`, `requestFrom`) VALUES ('1', '3');
INSERT IGNORE INTO `friendrequests` (`requestTo`, `requestFrom`) VALUES ('1', '4');
INSERT IGNORE INTO `friendrequests` (`requestTo`, `requestFrom`) VALUES ('7', '1');

-- top games seeding
INSERT IGNORE INTO `topgames` (`user_id`, `game_id`) VALUES ('1', '1');
INSERT IGNORE INTO `topgames` (`user_id`, `game_id`) VALUES ('1', '2');
INSERT IGNORE INTO `topgames` (`user_id`, `game_id`) VALUES ('1', '3');
INSERT IGNORE INTO `topgames` (`user_id`, `game_id`) VALUES ('2', '1');