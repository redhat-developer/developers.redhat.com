## Drupal Data Docker Container

The code in this directory generates the `redhatdeveloper/drupal-data` and `redhatdeveloper/drupal-data-lite` Docker data
container images.

These images contain a copy of the latest production Drupal configuration and database. This data can then be exposed
as a volume from the Data container and mounted into other Drupal containers to ensure that the Drupal instance runs
with the latest production data.

The difference between the `redhatdeveloper/drupal-data` and `redhatdeveloper/drupal-data-lite` image is that the "lite"
version contains a production database dump with all of the revision history for content removed. This is typically used
in the `drupal-dev` environment so as to minimise the boot time of the Drupal database.


### Docker builder pattern

To generate the drupal-data Docker image, we use the Docker builder pattern. By that we:

* Run the `backup` Docker container in the `drupal-production` environment to generate dumps of the current production configuration into this directory
* Run `docker build` with the Dockerfile in this directory to build a new image containing those dumps
* Push the resulting image to DockerHub as the `redhatdeveloper/drupal-data` image.
  
## Drupal Data Container build schedule
  
The `redhatdeveloper/drupal-data` container is built after every successful deployment to production. This means that
  as soon as the production configuration is changed, then the `latest` version of the data container will reflect that.
  
  Additionally the container is built each night as a cron job to ensure that any content created during the day is
  reflected in the data container.
  
### Drupal Data Lite build schedule
  
  The "lite" version of the `drupal-data` image is built as a downstream job of the Drupal Data container. This means
  that each time a new version of the `redhatdeveloper/drupal-data` is generated, a corresponding "lite" version is also
  generated.
  
## Using the Data Container to seed an environment with production data
  
  Environments such as `drupal-dev` and `drupal-pull-request` use the `volumes_from` docker-compose directive to mount
  volumes from the Data Container into known locations within the Drupal and MariaDB containers. In doing this, it
  automatically seeds that environment with the data contained with the Data Container. As an example:
  
  ```yaml
   drupal:
       build: ../../drupal
       ports:
         - "${DRUPAL_HOST_PORT}:80"
       links:
         - drupalmysql
       volumes:
         - ./rhd.settings.php:/var/www/drupal/web/sites/default/rhd.settings.php
         - ./rhd.settings.yml:/var/www/drupal/web/sites/default/rhd.settings.yml
       volumes_from:
        - drupal_data
    
   # Drupal production data
     drupal_data:
      image: redhatdeveloper/drupal-data:latest
      volumes:
       - /var/www/drupal/web/config/active
       - /var/www/drupal/web/sites/default/files
       - /docker-entrypoint-initdb.d
  ```
  
  In the example above taken from the `drupal-pull-request` environment, you can see that we define an instance of the 
  `drupal_data` data container and expose certain parts of the filesystem as volumes. Next the `drupal` service has a 
  `volumes_from` directive to load in those volumes into its own filesystem, meaning that it will now contain the latest
  data from production.
  
  Each time a pull request build is initiated, Jenkins will automatically check to see if a new version of the `redhatdeveloper/drupal-data`
  Docker container exists to ensure that PR builds are always running against the most recent production dump.
  
  
  