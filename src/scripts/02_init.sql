-- seeding script
-- Users Seeding
INSERT INTO `users` (`id`, `role`, `username`, `password`) VALUES (NULL, 'registered', 'bobby1234', 'BobbysTheBest');
INSERT INTO `users` (`id`, `role`, `username`, `password`) VALUES (NULL, 'registered', 'jill_the_thrill', 'skippybippy');
INSERT INTO `users` (`id`, `role`, `username`, `password`) VALUES (NULL, 'developer', 'JimboGames', '12341234');
INSERT INTO `users` (`id`, `role`, `username`, `password`) VALUES (NULL, 'developer', 'PammySpammy', 'games4Life');
INSERT INTO `users` (`id`, `role`, `username`, `password`) VALUES (NULL, 'registered', 'Timmy', 'TimmyPassword');
INSERT INTO `users` (`id`, `role`, `username`, `password`) VALUES (NULL, 'registered', 'Gerard Terinval', 'gladiator1');
INSERT INTO `users` (`id`, `role`, `username`, `password`) VALUES (NULL, 'developer', 'Dabella', 'rabbitsRfluffy');
INSERT INTO `users` (`id`, `role`, `username`, `password`) VALUES (NULL, 'registered', 'BobMarleyEnthusiast', 'randompassowrd2');
INSERT INTO `users` (`id`, `role`, `username`, `password`) VALUES (NULL, 'registered', 'FonkHonkBonk', 'thisIsASuperSecretPassword');
INSERT INTO `users` (`id`, `role`, `username`, `password`) VALUES (NULL, 'developer', 'Wukonga', 'ahhPassword');

-- Developer Seeding
INSERT INTO `developer` (`developer_id`) VALUES ('3');
INSERT INTO `developer` (`developer_id`) VALUES ('4');
INSERT INTO `developer` (`developer_id`) VALUES ('7');
INSERT INTO `developer` (`developer_id`) VALUES ('9');

--Friends Seeding
INSERT INTO `friends` (`user1_id`, `user2_id`) VALUES ('1', '2');
INSERT INTO `friends` (`user1_id`, `user2_id`) VALUES ('2', '1');
INSERT INTO `friends` (`user1_id`, `user2_id`) VALUES ('5', '1');
INSERT INTO `friends` (`user1_id`, `user2_id`) VALUES ('1', '5');
INSERT INTO `friends` (`user1_id`, `user2_id`) VALUES ('5', '2');
INSERT INTO `friends` (`user1_id`, `user2_id`) VALUES ('2', '5');
INSERT INTO `friends` (`user1_id`, `user2_id`) VALUES ('5', '6');
INSERT INTO `friends` (`user1_id`, `user2_id`) VALUES ('6', '5');
INSERT INTO `friends` (`user1_id`, `user2_id`) VALUES ('3', '4');
INSERT INTO `friends` (`user1_id`, `user2_id`) VALUES ('4', '3');
INSERT INTO `friends` (`user1_id`, `user2_id`) VALUES ('10', '9');
INSERT INTO `friends` (`user1_id`, `user2_id`) VALUES ('9', '10');

--Game Seeding
INSERT INTO `game` (`id`, `name`, `description`, `genre`, `thumbnail`, `appstoreprice`, `playstoreprice`, `publisher`, `author_id`) 
VALUES (NULL, 'Evil Mario', 'Can you be the first to beat this once heroic Italian plumber turned bad? Step up to the plate and find out for yourself', 
'Horror', './evil-mario.png', '3.99', '3.49', 'BadGuyGames', '3');

INSERT INTO `game` (`id`, `name`, `description`, `genre`, `thumbnail`, `appstoreprice`, `playstoreprice`, `publisher`, `author_id`) 
VALUES (NULL, 'Jumpy Frogs', 'Ribbit. Hop across the pond without falling in. Be sure to watch out for the birds looking for a tastey snack.', 
'Adventure', './frog-hopping-on-lilypad.jpeg', '12.99', '12.99', NULL, '4');

INSERT INTO `game` (`id`, `name`, `description`, `genre`, `thumbnail`, `appstoreprice`, `playstoreprice`, `publisher`, `author_id`) 
VALUES (NULL, 'Hot Dog Mania', 'Race to be the first to find and eat the most hot dogs befor the timer runs out.', 
'Indie', './hot-dog-eating.png', '0', '0', 'That Indie Studio', '7');

