#!/bin/bash
cd /tmp/
npm install
PORT=3000 PG_URI=$PG_URI node server/server.js

