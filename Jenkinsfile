/*
    This pipeline is used to send a webhook from the legacy RHD Jenkins instance to the "new" Jenkins instance running on Managed Platform.

    This pipeline is not intended to be run directly, but instead called by our existing Jenkins Job and passed parameters from the GitHub Pull Request Builder
    plugin, namely the ID of the pull request that is being built and the SHA of the tip of that branch.
 */
@Library('RedHatDevelopersPipelineUtils')
import com.redhat.developer.pr.*
import com.redhat.developer.mp.*

properties([
        [$class: 'ParametersDefinitionProperty', parameterDefinitions:
                [
                        [$class: 'hudson.model.StringParameterDefinition', defaultValue: '', description: 'The id of the Pull Request that should be built.', name: 'PULL_REQUEST_ID'],
                        [$class: 'hudson.model.StringParameterDefinition', defaultValue: '', description: 'The current ref that is being built.', name: 'PULL_REQUEST_REF'],
                        [$class: 'hudson.model.StringParameterDefinition', defaultValue: 'rebuild this please', description: 'A context to be sent to the CI pipeline.', name: 'PULL_REQUEST_CONTEXT']
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

        /*
            Firstly trigger the job on jenkins.paas.redhat.com by sending a web-hook with the ID of the pull request that we're building and the cause
            defined as the current HEAD reference of the PR branch and then the current build number
         */
        withCredentials([[$class: 'UsernamePasswordMultiBinding', credentialsId: 'redhat-developer-automated', usernameVariable: 'USERNAME', passwordVariable: 'PASSWORD']]) {
            def jenkinsJob = "https://jenkins.paas.redhat.com/generic-webhook-trigger/invoke?token=rhdp-pr-build"
            scheduleMpBuild(pullRequestId: "${params.PULL_REQUEST_ID}", cause: cause, jenkinsJob: jenkinsJob, jenkinsUser: env.USERNAME, jenkinsPassword: env.PASSWORD, context: "${params.PULL_REQUEST_CONTEXT}")
        }

        /*
            And then we wait for that build to appear to be running on jenkins.paas.redhat.com. In particular we're waiting to see the above cause appear on the list
            of statuses for our pull request.
         */
        withCredentials([string(credentialsId: 'e4d8cc35-9cfd-4df5-a842-eed5f4b6faf0', variable: 'TOKEN')]) {
            waitForMpBuildToStart(gitRepository: 'redhat-developer/developers.redhat.com', pullRequestRef: "${params.PULL_REQUEST_REF}", cause: cause, gitApiCredentials: TOKEN)
        }
    }
}