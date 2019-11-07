
# devops pdb

## pdb

x.x.x.x  emcc.marketplace.com

- em13c OCI VM

      sudo su - oracle

      Installation details of EM 13.3 PG .....

      Public EM url:  https://x.x.x.x:7803/em
      Private EM url: https://10.0.0.4:7803/em
      Ports used by this deployment at /u01/app/em13c/middleware/install/portlist.ini
      Database location: /u01/app/database/product
      Database name: emrep
      EM Middleware Home location: /u01/app/em13c/middleware
      EM Agent Home location: /u01/app/em13c/emagent/agent_13.3.0.0.0
      EM Diagnostic Kit (omsvfy): /u01/app/em13c/middleware/emdiag  
      EM Diagnostic Kit (repvfy): /u01/app/em13c/middleware/emdiag_rep  
      EM Diagnostic Kit (agtvfy): /u01/app/em13c/emagent/agent_13.3.0.0.0/emdiag

      This information is also available in the file /home/oracle/README.FIRST

      To start all processes, as the user oracle, run the script /home/oracle/start_all.sh
      To stop all processes, as the user oracle, run the script /home/oracle/stop_all.sh

- root pdb - MICROSERVICE

      CREATE USER c##user1 IDENTIFIED BY xxx CONTAINER=ALL;

- flight pdb - crm, service name is crms

      (DESCRIPTION=(ADDRESS_LIST=(ADDRESS=(PROTOCOL=TCP)(HOST=emcc.marketplace.com)(PORT=1521)))(CONNECT_DATA=(SERVICE_NAME=crms)(INSTANCE_NAME=mics)(UR=A)(SERVER=DEDICATED)))

      PDBADMIN
      alter user PDBADMIN quota 1000m on system;
      CON_ID=8
      password=xxx
      sys pass=xxx
            - sql developer, username -> sys, role -> sysdba
            - sqlplus, connect sys@crm as sysdba;

- hotel pdb - pa, service name is pas

      (DESCRIPTION=(ADDRESS_LIST=(ADDRESS=(PROTOCOL=TCP)(HOST=emcc.marketplace.com)(PORT=1521)))(CONNECT_DATA=(SERVICE_NAME=pas)(INSTANCE_NAME=mics)(UR=A)(SERVER=DEDICATED)))

      PDBADMIN
      alter user PDBADMIN quota 1000m on system;
      CON_ID=7
      password=xxx
      SYS pass=xxx

- create order pdb - order

      https://www.dummies.com/programming/databases/how-to-create-new-pluggable-databases-in-oracle-12c/

      cd /u01/app/database
      mkdir ./oradata/MICROSERVICE/orderr

      cd /u01/app/database
      ./product/bin/sqlplus / as sysdba
      connect c##user1@MICROSERVICE; (connect to root pdb)
      show con_name;  ->  CDB$ROOT

      CREATE PLUGGABLE DATABASE orderr ADMIN USER PDBADMIN identified by "xxx"
      DEFAULT TABLESPACE USERS
      DATAFILE '/u01/app/database/oradata/MICROSERVICE/orderr/users01.dbf'
      SIZE 250M AUTOEXTEND ON
      FILE_NAME_CONVERT=(
      '/u01/app/database/oradata/MICROSERVICE/pdbseed/',
      '/u01/app/database/oradata/MICROSERVICE/orderr/');

      connect sys@orderr as sysdba; (connect to orderr pdb with sys as sysdba)
      ALTER DATABASE OPEN;
      ALTER USER PDBADMIN quota 100M on users;

      grant create table to PDBADMIN;
      grant create session to PDBADMIN;

- create db link

      - check all dblinks

            select owner,db_link, host from all_db_links;

      - sql developer login sys as sysdba

            GRANT CREATE DATABASE LINK TO PDBADMIN; 
            GRANT CREATE PUBLIC DATABASE LINK TO PDBADMIN; 
            GRANT CREATE SESSION TO PDBADMIN; 

      - sql developer login PDBADMIN

            - way1
            CREATE DATABASE LINK flightlk
            CONNECT TO PDBADMIN IDENTIFIED BY xxx 
            USING '(DESCRIPTION=(ADDRESS_LIST=(ADDRESS=(PROTOCOL=TCP)(HOST=132.145.81.250)(PORT=1521)))(CONNECT_DATA=(SERVICE_NAME=crms)(INSTANCE_NAME=mics)(UR=A)(SERVER=DEDICATED)))';

            select * from Flight@flightlk;

            - way2
            CREATE DATABASE LINK flightlk1
            CONNECT TO PDBADMIN IDENTIFIED BY xxx 
            USING 'x.x.x.x:1521/crms';

            select * from Flight@flightlk1;


      - do the same to link hotel

            CREATE DATABASE LINK hotellk1
            CONNECT TO PDBADMIN IDENTIFIED BY xxx 
            USING 'x.x.x.x:1521/pas';

            select * from Hotel@hotellk1;


      - query

            select flight.id, flight.price, hotel.id, hotel.price from Flight@flightlk1 flight, Hotel@hotellk1 hotel;

- vm

      sudo firewall-cmd --zone=public --permanent --add-port=1521/tcp
      sudo firewall-cmd --reload

      sudo firewall-cmd --zone=public --permanent --add-port=8181/tcp
      sudo firewall-cmd --reload

## devops

- account

      xxx

- ssh

      ssh -o StrictHostKeyChecking=no -i id_rsa opc@x.x.x.x 'cd /home/opc/flight && git reset --hard && git pull && bash -s < deploy.sh'

- git clone

       git clone ssh://xxx/flight.git

      git clone ssh://xxx/frontend.git

      git clone ssh://xxx/hotel.git

      git clone ssh://xxx/booking.git

- devcs build vm

- app

      http://x.x.x.x:8090

- oracle db application container

      https://docs.oracle.com/en/database/oracle/oracle-database/12.2/cncpt/overview-of-the-multitenant-architecture.html#GUID-B964031E-8ACE-4603-8F1E-DD173BE5BA01

      - CDB
            - application root (like CDB within CDB)
                  - application pdb1
                  - application pdb2
