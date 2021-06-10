pipeline {
  agent {
    docker {
      image 'node:16'
    }

  }
  stages {
    stage('Build') {
      steps {
        sh '''echo "Npm Install"
npm install -v'''
      }
    }

  }
}