CREATE DATABASE HiKanban;
USE HiKanban;

CREATE TABLE User (
idUser INT PRIMARY KEY AUTO_INCREMENT,
name VARCHAR(45) NOT NULL,
email VARCHAR(320) NOT NULL UNIQUE,
password VARCHAR(45) NOT NULL
);

CREATE TABLE Block (
idBlock INT PRIMARY KEY AUTO_INCREMENT,
name VARCHAR(45) NOT NULL,
color CHAR(7),
isFavorite TINYINT NOT NULL DEFAULT 0,
fkUser INT,
CONSTRAINT fkUserBlock FOREIGN KEY (fkUser) REFERENCES User(idUser),
CONSTRAINT chkColor CHECK (color LIKE '#%')
);

CREATE TABLE Task (
idTask INT PRIMARY KEY AUTO_INCREMENT,
name VARCHAR(45) NOT NULL,
description VARCHAR(200) NULL,
endDate DATETIME,
fkBlock INT,
fkUser INT,
status VARCHAR(12),
positionInColumn INT,
CONSTRAINT fkBlockTask FOREIGN KEY (fkBlock) REFERENCES Block(idBlock),
CONSTRAINT fkUserTask FOREIGN KEY (fkUser) REFERENCES User(idUser),
CONSTRAINT chkStatus CHECK (status IN('TO_DO', 'IN_PROGRESS', 'FINISHED'))
);

DELIMITER //
CREATE FUNCTION getNextTaskPosition(taskStatus VARCHAR(12)) RETURNS INT
READS SQL DATA
BEGIN
    DECLARE position INT;
    SET position = (SELECT MAX(positionInColumn) + 1 FROM Task WHERE status = taskStatus);
    
    IF position IS NULL THEN 
		SET position = 0;
	END IF;
    
    RETURN position;
END//
DELIMITER ;

DELIMITER //
CREATE PROCEDURE updateTasksOrder(targetTaskId INT, newPosition INT)
BEGIN
	DECLARE currentPosition INT;
    DECLARE taskStatus VARCHAR(12);
    
    SET currentPosition = (SELECT positionInColumn FROM Task WHERE idTask = targetTaskId);
    SET taskStatus = (SELECT status FROM Task WHERE idTask = targetTaskId);
	
	UPDATE Task SET positionInColumn = newPosition WHERE idTask = targetTaskId;
    
    CASE WHEN newPosition > currentPosition THEN -- Going down the task
		UPDATE Task SET positionInColumn = positionInColumn - 1 WHERE idTask != targetTaskId AND positionInColumn <= newPosition AND positionInColumn > currentPosition AND status = taskStatus;
	ELSE -- Going up the task
		UPDATE Task SET positionInColumn = positionInColumn + 1 WHERE idTask != targetTaskId AND positionInColumn >= newPosition AND positionInColumn < currentPosition AND status = taskStatus;
	END CASE;
END
// DELIMITER ;

DELIMITER //
CREATE PROCEDURE updateTaskStatus(targetTaskId INT, positionInNewColumn INT, newStatus VARCHAR(12)) 
BEGIN
	DECLARE currentPosition INT;
    DECLARE previousStatus VARCHAR(12);
    
    SET currentPosition = (SELECT positionInColumn FROM Task WHERE idTask = targetTaskId);
    SET previousStatus = (SELECT status FROM Task WHERE idTask = targetTaskId);
	
    -- Updating the position of all tasks in the previous column
	UPDATE Task SET positionInColumn = positionInColumn - 1 WHERE idTask != targetTaskId AND status = previousStatus AND positionInColumn > currentPosition;
    
    -- Updating the position of all tasks in the new column
    UPDATE Task SET positionInColumn = positionInColumn + 1 WHERE idTask != targetTaskId AND status = newStatus AND positionInColumn >= positionInNewColumn;
    
    UPDATE Task SET status = newStatus, positionInColumn = positionInNewColumn WHERE idTask = targetTaskId;
END
// DELIMITER ;
