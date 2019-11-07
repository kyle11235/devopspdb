CREATE TABLE Hotel (
      ID VARCHAR(255),
      Name VARCHAR(255),
      Address VARCHAR(255),
      Star VARCHAR(255),
      Price decimal(8,1),
      PRIMARY KEY (ID)
      ); 


ALTER TABLE Hotel 
  ADD 
  CONSTRAINT price_rule
  CHECK ( Price IS NOT NULL AND Price >= 0 );


INSERT INTO Hotel (ID, Name, Address, Star, Price) VALUES ('H001', '深圳罗湖智选假日酒店', '罗湖区桂园北路6号', '五星', 6000);
INSERT INTO Hotel (ID, Name, Address, Star, Price) VALUES ('H002', '深圳大中华酒店', '福田区', '五星', 8000);

ALTER TABLE Hotel ADD ( comments VARCHAR2(4000) CONSTRAINT ensure_jsondata CHECK (comments IS JSON(STRICT)));
update hotel set comments = '[{"name":"Kyle","comment":"非常好的酒店，干净整洁，服务到位"},{"name":"Joe","comment":"交通方便，周围餐饮美食特别多，推荐"}]' where id = 'H001';
update hotel set comments = '[{"name":"Kyle","comment":"到店如到家，服务热情，宾至如归"},{"name":"Joe","comment":"早餐丰富美味，游泳池超级漂亮"}]' where id = 'H002';
update hotel set comments = '[{"name":"Kyle","comment":"地处南山区，出差办公方便"},{"name":"Joe","comment":"第一次来就是VIP啦"}]' where id = 'H003';




commit;








