#!/bin/sh

DBNAME=member
USER=jimmy
#UPDATE members SET deposit = 100 WHERE user_id = 1;

psql -d $DBNAME -U $USER<< EOF
	UPDATE members SET deposit = 90 WHERE user_id = 1;

EOF