INSERT INTO `game` (`id`, `name`, `description`, `genre`, `thumbnail`, `appstoreprice`, `playstoreprice`, `publisher`, `author_id`) 
VALUES (NULL, 'Escape The Jungle', 'Be the first out of the jungle, but be sure to watch out for the wild animals trying to stop you', 
'Action', './Jungle-animals.jpeg', '2.99', '3.99', NULL, '9');

INSERT INTO `game` (`id`, `name`, `description`, `genre`, `thumbnail`, `appstoreprice`, `playstoreprice`, `publisher`, `author_id`) 
VALUES (NULL, 'Heisty Heist', 'Attempt to make as much money as possible before being caught by the cops.', 
'Action', './clown-mask-robbery.png', NULL, NULL, 'BadGuyGames', '3');

INSERT INTO `game` (`id`, `name`, `description`, `genre`, `thumbnail`, `appstoreprice`, `playstoreprice`, `publisher`, `author_id`) 
VALUES (NULL, 'Rancher Pros 2', 'Run a popular ranch in this relaxing look into another way of life.', 
'Farming', './tractor.png', '0.99', '0.99', NULL, '9');

--Discussion Seeding
INSERT INTO `discussion` (`discussion_id`, `title`, `description`, `poster_id`, `game_id`, `post_date`) 
VALUES (NULL, 'Evil Mario is very Difficult', "I don\'t know how the developer of this game ever expects anyone 
to succeed at this game with this absurd difficulty. Not worth purchasing in my opinion.", '1', '1', '2024-03-13');

INSERT INTO `discussion` (`discussion_id`, `title`, `description`, `poster_id`, `game_id`, `post_date`) 
VALUES (NULL, 'What a peaceful and relaxing game', 'After a long hard day of work, this is the perfect game for me 
to kick back and relax while playing. Absolutely would recommend this to anyone considering purchasing it.', '1', '2', '2024-03-13');

INSERT INTO `discussion` (`discussion_id`, `title`, `description`, `poster_id`, `game_id`, `post_date`) 
VALUES (NULL, 'So Scary', 'I was almost out of the jungle when I was attacked by a snake. I was so scared I could not sleep for a week. 
Never playing this game again', '5', '4', '2024-03-14');

INSERT INTO `discussion` (`discussion_id`, `title`, `description`, `poster_id`, `game_id`, `post_date`) 
VALUES (NULL, 'What an Excellent Idea for a Game', 'I absolutely love the way you brought this idea to life, 
I hope some day I can make something as wonderful as this!', '9', '1', '2024-03-14');

INSERT INTO `discussion` (`discussion_id`, `title`, `description`, `poster_id`, `game_id`, `post_date`) 
VALUES (NULL, 'What am I Supposed to do?', 'This game lacks a tutorial that explains the controls or how I win. 
Might be a good thing for the developer to add as currently I no longer want to play the game', '10', '3', '2024-03-05');

--Comment Seeding
INSERT INTO `comments` (`comment_text`, `comment_ordinal`, `discussion_id`, `poster_id`) 
VALUES ('It really is not that hard kid. You must just be really bad at the game lol', '1', '1', '2');

INSERT INTO `comments` (`comment_text`, `comment_ordinal`, `discussion_id`, `poster_id`) 
VALUES ('Hey thats not nice :( I am trying really hard but I am just stuck', '2', '1', '1');

INSERT INTO `comments` (`comment_text`, `comment_ordinal`, `discussion_id`, `poster_id`) 
VALUES ('Ok ok I am sorry, how you win is run away every time he winds up for a power attack,
and only go after him after he becomes vulnerable', '3', '1', '2');

INSERT INTO `comments` (`comment_text`, `comment_ordinal`, `discussion_id`, `poster_id`) 
VALUES ('Thank you for the feedback. Maybe in the future we can collaborate on another hit game!', '1', '4', '3');

INSERT INTO `comments` (`comment_text`, `comment_ordinal`, `discussion_id`, `poster_id`) 
VALUES ('Thank you for your feedback. I will look into adding something like what you suggested so that the game is easier to play.', '1', '5', '7');

INSERT INTO `comments` (`comment_text`, `comment_ordinal`, `discussion_id`, `poster_id`) 
VALUES ('This is a hilarious review for this game. Yes there are some jump scares but it is really not that bad.', '1', '3', '10');