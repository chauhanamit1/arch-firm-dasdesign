#!/bin/bash
set -e

psql -v ON_ERROR_STOP=1 --username "$POSTGRES_USER" --dbname "$POSTGRES_DB" <<-EOSQL
    CREATE DATABASE strapi;
    CREATE DATABASE sonarqube;
    GRANT ALL PRIVILEGES ON DATABASE strapi TO $POSTGRES_USER;
    GRANT ALL PRIVILEGES ON DATABASE sonarqube TO $POSTGRES_USER;
EOSQL

# Made with Bob
