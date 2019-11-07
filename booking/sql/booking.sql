CREATE TABLE Booking (
      ID VARCHAR(255),
      CustomerID VARCHAR(255),
      CustomerName VARCHAR(255),
      BookingDate VARCHAR(255),
      Price decimal(8,1),
      FlightID VARCHAR(255),
      HotelID VARCHAR(255),
      PRIMARY KEY (ID)
      ); 
      
      
INSERT INTO Booking VALUES ('B001', 'C001', 'kyle zhang', '2019-08-16', 3800, 'ZH001', 'H001');

commit;








