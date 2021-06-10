pipeline {
  agent {
    docker {
      image 'node:16'
    }

  }
  stages {
    stage('Build') {
      steps {
        sh 'npm install -v'
      }
    }

  }
}