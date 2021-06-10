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
        sh 'npm install --verbose'
      }
    }

  }
}