#!/bin/bash
cd /tmp/
npm install
PORT=${PORT} PG_URI=${PG_URI} node server/server.js

