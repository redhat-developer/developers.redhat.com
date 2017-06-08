# Running the Video Migration

### Before running the video migration
 
 In order to run the video migration, you will need have a Drupal instance running. The [configuration file](./drupal_site_info.yml) uses
 http://127.0.0.1:8888 by default; however, you can change that to reflect your specific environment.
 
 Once you have your Drupal environment up and running, you will need to login and flush all caches. This is necessary as drupal won't recognize the content
 type without.
 
### Steps to Pushing Video Content

1. Navigate to the videos [directory](_docker/lib/videos)
2. Run the command:

    `ruby drupal_video_push.rb <env>`
3. The videos should begin parsing and pushing into the respective environment
4. Once all videos have been pushed, you will want to compare the sitemaps to make sure that all of
the expected videos have received and processed by Drupal's REST API.

### Running the Test for Successful Video Migration

1. Login to Drupal and flush all caches again.
2. Navigate to 'Configuration->Search and metadata->Simple XML Sitemap'
3. Click 'Regenerate Sitemap'
4. Flush all caches.
2. Navigate to the videos on your local machine - [videos directory](./videos)
3. Run the command:

    `ruby drupal_video_push_test.rb <env>`

This should pull down the current sitemap from the production instance of Drupal and compare it against sitemap from the 
selected environment.

Any videos that do not appear in the sitemap will be listed (with their relative path alias) to the console.
 
 
### What are the two JSON files in [video_data](./video_data)?

[Videos.json](./video_data/videos.json) is the list of video files that needs to be pushed into Drupal. It contains all(most) videos from our video spreadsheet as well as other videos
listed on the sitemap.

[Taxonomy_Terms.json](./video_data/videos.json) is an exported list of all tags currently in our Drupal instance. The tags field currently has numbers listed in [Videos.json](./video_data/videos.json). These
numbers relate to the appropriate 'tid' in Drupal. There is logic within drupal_video_push.rb that matches these id's to their appropriate tags.
