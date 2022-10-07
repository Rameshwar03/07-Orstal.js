INSERT INTO Employee(empid, lastname, firstname, title, titleofcourtesy, birthdate, hiredate, address, city, region, postalcode, country, phone, mgrid)
VALUES(1, N'Davis', N'Sara', N'CEO', N'Ms.', '1958-12-08', '2002-05-01', N'7890 - 20th Ave. E., Apt. 2A', N'Seattle', N'WA', N'10003', N'USA', N'(206) 555-0101', NULL),
(2, N'Funk', N'Don', N'Vice President, Sales', N'Dr.', '1962-02-19', '2002-08-14', N'9012 W. Capital Way', N'Tacoma', N'WA', N'10001', N'USA', N'(206) 555-0100', 1),
(3, N'Lew', N'Judy', N'Sales Manager', N'Ms.', '1973-08-30', '2002-04-01', N'2345 Moss Bay Blvd.', N'Kirkland', N'WA', N'10007', N'USA', N'(206) 555-0103', 2),
(4, N'Peled', N'Yael', N'Sales Representative', N'Mrs.', '1947-09-19', '2003-05-03', N'5678 Old Redmond Rd.', N'Redmond', N'WA', N'10009', N'USA', N'(206) 555-0104', 3),
(5, N'Buck', N'Sven', N'Sales Manager', N'Mr.', '1965-03-04', '2003-10-17', N'8901 Garrett Hill', N'London', NULL, N'10004', N'UK', N'(71) 234-5678', 2),
(6, N'Suurs', N'Paul', N'Sales Representative', N'Mr.', '1973-07-02', '2003-10-17', N'3456 Coventry House, Miner Rd.', N'London', NULL, N'10005', N'UK', N'(71) 345-6789', 5),
(7, N'King', N'Russell', N'Sales Representative', N'Mr.', '1970-05-29', '2004-01-02', N'6789 Edgeham Hollow, Winchester Way', N'London', NULL, N'10002', N'UK', N'(71) 123-4567', 5),
(8, N'Cameron', N'Maria', N'Sales Representative', N'Ms.', '1968-01-09', '2004-03-05', N'4567 - 11th Ave. N.E.', N'Seattle', N'WA', N'10006', N'USA', N'(206) 555-0102', 3),
(9, N'Dolgopyatova', N'Zoya', N'Sales Representative', N'Ms.', '19760-12-07', '2004011015', N'1234 Houndstooth Rd.', N'London', NULL, N'10008', N'UK', N'(71) 456-7890', 5);