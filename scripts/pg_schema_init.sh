#!/bin/sh

DBNAME=member
USER=jimmy

psql -d $DBNAME -U $USER<< EOF
  DROP table members;
  DROP table members_history;
  CREATE TABLE members(user_id SERIAL PRIMARY KEY, 
	google_id VARCHAR(100) , 
	fb_id VARCHAR(100) , 
	nickname VARCHAR(100) not null, 
	mail VARCHAR(100) not null, 
	gender VARCHAR(100) , 
	birthday VARCHAR(100) , 
	phone VARCHAR(100) , 
	address VARCHAR(100) , 
	deposit INTEGER DEFAULT 0,
	reg_time TIMESTAMP WITHOUT TIME ZONE DEFAULT current_timestamp
  );
  CREATE INDEX members_index ON members(user_id);

  INSERT INTO  members(google_id, nickname, mail) VALUES ('Kuo', 'Kuofucker', 'Kuofucker@gmail.com');
  INSERT INTO  members(google_id, nickname, mail) VALUES ('Andy', 'AndyDoraemon', 'AndyDoraemon@gmail.com');
  INSERT INTO  members(google_id, nickname, mail) VALUES ('Kevin', 'KevinElsa', 'KevinElsa@gmail.com');

  CREATE TABLE members_history(
	change_user_id INTEGER not null,
	action VARCHAR(32) not null,
	time TIMESTAMP WITHOUT TIME ZONE DEFAULT current_timestamp,
	deposit_old INTEGER not null,
	deposit_new INTEGER not null,
	deposit_delta INTEGER not null
  );
  
  CREATE OR REPLACE FUNCTION tracking_deposit_history() RETURNS TRIGGER AS \$tracking_deposit_tr\$
    BEGIN
        --
        -- Create a row in members_history to reflect the operation performed on members table,
        -- make use of the special variable TG_OP to work out the operation.
        --
        IF (TG_OP = 'DELETE') THEN
            RETURN OLD;
        ELSIF (TG_OP = 'UPDATE') THEN
            INSERT INTO members_history VALUES(OLD.user_id, 'UPD', now(), OLD.deposit, NEW.deposit, NEW.deposit - OLD.deposit);
            RETURN NEW;
        ELSIF (TG_OP = 'INSERT') THEN
            RETURN NEW;
        END IF;
        RETURN NULL; -- result is ignored since this is an AFTER trigger
    END;
\$tracking_deposit_tr\$ LANGUAGE plpgsql;

	
  CREATE TRIGGER tracking_deposit_tr 
    BEFORE UPDATE ON members 
    FOR EACH ROW
    EXECUTE PROCEDURE tracking_deposit_history();


  \d members;
  select * from members;

EOF
