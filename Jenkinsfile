pipeline {
  agent {
    docker {
      image 'node:16'
      args '-p 80:3000'
    }

  }
  stages {
    stage('Build') {
      steps {
        sh '''#!/bin/sh
node --version
npm --version
npm get registry
echo
echo "Installing Node Modules"
npm install --verbose'''
      }
    }

  }
}