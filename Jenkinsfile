pipeline {
    agent any

    stages {
        stage('Checkout') {
            steps {
                checkout([$class: 'GitSCM', branches: [[name: 'main']], extensions: [], userRemoteConfigs: [[url: 'https://github.com/vastevenson/jenkins-python-build-test-demo-vs.git']]])
            }
        }
        stage('Build') {
            steps {
                git branch: 'main', url: 'https://github.com/vastevenson/pytest-intro-vs.git'
                sh 'python3 -m venv venv'  // Crear un entorno virtual
                sh './venv/bin/pip install -r requirements.txt'  // Instalar dependencias desde un archivo requirements.txt
                sh './venv/bin/python ops.py'  // Ejecutar el script ops.py dentro del entorno virtual
            }
        }
        stage('Test') {
            steps {
                sh './venv/bin/pip install pytest'  // Instalar pytest en el entorno virtual
                sh './venv/bin/python -m pytest'  // Ejecutar pytest dentro del entorno virtual
            }
        }
    }
    post {
        always {
            // Limpiar el entorno virtual al final de la ejecución
            sh 'rm -rf venv'
        }
    }
}
