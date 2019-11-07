CREATE TABLE Flight (
      ID VARCHAR(255),
      Airline VARCHAR(255),
      Departure VARCHAR(255),
      Destination VARCHAR(255),
      Clazz VARCHAR(255),
      Price decimal(8,1),
      PRIMARY KEY (ID)
      ); 

ALTER TABLE Flight 
  ADD 
  CONSTRAINT price_rule
  CHECK ( Price IS NOT NULL AND Price >= 0 );
      
      
INSERT INTO Flight (ID, Airline, Departure, Destination, Clazz, Price) VALUES ('ZH001', 'SZ', 'ShenZhen', 'Beijing', 'Bussiness', 3800);
INSERT INTO Flight (ID, Airline, Departure, Destination, Clazz, Price) VALUES ('CA001', 'CA', 'Beijing', 'ShenZhen', 'Bussiness', 6800);

commit;








