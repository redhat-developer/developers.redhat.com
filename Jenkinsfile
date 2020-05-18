/*
    This pipeline is used to send a webhook from the Developer Jenkins master to the Managed Platform Jenkins master to trigger
    the CI pipeline for this project.

    This pipeline expects to be executed via the GitHub Pull Request Builder Trigger and will explicitly fail if the required
    parameters are not set.
 */
@Library('RedHatDevelopersPipelineUtils')
import com.redhat.developer.pr.*
import com.redhat.developer.mp.*

node {

    timeout(120) {

        stage("Sanity Check") {

            if(!env.ghprbPullId) {
                error "Cannot locate expected environment variable 'ghprbPullId'. Has this been triggered by the Git Hub Pull Request Builder?"
            }

            if(!env.ghprbActualCommit) {
                error "Cannot locate expected environment variable 'ghprbActualCommit'. Has this been triggered by the Git Hub Pull Request Builder?"
            }
        }

        def cause = "${env.ghprbActualCommit}-${env.BUILD_NUMBER}"
        def context = env.ghprbCommentBody ? env.ghprbCommentBody.toString().trim() : ""
        def credentials = [
                usernamePassword(credentialsId: 'developers-redhat-com-automated-api-token', passwordVariable: 'JENKINS_USER_PASSWORD', usernameVariable: 'JENKINS_USER'),
                usernamePassword(credentialsId: 'redhat-developer-ci-github-api-token', passwordVariable: 'GITHUB_USER_PASSWORD', usernameVariable: 'GITHUB_USER')
        ]

        withCredentials(credentials) {

            /*
                Firstly trigger the job on jenkins.paas.redhat.com by sending a web-hook with the ID of the pull request that we're building and the cause
                defined as the current HEAD reference of the PR branch and then the current build number
             */
            def jenkinsJob = "https://jenkins.paas.redhat.com/generic-webhook-trigger/invoke?token=rhdp-pr-build"
            scheduleMpBuild(pullRequestId: "${env.ghprbPullId}", cause: cause, jenkinsJob: jenkinsJob, jenkinsUser: env.JENKINS_USER, jenkinsPassword: env.JENKINS_USER_PASSWORD, context: context)

            /*
                And then we wait for that build to appear to be running on jenkins.paas.redhat.com. In particular we're waiting to see the above cause appear on the list
                of statuses for our pull request.
             */
            waitForMpBuildToStart(gitRepository: 'redhat-developer/developers.redhat.com', pullRequestRef: "${env.ghprbActualCommit}", cause: cause, gitApiCredentials: env.GITHUB_USER_PASSWORD)
        }
    }
}
