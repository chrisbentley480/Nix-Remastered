



CREATE TABLE Messages (
  to_ varchar(255) NOT NULL,
  from_ varchar(255) NOT NULL,
  to_key varchar(255) NOT NULL,
  from_key varchar(255) NOT NULL,
  msg_ longtext NOT NULL,
  time_ varchar(45) DEFAULT NULL
);

CREATE TABLE users (
  username varchar(255) NOT NULL,
  pubkey varchar(900) NOT NULL,
  cookie varchar(255) DEFAULT NULL,
  UNIQUE KEY _username (username),
  UNIQUE KEY cookie_UNIQUE (cookie)
);


DELIMITER //


CREATE PROCEDURE cheapUser(IN in1 varchar(255),IN in2 longtext, IN in3 varchar(255))
begin
insert into users(username,pubKey,cookie) values (in1,in2,in3);
end

//
DELIMITER ;
DELIMITER //

CREATE PROCEDURE fetchCookie(IN in1 varchar(255))
begin
select cookie from users where username=in1;
end

//
DELIMITER ;

DELIMITER //

CREATE  PROCEDURE `getPublic`(IN in1 varchar(255))
begin
select pubKey from users where username=in1;
end

//
DELIMITER ;









CREATE TABLE `messages` (
  `to_` varchar(255) NOT NULL,
  `from_` varchar(255) NOT NULL,
  `msg_` longtext NOT NULL,
  `public_` int(11) NOT NULL,
  `time_` varchar(45) DEFAULT NULL
)

CREATE TABLE `users` (
  `username` varchar(255) NOT NULL,
  `pubkey` varchar(900) NOT NULL,
  `cookie` varchar(255) DEFAULT NULL,
  UNIQUE KEY `_username` (`username`),
  UNIQUE KEY `cookie_UNIQUE` (`cookie`)
) 


DELIMITER //

CREATE  PROCEDURE `addCookie`(IN user1 varchar(255), IN cookie1 varchar(255))
Begin
insert into cookies(username_,cookie_,expr_) values
(user1,cookie1,(NOW() + INTERVAL 1 DAY));
end

//
DELIMITER ;

DELIMITER //

CREATE  PROCEDURE `createCookie`(IN user1 varchar(255), IN cookie1 varchar(255))
begin
UPDATE 
    users
SET 
    cookie = cookie1
WHERE 
    username = user1;
end

//
DELIMITER ;
DELIMITER //


CREATE PROCEDURE `fetchUser`(IN sesID1 varchar(255), OUT out1 varchar(255))
begin
select username into out1 from users where cookie=sesID1;
end

//
DELIMITER ;
DELIMITER //

CREATE  PROCEDURE `getMessages`(IN user1 varchar(255))
begin
select * from messages where (to_=user1 or from_=user1);
end

//
DELIMITER ;
DELIMITER //

CREATE  PROCEDURE `getPublic`(IN in1 varchar(255),OUT out1 varchar(900))
begin
select pubKey into out1 from users where username=in1;
end

//
DELIMITER ;
DELIMITER //

CREATE  PROCEDURE `getPublic2`(IN in1 varchar(255),OUT out1 varchar(255))
begin
select username into out1 from users where cookie=in1;
end

//
DELIMITER ;
DELIMITER //


CREATEPROCEDURE `newMessage`(IN msg1 longtext, IN to1 varchar(255),IN from1 varchar(255), IN stat1 int, IN time1 varchar(45))
begin
insert into messages(to_,msg_,from_,public_,time_) values (to1,msg1,from1,stat1,time1) ;
end

//
DELIMITER ;
DELIMITER //


CREATE PROCEDURE `oldMessage`(IN msg1 longtext, IN to1 varchar(255),IN from1 varchar(255), IN stat1 int)
begin
insert into messages(to_,msg_,from_,public_) values (to1,msg1,from1,stat1) ;
end

//
DELIMITER ;
DELIMITER //


CREATE PROCEDURE `publicUser`(IN in1 varchar(255),IN in2 longtext)
begin
insert into users(username,pubKey) values (in1,in2);
end

//
DELIMITER ;
DELIMITER //

CREATE PROCEDURE `simpleUser`(IN param1 varchar(255))
BEGIN
insert into users(username) values (param1);
END

//
DELIMITER ;
DELIMITER //


CREATE PROCEDURE `userExists`(IN in1 varchar(255),out out1 int)
begin
set out1= EXISTS(SELECT 1 FROM users WHERE username = in1);
end

//
DELIMITER ;
