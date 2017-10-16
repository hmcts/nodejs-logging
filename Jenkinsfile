#!groovy

//noinspection GroovyAssignabilityCheck
properties(
    [[$class: 'GithubProjectProperty', projectUrlStr: 'https://github.com/hmcts/nodejs-logging'],
     pipelineTriggers([
         [$class: 'GitHubPushTrigger'],
         [$class: 'hudson.triggers.TimerTrigger', spec  : 'H 1 * * *']
     ])]
)

//noinspection GroovyUnusedAssignment jenkins requires _ if you don't import a class
@Library('Reform') _

String channel = '#jenkins-notifications'

node {
    try {
        stage('Checkout') {
            deleteDir()
            checkout scm
        }

        stage('Setup') {
            sh 'npm install'
        }

        stage('Test') {
            sh 'npm test'
        }
    } catch (Throwable err) {
        notifyBuildFailure channel: channel
        throw err
    }
    notifyBuildFixed channel: channel
}
