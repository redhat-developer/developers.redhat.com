# Contributing to JBoss Developer
This document covers the various ways that a contribution can be made to JBoss Developer.
If you need any help understanding any of the steps, or you want to discuss you contribution, then [contact us](#contact).

# <a name="contact"></a> Contact the JBoss Developer Team
* IRC: `#jboss-developer` room on the `irc.freenode.net` IRC server
* Mailing list: [Subscribe](https://lists.jboss.org/mailman/listinfo/jbossdeveloper) to the jbossdeveloper@lists.jboss.org mailing list.

## <a name="fixing"></a> Fixing an Issue
To fix an issue:

1. Assign the JIRA issue to yourself if it isn't already

2. [Fork](https://github.com/jboss-developer/www.jboss.org/fork) the project. This creates the `www.jboss.org` project in your own Git with the default remote name 'origin'.

3. Clone your fork. This creates and populates a directory in your local file system.

        git clone https://github.com/<your-username>/www.jboss.org.git

4. Change to the `www.jboss.org` directory.

5. Add the remote `upstream` repository so you can fetch any changes to the original forked repository.

        git remote add upstream https://github.com/jboss-developer/jwww.jboss.org.git

6. Get the latest files from the `upstream` repository.

        git fetch upstream

7. Create a local topic branch to work with your new quickstart, features, changes, or fixes. 
   
        git checkout -b  <topic-branch-name>
   * If you are fixing a Bugzilla or JIRA, it is a good practice to use the number in the branch name. For new quickstarts or other fixes, try to use a good description for the branch name. 
   * The following are examples of Git checkout commands:

            git checkout -b DEVELOPER-123
            
8. Contribute new code or make changes to existing files.

9. Use the `git add` command to add new or changed file contents to the staging area.
     
10. Use the git status command to view the status of the files in the directory and in the staging area and ensure that all modified files are properly staged:

        git status      
          
11. Commit your changes to your local topic branch. Make sure you put the JIRA ID in the commit message. This is used by our CI automation to comment and transition the JIRA Issue.

        git commit -m 'DEVELOPER-123 Description of change...'
        
12. Update your branch with any changes made upstream since you started.
   * Fetch the latest changes from upstream

        git fetch upstream
        
   * Apply those changes to your branch
   
        git rebase upstream/master
        
   * If anyone has commited changes to files that you have also changed, you may see conflicts. 
   Resolve the conflicted files, add them using `git add`, and continue the rebase:
   
        git add <conflicted-file-name>
        git rebase --continue
        
   * If there were conflicts, it is a good idea to test your changes again to make they still work.
        
13. Push your local topic branch to your GitHub forked repository. This will create a branch on your Git fork repository with the same name as your local topic branch name. 

        git push origin HEAD            
   _Note:_ The above command assumes your remote repository is named 'origin'. You can verify your forked remote repository name using the command `git remote -v`.
   
14. Raise a Pull Request by:
 1. Visit https://github.com/jboss-developer/www.jboss.org
 2. Click on the "Compare and Pull Request" button next to your topic branch.
 3. Review your code changes and check that only the commit(s) you expect are present.
 4. Check that the PR title contains the JIRA ID and a short description.
 5. Click "Create Pull Request"

The Pull request will then be reviewed by the JBoss Developer team, and you may be requested to make changes. To make a change:

1. Ensure the clone on your computer is on the topic branch for this issue
2. Make the requested changes and commit them.
3. Push your branch to your fork on GitHub:

    git push origin DEVELOPER-123

4. Comment on the PR to indicate that you think you have made the requested changes.


## Developer Materials
Currently we have a number of different types of developer materials that can be searched from www.jboss.org/developer-materials. These are described as follows:

1. Quickstarts. These demonstrate a small number of technologies in as simple a way as possible. The guidelines are quite strict around the structure and scope of the quickstarts. This makes it easier for the JBoss Developer team to maintain the large quantity of quickstarts that we have and also gives the user a consistent experience. Currently we only support quickstarts that are located in one of the JBoss Developer quickstarts repositories on https://github.com/jboss-developer.
2. Demos. These are larger applications than quickstarts and don't have as strict guidelines. They can also be located in external repositories outside of the JBoss Developer GitHub organization.
3. Tutorials. These are much larger applications with thorough, high-quality documentation that steps the user through how to develop the application from scratch. Currently we just have [Ticket Monster](https://github.com/jboss-developer/ticket-monster) in this group. There are plans to add more in the future.

The following sections summarise how to contribute developer materials.

### How to Contribute a New Quickstart to an Existing JBoss Developer Repository
To contribute a new Quickstart to JBoss Developer:

1. Identify which JBoss Product or upstream Project it targets.
2. Find the appropriate quickstart repository. Most of the JBoss Product quickstart repositories are located in the [JBoss Developer GitHub organisation](https://github.com/jboss-developer). For example, see the [JBoss EAP quickstart repository](https://github.com/jboss-developer/jboss-eap-quickstarts).
3. Now follow the [Contribution guide](https://github.com/jboss-developer/jboss-developer-shared-resources/blob/master/guides/CONTRIBUTING.md).
4. The Quickstart will typically appear on the JBoss Developer site shortly after the next Product or Project release containing your contribution.

### How to Contribute a Change to an Existing Quickstart
To contribute an update (e.g bug-fix, typo-fix etc) to an existing quickstart:

1. Follow the [Contribution guide](https://github.com/jboss-developer/jboss-developer-shared-resources/blob/master/guides/CONTRIBUTING.md).
2. The Quickstart change will appear on the JBoss Developer site shortly after the next Product or Project release containing your contribution.

### How to contribute an Entire Repository of Quickstarts
If you have a repository of quickstarts that you think would be appropriate for JBoss Developer, then contact us.

### How to Contribute a New Demo
A demo is aimed more at demonstrating the features of a product, than at showing how to use a single API or use case. 
It is also more flexible in its structure and scope.
This is in contrast to a quickstart that must follow a very strict structure and needs to be limited to using a minimal amount of technologies.

See the [Demos contributing guide](https://github.com/jboss-developer/jboss-developer-demos/blob/master/CONTRIBUTING.md) for more details.


### How to Contribute a Tutorial
If you have a Tutorial that you think would be appropriate for JBoss Developer, then [contact us](#contact).

### How to Contribute an Existing Vimeo or YouTube Video
This process is used for contributing details of a Vimeo or YouTube video.

#### To add a Vimeo video to the site:

1. Visit https://vimeo.com/
2. Login with the `JBoss Developer` account.
3. Browse to the video you want to add to the site.
4. Click on `+ Collections`
5. In the albums area, tick each product that the video is related to. Just tick the `Miscellaneous` if it relates to no product. __Note:__ You will see several albums, only those entitled `Red Hat JBoss ...` are product albums.

#### To add a YouTube video to the site:
Add the URL of the video to the "YouTube Videos" sheet of this spreadsheet: https://docs.google.com/spreadsheets/d/1QbjVeU9avP8hcnaruiLtuanQVpkdClIYtgFSmaC_K9c/edit#gid=1504333800

__Note:__ YouTube videos cannot yet be associated with products.

#### If you can't add the video yourself, create a JIRA issue:

1. Visit: https://issues.jboss.org/secure/DEVELOPER/CreateIssue!default.jspa
2. Select: Project="Jboss Developer" and Issue Type = "Task"
3. Provide a summary
4. Provide a description, including:
4.1 The link to the video you want to add
4.2 The name of the JBoss product it relates to (if any)
5. Click `create`



## How to Make Changes to the Product Pages
The product pages are those linked from www.jboss.org/products.
This section covers the various contributions that can be made to these pages.

### How to Request a new product download

1. Ensure the download is available in the [Download Manager](www.jboss.org/download-manager).
2. Raise a JIRA issue for the change request, specifying:
 1. The product and version to be released
 2. The `description` for the release. E.g: `Minor release of JBoss EAP 6.x series`
 3. The `tag_line` for the release. E.g: `Features an updated administrative console that includes a new homepage and exposes the new JBoss EAP patching feature.  Also includes domain recovery improvements and support for CDI injection with PicketLink.  Try it today!`
 4. The `release_date`
3. If the product download has a non-zero micro/patch version (e.g 2.0.1), then the Product Manager will need to approve the change.

### How to add a new product download
These steps will no longer be required when the downloads are automatically fetched from the download manager.

1. Add a download item to the associated product's `product.yml` file. As an example here is [JBoss EAP's product.yml](https://github.com/jboss-developer/www.jboss.org/blob/master/products/eap/_common/product.yml)
2. Update the `current_version:` field in the `product.yml` if you are adding a GA release (i.e. not an Alpha or Beta).
3. Build the site locally
4. Visit the download page on your local build to verify the download is appearing correctly
5. Inspect each of the download links and paste the part after `http://www.jboss.org/download-manager/file` into the associated `Short URL` field of the download item in the [Download Manager](www.jboss.org/download-manager). Take a look at existing downloads for examples. Remember the preceding `/` character. 
6. [Raise a PR](#fixing) for your change.


### How to Highlight a particular Developer material
A particular developer material can be highlighted on each product's developer materials page.
For example, notice the banner visible on [the EAP Developer Materials page](http://www.jboss.org/products/eap/developer-materials/#!projectCode=eap).
To change this:

1. [Create a JIRA issue](https://issues.jboss.org/secure/DEVELOPER/CreateIssue!default.jspa) for your change. Include:
1.1 When you would like the new banner should go live, and when it should expire.
1.2 Any existing image or idea of what the image should look like.
1.3 The link to the developer material that should be associated with the image. This needs to be a link to the details page. See existing banners for examples.

On approval of the change:

1. Create a DESIGN issue to have a graphic created.
1.2 On completion of graphic creation, a link to the graphic (hosted on http://design.jboss.org/) should be added to the DEVELOPER issue.
2. Update the `featured_items` entry in the product's `product.yml` file (e.g. for EAP: `/products/eap/_common/product.yml`). Changing:
2.1 `image_url`: This is the address of the graphic created by the DESIGN JIRA issue and linked in the DEVELOPER issue.
2.2 `title`: The title of the item being linked to.
2.3 `text`: A short description of the item being linked to.
2.4 `url`: A url to the developer material's details page on www.jboss.org.
3. [Raise a PR](#fixing) for your change.


### How to Make a General Change to The Product Pages
Other changes to the product pages should go through the following process.
Multiple changes should be done separately, rather than grouped together as one big change.
This makes it easier to discuss the changes individually and aids scheduling of non-trivial changes.
If you are requesting a series of text changes, then putting them in a single issue will probably be fine.

1. Raise a JIRA issue for the change request.
2. If you intend to make the code change, assign to yourself. Otherwise leave unassigned.
3. The Product Marketing Manager (PMM) of the related product approves/rejects the change.
4. Make the changes to the code.
5. [Raise a PR](#fixing) for your change.
6. The PMM and JBoss Developer team review the PR
7. The PR is merged.

### How to add/remove an item to the Training section
See the [EAP Product Overview Page](http://www.jboss.org/products/eap/overview/) on the right-hand-side for an example of the training links.

1. Raise a JIRA issue for the change request. Include:
 1. The link to the training overview page.
 2. The link text to display on the product overview page.
2. If you intend to make the code change, assign to yourself. Otherwise leave unassigned.
3. Add the Link to the product's `featured_training.adoc` file. E.g. see [EAP's featured_training.adoc file](https://github.com/jboss-developer/www.jboss.org/blob/master/products/eap/_common/featured_training.adoc).
4. [Raise a PR](#fixing) for your change.

### How to add/remove an item to the Webinars section
See the [EAP Product Overview Page](http://www.jboss.org/products/eap/overview/) on the right-hand-side for an example of the Webinars links.

1. Raise a JIRA issue for the change request. Include:
 1. The link to the Webinar overview page.
 2. The link text to display on the product overview page.
2. If you intend to make the code change, assign to yourself. Otherwise leave unassigned.
3. Create a thumbnail image for the webinar and add it to the associated product's directory under `/images/products/`. You can probably grab a thumbnail from the webinar's details page.
4. Add the details to the product's `featured_webinar.adoc` file. E.g. see [EAP's featured_webinar.adoc file](https://github.com/jboss-developer/www.jboss.org/blob/master/products/eap/_common/featured_webinar.adoc). Use existing links as an example of the format.
5. [Raise a PR](#fixing) for your change.



## Upstream Projects
The upstream projects page is located at http://www.jboss.org/projects.
This section covers details on how to make changes to the data visible on this page.

## How to Add a New Upstream Project

1. Create a properties file for your project. For example, see the [Netty properties file](https://github.com/jboss-developer/project-properties/blob/master/netty.properties).
2. Upload the file to some externally visible location. For example, the projects source repository.
3. Send a link to the properties file to help@jboss.org, asking for it to be added to http://www.jboss.org/projects.
4. Once the project appears on the projects page, check to see if it has an icon. If it doesn't, follow [these instructions](#icon) .

### How to Update an Upstream Project's details
If you provided a project properties file:

1. Make a change to the project's properties file.
2. Email help@jboss.org telling them that there is a change in the properties file that you would like reflecting on the `projects` page.

Otherwise, the data is being pulled from the project's Magnolia page:

1. Make the change on the project's Magnolia page.
2. Email help@jboss.org telling them that there is a change on the project's Magnolia page that you would like reflecting on the `projects` page.

### <a name="icon"></a> How to Change an Upstream Project's Icon
To change the icon currently displayed for a project on www.jboss.org/projects:

1. [Create a DESIGN JIRA issue](https://issues.jboss.org/secure/DESIGN/CreateIssue!default.jspa)
2. If you intend to do the following steps, assign to yourself. Otherwise leave unassigned.
3. Create a new image for the project
4. Using the `design` account, upload it to the project's directory on filemgmt.jboss.org. For example, the AeroGear logo is located at: `filemgmt.jboss.org:/static_htdocs/aerogear/images/aerogear_200x150.png`. Take care to follow the exact format as the image links are generated.
5. Wait a short while for caches to clear before it appears on www.jboss.org/projects.

## Other Site changes
This section covers miscellaneous contributions that can be made.

### How to add an Event
To have a new Event added to the Events page and (optionally) the homepage:

1. Add the event details to the [Events spreadsheet](https://docs.google.com/spreadsheets/d/12ZRFSz8TAay-GnNuF_5LipICmuns-HB_RcjGEPDi67k/edit#gid=1609962398)

If you don't have access:

1. Raise a [JIRA issue](https://issues.jboss.org/secure/DEVELOPER/CreateIssue!default.jspa)


### How to Change the Homepage Banner
To request a change to the banner on the homepage:

1. Raise a [JIRA issue](https://issues.jboss.org/secure/DEVELOPER/CreateIssue!default.jspa)
1.1 Specify when you would like the new banner to go live, and when it should expire.
1.2 If you have an existing image or an idea of what the image should look like, attach or link to it in the issue
1.3 Provide the link that should be followed when the user clicks on the banner.

On approval of the change:

1. [Create a DESIGN JIRA issue](https://issues.jboss.org/secure/DESIGN/CreateIssue!default.jspa) to have a desktop and mobile banner graphic created.
1.2 On completion of graphic creation, a link to the graphic (hosted on http://design.jboss.org/) should be added to the DEVELOPER issue (created above).
2. To change the image:
2.1 Add the mobile and desktop images to https://github.com/jboss-developer/www.jboss.org/tree/master/images/branding
2.2 Open https://github.com/jboss-developer/www.jboss.org/blob/master/index.html.slim
2.3 Change the '/ Hero Slider' section of the code:
2.3.1 Each `.large-24.slide` section represents an individual banner in the carousel in the order it shows on the site.
2.3.2 Either replace an existing item, or add a new one in the right place.
2.3.3 Remember to remove any old images if you remove the item from the carousel.
2.3.4 Remember to set the link, image and alt text for the banner you are adding.
3. [Raise a PR](#fixing) for your change.

## General changes
If you have a general change that doesn't fall into the categories above, create a [JIRA issue](https://issues.jboss.org/secure/DEVELOPER/CreateIssue!default.jspa).

## General Feedback
[contact us](#contact) for general feedback that doesn't constitute a bug report or feature request.

## Feature Requests and Bug reporting
If you find a bug on www.jboss.org or if you have a feature request, please file a [JIRA issue](https://issues.jboss.org/secure/DEVELOPER/CreateIssue!default.jspa).
