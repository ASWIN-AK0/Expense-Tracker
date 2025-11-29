pipeline {
    agent any

    stages {

        stage('Checkout Code') {
            steps {
                git branch: 'main', url: 'https://github.com/ASWIN-AK0/Expense-Tracker.git'
            }
        }

        stage('Build Docker Image') {
            steps {
                script {
                    sh '''
                    docker build -t aswin/expense-tracker .
                    '''
                }
            }
        }

        stage('Push to Docker Hub') {
            steps {
                withCredentials([string(credentialsId: 'dockerhub_pass', variable: 'DOCKER_PASS')]) {
                    sh '''
                    echo $DOCKER_PASS | docker login -u ASWIN-AK0 --password-stdin
                    docker tag aswin/expense-tracker aswin/expense-tracker:latest
                    docker push aswin/expense-tracker:latest
                    '''
                }
            }
        }

        stage('Deploy Container') {
            steps {
                sh '''
                docker pull aswin/expense-tracker:latest
                docker stop expense || true
                docker rm expense || true
                docker run -d -p 3000:3000 --name expense aswin/expense-tracker:latest
                '''
            }
        }
    }
}
