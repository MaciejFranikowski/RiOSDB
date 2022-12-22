CREATE TABLE User (
	id int(11) NOT NULL AUTO_INCREMENT PRIMARY KEY,
	firstName varchar(255) NOT NULL,
	lastName varchar(255) NOT NULL,
	email varchar(255) NOT NULL,
	passHash varchar(255) NOT NULL
);

CREATE TABLE Task (
	id int(11) NOT NULL AUTO_INCREMENT PRIMARY KEY,
	description text NOT NULL,
	title varchar(255) NOT NULL,
	userId int(11),
	FOREIGN KEY (userId)
      REFERENCES User(id)
);

CREATE TABLE Test (
	id int(11) NOT NULL AUTO_INCREMENT PRIMARY KEY,
	input text NOT NULL,
	desiredOutput text NOT NULL,
	taskId int(11),
	FOREIGN KEY (taskId)
      REFERENCES Task(id)
);