#
# Prints out the boot logs for Drupal in the preview environment
#
#!/usr/bin/env bash
set -e

OC=$(which oc)
if [[ oc == '' ]]; then
    echo "Please install the Openshift Command Line Client"
    exit 1
fi

PULL_REQUEST_ID=$1

if [[ $PULL_REQUEST_ID == '' ]]; then
    echo "Please specific a pull request id"
    exit 1
fi

DIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" >/dev/null && pwd )"
if [[ -f "$DIR/oc-config.sh" ]]; then
    source "$DIR/oc-config.sh"
fi

${OC} login manage.us-west.dc.preprod.paas.redhat.com -u ${OC_USER}
${OC} project rhdp--preview

echo "[[ BOOTSTRAP ENV LOGS ]]"
${OC} logs drupal-deployment-preview-$PULL_REQUEST_ID-0 -c developer-bootstrap-env

echo "[[ BOOTSTRAP DRUPAL LOGS ]]"
${OC} logs drupal-deployment-preview-$PULL_REQUEST_ID-0 -c developer-bootstrap-drupal