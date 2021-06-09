#!/bin/bash
cd /tmp/
npm install
PORT=$PORT PG_URI=$PG_URI server/server.js

