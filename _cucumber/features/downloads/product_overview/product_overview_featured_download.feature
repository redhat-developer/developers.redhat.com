#@desktop
#@dm
#
#Feature: Product Download Page
#
#  Scenario Outline: Site visitor navigates to product Download page and can download latest available product.
#    Given I am on the Product Download page for <product_code>
#    Then the <product_code> download button should link to the latest available download
#
#    Examples: product downloads
#      | product_code |
#      | datagrid     |
#      | eap          |
#      | cdk          |
#      | devsuite     |
#      | devstudio    |
#      | rhel         |
#      | amq          |
#      | brms         |
#      | bpmsuite     |
#      | datavirt     |
#      | fuse         |
