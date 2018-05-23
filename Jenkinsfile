pipeline {
  agent any
  stages {
    stage('build') {
      agent {
        docker {
          image 'rowanto/docker-java8-mvn-nodejs-npm'
        }

      }
      steps {
        sh 'mvn package'
      }
    }
  }
}