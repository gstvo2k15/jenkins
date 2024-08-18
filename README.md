# jenkins

Basic jenkins repo for cicd actions

## Pre-requisites

https://medium.com/deutsche-telekom-gurgaon/how-to-setup-ci-cd-pipeline-from-jenkins-to-gitlab-1ecb099f2cf4

https://handbook.gitlab.com/handbook/customer-success/demo-systems/tutorials/integrations/create-jenkins-pipeline/

### Main install steps

```
swapoff -a
sed -i '/ swap / s/^\(.\*\)$/#\1/g' /etc/fstab
dnf install java-1.8.0-openjdk -y
java -version
dnf install wget -y
```

```
wget -O /etc/yum.repos.d/jenkins.repo https://pkg.jenkins.io/redhat-stable/jenkins.repo
rpm --import https://pkg.jenkins.io/redhat-stable/jenkins.io.key
dnf repolist
dnf update -y
dnf install jenkins -y
systemctl status jenkins
systemctl enable --now jenkins
systemctl status jenkins
```

```
firewall-cmd --permanent --zone=public --add-port=8080/tcp
firewall-cmd --reload
firewall-cmd --list-all
systemctl status jenkins
tail -15f /var/log/messages
```

```
mkdir -p /etc/jenkins
vim /etc/jenkins/jenkins.conf
yum install java-11-openjdk java-11-openjdk-devel
java -version
systemctl restart jenkins
systemctl status jenkins
```

```
cat /var/lib/jenkins/secrets/initialAdminPassword
cat /var/lib/jenkins/secrets/master.key
cat /etc/jenkins/jenkins.conf
```

`http://192.168.1.31:8080/`

kloud
0dXXXXX5

Install plugins Gitlab, Gitlab API and Authentication

```
Token name:
Jenkins-Gitlab-API-Access
```

### Pipeline execution

- Create pipeline:
  `http://jenkins.XXXXX.org/view/all/newJob`

- Configure pipeline paste content of Jenkinsfile:
  `http://jenkins.XXXXX.org/job/checkpythoncode/configure`

- Execute pipeline:
  `http://jenkins.XXXXX.org/job/checkpythoncode/build?delay=0sec`

### Example of jenkinsfile for maven

```

node {

  def image
  def mvnHome = tool 'Maven3'


    stage ('checkout') {
        checkout([$class: 'GitSCM', branches: [[name: '*/master']], doGenerateSubmoduleConfigurations: false, extensions: [], submoduleCfg: [], userRemoteConfigs: [[credentialsId: '9ffd4ee4-3647-4a7d-a357-5e8746463282', url: 'https://bitbucket.org/ananthkannan/myawesomeangularapprepo/']]])
        }


    stage ('Build') {
            sh 'mvn -f MyAwesomeApp/pom.xml clean install'
        }

    stage ('archive') {
            archiveArtifacts '**/*.jar'
        }

    stage ('Docker Build') {
         // Build and push image with Jenkins' docker-plugin
        withDockerServer([uri: "tcp://localhost:4243"]) {

            withDockerRegistry([credentialsId: "fa32f95a-2d3e-4c7b-8f34-11bcc0191d70", url: "https://index.docker.io/v1/"]) {
            image = docker.build("ananthkannan/mywebapp", "MyAwesomeApp")
            image.push()

            }
        }
    }


    stage('docker stop container') {
        sh 'docker ps -f name=myContainer -q | xargs --no-run-if-empty docker container stop'
        sh 'docker container ls -a -fname=myContainer -q | xargs -r docker container rm'

    }

    stage ('Docker run') {

        image.run("-p 8085:8085 --rm --name myContainer")

    }
}
```
