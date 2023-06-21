#!/bin/bash
# ENTER A NAME OF YOUR DATABASE
dbname='node_postgres'
# read -p "Name of database: " dbname

time=$(date '+%Y'-'%m'-'%d')
default=node_postgres.sql

echo "SQL-BACKUP"
echo "What to do?"
echo "1 - backup "$dbname" Data Base"
echo "2 - restore "$dbname" Data Base"
echo "3 - default restore from ../materials"
read -p "Please enter the number: " action
if [ $action = 1 ]; then
  rm -rf *$dbname*
  pg_dump $dbname --clean >backup-"$dbname"-${time}.dump
elif [ $action = 2 ]; then
  dropdb $dbname && createdb $dbname
  psql $dbname <backup-"$dbname"-${time}.dump
else
  dropdb $dbname && createdb $dbname
  psql $dbname <$default
fi
