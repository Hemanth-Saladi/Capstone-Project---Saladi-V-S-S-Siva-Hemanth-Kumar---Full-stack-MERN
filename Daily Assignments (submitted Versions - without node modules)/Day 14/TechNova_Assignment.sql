DROP DATABASE IF EXISTS TechNovaDB;
CREATE DATABASE TechNovaDB;
USE TechNovaDB;

CREATE TABLE Department (GetTopPerformers
    DeptID INT PRIMARY KEY,
    DeptName VARCHAR(50) NOT NULL UNIQUE,
    Location VARCHAR(50) NOT NULL
);

CREATE TABLE Employee (
    EmpID INT PRIMARY KEY,
    EmpName VARCHAR(100) NOT NULL,
    Gender ENUM('M','F') NOT NULL,
    DOB DATE NOT NULL,
    HireDate DATE NOT NULL,
    DeptID INT,
    FOREIGN KEY (DeptID) REFERENCES Department(DeptID)
);
CREATE INDEX idx_EmpName_DeptID ON Employee(EmpName, DeptID);

CREATE TABLE Project (
    ProjectID INT PRIMARY KEY,
    ProjectName VARCHAR(100) NOT NULL,
    DeptID INT,
    StartDate DATE NOT NULL,
    EndDate DATE,
    FOREIGN KEY (DeptID) REFERENCES Department(DeptID)
);

CREATE TABLE Performance (
    EmpID INT,
    ProjectID INT,
    Rating INT CHECK(Rating BETWEEN 1 AND 5),
    ReviewDate DATE NOT NULL,
    PRIMARY KEY(EmpID, ProjectID),
    FOREIGN KEY(EmpID) REFERENCES Employee(EmpID),
    FOREIGN KEY(ProjectID) REFERENCES Project(ProjectID)
);

CREATE TABLE Reward (
    EmpID INT,
    RewardMonth DATE NOT NULL,
    RewardAmount DECIMAL(10,2) NOT NULL,
    PRIMARY KEY(EmpID, RewardMonth),
    FOREIGN KEY(EmpID) REFERENCES Employee(EmpID)
);


INSERT INTO Department VALUES
(101, 'IT', 'Bangalore'),
(102, 'HR', 'Delhi'),
(103, 'Finance', 'Mumbai'),
(104, 'Marketing', 'Chennai'),
(105, 'R&D', 'Pune');

INSERT INTO Employee VALUES
(1, 'Asha', 'F', '1990-07-12', '2018-06-10', 101),
(2, 'Raj', 'M', '1988-04-09', '2020-03-22', 102),
(3, 'Neha', 'F', '1995-01-15', '2021-08-05', 101),
(4, 'Karan', 'M', '1992-12-01', '2019-11-15', 103),
(5, 'Simran', 'F', '1989-09-23', '2017-07-30', 104);

INSERT INTO Project VALUES
(201, 'Website Revamp', 101, '2023-01-01', '2023-06-30'),
(202, 'HR Portal', 102, '2022-07-01', '2023-03-31'),
(203, 'Finance Automation', 103, '2023-02-15', '2023-08-15'),
(204, 'Marketing Campaign', 104, '2023-03-01', '2023-09-30'),
(205, 'AI Research', 105, '2023-01-15', '2023-12-31');

INSERT INTO Performance VALUES
(1, 201, 5, '2023-06-30'),
(2, 202, 4, '2023-03-31'),
(3, 201, 3, '2023-06-30'),
(4, 203, 4, '2023-08-15'),
(5, 204, 5, '2023-09-30');

INSERT INTO Reward VALUES
(1, '2023-06-01', 3000),
(2, '2023-03-01', 1500),
(3, '2023-06-01', 1000),
(4, '2023-08-01', 500),
(5, '2023-09-01', 2500);

UPDATE Employee SET DeptID = 105 WHERE EmpID = 2;

SET SQL_SAFE_UPDATES = 0;
DELETE FROM Reward WHERE RewardAmount < 1000;
SET SQL_SAFE_UPDATES = 1;

SELECT * FROM Employee WHERE HireDate > '2019-01-01';

SELECT d.DeptName, AVG(p.Rating) AS AvgRating
FROM Performance p
JOIN Employee e ON p.EmpID = e.EmpID
JOIN Department d ON e.DeptID = d.DeptID
GROUP BY d.DeptName;

SELECT EmpName, TIMESTAMPDIFF(YEAR, DOB, CURDATE()) AS Age FROM Employee;

SELECT SUM(RewardAmount) AS TotalRewards
FROM Reward
WHERE YEAR(RewardMonth) = YEAR(CURDATE());

SELECT * FROM Reward WHERE RewardAmount > 2000;

SELECT e.EmpName, d.DeptName, pr.ProjectName, p.Rating
FROM Performance p
JOIN Employee e ON p.EmpID = e.EmpID
JOIN Department d ON e.DeptID = d.DeptID
JOIN Project pr ON p.ProjectID = pr.ProjectID;

SELECT EmpName, DeptName, Rating FROM (
    SELECT e.EmpName, d.DeptName, p.Rating,
           RANK() OVER (PARTITION BY d.DeptID ORDER BY p.Rating DESC) as rnk
    FROM Performance p
    JOIN Employee e ON p.EmpID = e.EmpID
    JOIN Department d ON e.DeptID = d.DeptID
) t WHERE rnk = 1;

SELECT EmpName FROM Employee e
WHERE EmpID NOT IN (SELECT EmpID FROM Reward);

START TRANSACTION;
INSERT INTO Employee VALUES (6, 'Vikram', 'M', '1993-02-10', '2023-10-01', 101);
INSERT INTO Performance VALUES (6, 201, 4, '2023-10-01');

EXPLAIN SELECT e.EmpName, d.DeptName, p.Rating
FROM Performance p
JOIN Employee e ON p.EmpID = e.EmpID
JOIN Department d ON e.DeptID = d.DeptID;

CREATE VIEW EmployeePerformanceView AS
SELECT e.EmpName, d.DeptName, p.ProjectID, pr.ProjectName, p.Rating
FROM Employee e
JOIN Department d ON e.DeptID = d.DeptID
JOIN Performance p ON e.EmpID = p.EmpID
JOIN Project pr ON p.ProjectID = pr.ProjectID;

DELIMITER //
CREATE PROCEDURE GetTopPerformers(IN deptName VARCHAR(50))
BEGIN
    SELECT e.EmpName, d.DeptName, AVG(p.Rating) as AvgRating
    FROM Employee e
    JOIN Department d ON e.DeptID = d.DeptID
    JOIN Performance p ON e.EmpID = p.EmpID
    WHERE d.DeptName = deptName
    GROUP BY e.EmpID
    ORDER BY AvgRating DESC
    LIMIT 3;
END //
DELIMITER ;