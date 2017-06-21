## Drupal Data Docker Container

The code in this directory generates the redhatdeveloper/drupal-data and redhatdeveloper/drupal-data-lite Docker data
container images.

These images contain a copy of the latest production Drupal configuration and database. This data can then be exposed
as a volume from the Data container and mounted into other Drupal containers to ensure that the Drupal instance runs
with the latest production data.

The difference between the redhatdeveloper/drupal-data and redhatdeveloper/drupal-data-lite image is that the "lite"
version contains a production database dump with all of the revision history for content removed. 


### Docker builder pattern

