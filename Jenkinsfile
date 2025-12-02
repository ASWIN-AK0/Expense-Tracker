pipeline {
    agent any
    environment {
        MONGO_URI = credentials('mongo_uri')
    }

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
                    docker build -t 26032004/expense-tracker .
                    '''
                }
            }
        }

        stage('Push to Docker Hub') {
            steps {
                withCredentials([string(credentialsId: 'dockerhub_pass', variable: 'DOCKERHUB_TOKEN')]) {
                    sh '''
                    echo $DOCKERHUB_TOKEN | docker login -u 26032004 --password-stdin
                    docker push 26032004/expense-tracker:latest
                    '''
                }
            }
        }

        stage('Deploy Container') {
            steps {
                sh '''
                docker pull 26032004/expense-tracker:latest
                docker stop expense || true
                docker rm expense || true
                docker run -d -p 3000:3000 --name expense \
                  -e MONGO_URI="$MONGO_URI" \
                  26032004/expense-tracker:latest
                '''
            }
        }
    }
}
