#!/bin/bash
cd /tmp/
port=$(aws ssm get-parameters --region us-east-1 --names PORT --with-decryption --query Parameters[0].Value)

npm install
PORT=3000 PG_URI=$PG_URI node server/server.js

