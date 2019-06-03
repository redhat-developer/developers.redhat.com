@Library('RedHatDevelopersPipelineUtils')
import com.redhat.developer.pr.*
import com.redhat.developer.mp.*

properties([
        [$class: 'ParametersDefinitionProperty', parameterDefinitions:
                [
                        [$class: 'hudson.model.StringParameterDefinition', defaultValue: '', description: 'The id of the Pull Request that should be built.', name: 'PULL_REQUEST_ID'],
                        [$class: 'hudson.model.StringParameterDefinition', defaultValue: '', description: 'The current ref that is being built.', name: 'PULL_REQUEST_REF'],
                ]
        ]
])


node('cic-rhd-01') {

    timeout(60) {

        stage("Sanity Check") {

            if(!params.PULL_REQUEST_ID) {
                error "Please provide a pull request id."
            }

            if(!params.PULL_REQUEST_REF) {
                error "Please provide the ref of the pull request being built."
            }
        }

        def cause = "${params.PULL_REQUEST_REF}-${env.BUILD_NUMBER}"

        withCredentials([[$class: 'UsernamePasswordMultiBinding', credentialsId: 'redhat-developer-automated', usernameVariable: 'USERNAME', passwordVariable: 'PASSWORD']]) {
            String jenkinsJob = "https://jenkins.paas.redhat.com/generic-webhook-trigger/invoke?token=rhdp-pr-build"
            scheduleMpBuild(pullRequestId: "${params.PULL_REQUEST_ID}", cause: cause, jenkinsJob: jenkinsJob, jenkinsUser: env.USERNAME, jenkinsPassword: env.PASSWORD)
        }

        withCredentials([[$class: 'UsernamePasswordMultiBinding', credentialsId: 'robpblake-github-token', usernameVariable: 'USERNAME', passwordVariable: 'PASSWORD']]) {
            waitForMpBuildToStart(gitRepository: 'robpblake/developers.redhat.com', pullRequestRef: "${params.PULL_REQUEST_REF}", cause: cause, gitApiCredentials: "${env.PASSWORD}")
        }
    }
}