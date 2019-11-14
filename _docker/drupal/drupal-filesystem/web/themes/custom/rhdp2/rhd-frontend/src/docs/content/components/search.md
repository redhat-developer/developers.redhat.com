---
title: "Search"
date: 2017-08-23T22:25:45-04:00
description: ""
draft: false
tags: ["component"]
categories: ["component"]
weight: 99
scripts: ["@patternfly/pfelement/pfelement.umd","@rhd/dp-search/dp-search"]
---

{{< code >}}<dp-search-app url="https://dcp2.jboss.org/v2/rest/search/developer_materials">
<dp-search-box slot="query"></dp-search-box>
<dp-search-filters title="Filter By" slot="filters">
    <dp-search-filter-group name="CONTENT TYPE" name="type">
        <!-- <dp-search-filter-item group="type" key="topic_page" value="topic_page" name="Topic">Topic</dp-search-filter-item> -->
        <dp-search-filter-item group="type" key="article" value="article" name="Articles">Articles</dp-search-filter-item>
        <!-- <dp-search-filter-item group="type" key="product" value="product" name="Product">Product</dp-search-filter-item> -->
        <dp-search-filter-item group="type" key="books" value="books" name="Books">Books</dp-search-filter-item>
        <dp-search-filter-item group="type" key="video_resource" value="video_resource" name="Videos">Videos</dp-search-filter-item>
        <dp-search-filter-item group="type" key="katacoda" value="katacoda_course,katacoda_individual_lesson" name="Interactive Tutorials">Interactive Tutorials</dp-search-filter-item>
        <!-- <dp-search-filter-item slot="secondary" group="type" key="katacoda_individual_lesson" value="katacoda_individual_lesson" name="Katacoda Individual Lesson">Katacoda Individual Lesson</dp-search-filter-item> -->
        <dp-search-filter-item slot="secondary" group="type" key="cheat_sheet" value="cheat_sheet" name="Cheat Sheet">Cheat Sheet</dp-search-filter-item>
        <dp-search-filter-item slot="secondary" group="type" key="coding_resource" value="coding_resource" name="Coding Resource">Coding Resource</dp-search-filter-item>
        <dp-search-filter-item slot="secondary" group="type" key="webpage" value="webpage" name="Webpage">Webpage</dp-search-filter-item>
        <dp-search-filter-item slot="secondary" group="type" key="assembly_page" value="assembly_page" name="New Assembly Page">New Assembly Page</dp-search-filter-item>
        <dp-search-filter-item slot="secondary" group="type" key="author" value="author" name="Author">Author</dp-search-filter-item>
        <dp-search-filter-item slot="secondary" group="type" key="learning_path" value="learning_path" name="Learning Guides">Learning Guides</dp-search-filter-item>
        <!-- <dp-search-filter-item slot="secondary" group="type" key="page" value="page" name="Old Drupal Page">Old Drupal Page</dp-search-filter-item> -->
        <!-- <dp-search-filter-item group="type" key="promotion_card" value="promotion_card" name="promotion_card">Promotion_card</dp-search-filter-item> -->
        <!-- <dp-search-filter-item group="type" key="promotion_page" value="promotion_page" name="promotion_page">promotion_page</dp-search-filter-item> -->
        <!-- <dp-search-filter-item group="type" key="rhd_microsite" value="rhd_microsite" name="rhd_microsite">rhd_microsite</dp-search-filter-item> -->
        <!-- <dp-search-filter-item group="type" key="landing_page_single_offer" value="landing_page_single_offer" name="SOLP">SOLP</dp-search-filter-item> -->
    </dp-search-filter-group>
    <dp-search-filter-group name="PRODUCT" name="product">
        <dp-search-filter-item group="rhd_taxonomy_product" facet="rhd_taxonomy_product" key="rhel" value="rhel" name="rhel">rhel</dp-search-filter-item>
        <dp-search-filter-item group="rhd_taxonomy_product" facet="rhd_taxonomy_product" key="openshift" value="openshift" name="OpenShift">OpenShift</dp-search-filter-item>
        <dp-search-filter-item group="rhd_taxonomy_product" facet="rhd_taxonomy_product" key="codeready" value="codeready" name="CodeReady">CodeReady</dp-search-filter-item>
        <dp-search-filter-item group="rhd_taxonomy_product" facet="rhd_taxonomy_product" key="jboss" value="jboss" name="jboss">jboss</dp-search-filter-item>
        <dp-search-filter-item group="rhd_taxonomy_product" facet="rhd_taxonomy_product" key="development" value="development" name="development">development</dp-search-filter-item>
        <dp-search-filter-item slot="secondary" group="rhd_taxonomy_product" facet="rhd_taxonomy_product" key="application" value="application" name="application (RHOAR)">application</dp-search-filter-item>
        <dp-search-filter-item slot="secondary" group="rhd_taxonomy_product" facet="rhd_taxonomy_product" key="data" value="data" name="data">data</dp-search-filter-item>
        <dp-search-filter-item slot="secondary" group="rhd_taxonomy_product" facet="rhd_taxonomy_product" key="manager" value="manager" name="manager">manager</dp-search-filter-item>
        <dp-search-filter-item slot="secondary" group="rhd_taxonomy_product" facet="rhd_taxonomy_product" key="collections" value="collections" name="collections">collections</dp-search-filter-item>
        <dp-search-filter-item slot="secondary" group="rhd_taxonomy_product" facet="rhd_taxonomy_product" key="kit" value="kit" name="kit">kit</dp-search-filter-item>
        <dp-search-filter-item slot="secondary" group="rhd_taxonomy_product" facet="rhd_taxonomy_product" key="platform" value="platform" name="platform">platform</dp-search-filter-item>
    </dp-search-filter-group>
    <dp-search-filter-group name="PRODUCT LINE" key="product_line">
        <dp-search-filter-item group="product_line" facet="rhd_taxonomy_product_line" key="rhel" value="rhel" name="rhel">rhel</dp-search-filter-item>
        <dp-search-filter-item group="product_line" facet="rhd_taxonomy_product_line" key="openshift" value="openshift" name="openshift">openshift</dp-search-filter-item>
        <dp-search-filter-item group="product_line" facet="rhd_taxonomy_product_line" key="codeready" value="codeready" name="codeready">codeready</dp-search-filter-item>
        <dp-search-filter-item group="product_line" facet="rhd_taxonomy_product_line" key="middleware" value="middleware" name="middleware">middleware</dp-search-filter-item>
        <dp-search-filter-item group="product_line" facet="rhd_taxonomy_product_line" key="integration" value="integration" name="integration">integration</dp-search-filter-item>
        <dp-search-filter-item slot="secondary" group="product_line" facet="rhd_taxonomy_product_line" key="application" value="application" name="application">application</dp-search-filter-item>
        <dp-search-filter-item slot="secondary" group="product_line" facet="rhd_taxonomy_product_line" key="runtimes" value="runtimes" name="runtimes">runtimes</dp-search-filter-item>
        <dp-search-filter-item slot="secondary" group="product_line" facet="rhd_taxonomy_product_line" key="automation" value="automation" name="automation">automation</dp-search-filter-item>
        <dp-search-filter-item slot="secondary" group="product_line" facet="rhd_taxonomy_product_line" key="process" value="process" name="process">process</dp-search-filter-item>
    </dp-search-filter-group>
    <dp-search-filter-group name="TOPIC" key="topic">
        <dp-search-filter-item group="topic" facet="rhd_taxonomy_topic" key="linux" value="linux" name="Linux">Linux</dp-search-filter-item>
        <dp-search-filter-item group="topic" facet="rhd_taxonomy_topic" key="containers" value="containers" name="Containers">Containers</dp-search-filter-item>
        <dp-search-filter-item group="topic" facet="rhd_taxonomy_topic" key="kubernetes" value="kubernetes" name="Kubernetes">Kubernetes</dp-search-filter-item>
        <dp-search-filter-item group="topic" facet="rhd_taxonomy_topic" key="microservices" value="microservices" name="Microservices">Microservices</dp-search-filter-item>
        <dp-search-filter-item group="topic" facet="rhd_taxonomy_topic" key="java" value="java" name="Java">Java</dp-search-filter-item>
        <dp-search-filter-item slot="secondary" group="topic" facet="rhd_taxonomy_topic" key="c" value="c" name="C">C</dp-search-filter-item>
        <dp-search-filter-item slot="secondary" group="topic" facet="rhd_taxonomy_topic" key="devops" value="devops" name="DevOps">DevOps</dp-search-filter-item>
        <dp-search-filter-item slot="secondary" group="topic" facet="rhd_taxonomy_topic" key="security" value="security" name="security">security</dp-search-filter-item>
        <dp-search-filter-item slot="secondary" group="topic" facet="rhd_taxonomy_topic" key="boot" value="boot" name="boot">boot</dp-search-filter-item>
        <dp-search-filter-item slot="secondary" group="topic" facet="rhd_taxonomy_topic" key="spring" value="spring" name="spring">spring</dp-search-filter-item>
        <dp-search-filter-item slot="secondary" group="topic" facet="rhd_taxonomy_topic" key="mesh" value="mesh" name="mesh">mesh</dp-search-filter-item>
        <dp-search-filter-item slot="secondary" group="topic" facet="rhd_taxonomy_topic" key="serverless" value="serverless" name="serverless">serverless</dp-search-filter-item>
        <dp-search-filter-item slot="secondary" group="topic" facet="rhd_taxonomy_topic" key="service" value="service" name="service">service</dp-search-filter-item>
        <dp-search-filter-item slot="secondary" group="topic" facet="rhd_taxonomy_topic" key="developer" value="developer" name="developer">developer</dp-search-filter-item>
        <dp-search-filter-item slot="secondary" group="topic" facet="rhd_taxonomy_topic" key="tools" value="tools" name="tools">tools</dp-search-filter-item>
    </dp-search-filter-group>
</dp-search-filters>
<dp-search-active-filters title="Active Filters:">
        <dp-search-filter-active-item group="type" key="article" value="article" name="Article">Article</dp-search-filter-active-item>
        <dp-search-filter-active-item group="type" key="webpage" value="webpage" name="webpage">webpage</dp-search-filter-active-item>
        <dp-search-filter-active-item group="type" key="video_resource" value="video_resource" name="video_resource">video_resource</dp-search-filter-active-item>
        <dp-search-filter-active-item group="type" key="page" value="page" name="page">page</dp-search-filter-active-item>
        <dp-search-filter-active-item group="type" key="product" value="product" name="product">product</dp-search-filter-active-item>
        <dp-search-filter-active-item group="type" key="coding_resource" value="coding_resource" name="coding_resource">coding_resource</dp-search-filter-active-item>
        <dp-search-filter-active-item group="type" key="books" value="books" name="books">books</dp-search-filter-active-item>
        <dp-search-filter-active-item group="type" key="assembly_page" value="assembly_page" name="assembly_page">assembly_page</dp-search-filter-active-item>
        <dp-search-filter-active-item group="type" key="topic_page" value="topic_page" name="topic_page">topic_page</dp-search-filter-active-item>
        <dp-search-filter-active-item group="type" key="promotion_card" value="promotion_card" name="promotion_card">promotion_card</dp-search-filter-active-item>
        <dp-search-filter-active-item group="type" key="cheat_sheet" value="cheat_sheet" name="cheat_sheet">cheat_sheet</dp-search-filter-active-item>
        <dp-search-filter-active-item group="type" key="promotion_page" value="promotion_page" name="promotion_page">promotion_page</dp-search-filter-active-item>
        <dp-search-filter-active-item group="type" key="katacoda_individual_lesson" value="katacoda_individual_lesson" name="katacoda_individual_lesson">katacoda_individual_lesson</dp-search-filter-active-item>
        <dp-search-filter-active-item group="type" key="rhd_microsite" value="rhd_microsite" name="rhd_microsite">rhd_microsite</dp-search-filter-active-item>
        <dp-search-filter-active-item group="type" key="author" value="author" name="author">author</dp-search-filter-active-item>
        <dp-search-filter-active-item group="type" key="learning_path" value="learning_path" name="learning_path">learning_path</dp-search-filter-active-item>
        <dp-search-filter-active-item group="type" key="katacoda_course" value="katacoda_course" name="katacoda_course">katacoda_course</dp-search-filter-active-item>
        <dp-search-filter-active-item group="type" key="landing_page_single_offer" value="landing_page_single_offer" name="SOLP">SOLP</dp-search-filter-active-item>
        <dp-search-filter-active-item group="rhd_taxonomy_product" key="application" value="application" name="application">application</dp-search-filter-active-item>
        <dp-search-filter-active-item group="rhd_taxonomy_product" key="openshift" value="openshift" name="openshift">openshift</dp-search-filter-active-item>
        <dp-search-filter-active-item group="rhd_taxonomy_product" key="codeready" value="codeready" name="codeready">codeready</dp-search-filter-active-item>
        <dp-search-filter-active-item group="rhd_taxonomy_product" key="data" value="data" name="data">data</dp-search-filter-active-item>
        <dp-search-filter-active-item group="rhd_taxonomy_product" key="jboss" value="jboss" name="jboss">jboss</dp-search-filter-active-item>
        <dp-search-filter-active-item group="rhd_taxonomy_product" key="manager" value="manager" name="manager">manager</dp-search-filter-active-item>
        <dp-search-filter-active-item group="rhd_taxonomy_product" key="collections" value="collections" name="collections">collections</dp-search-filter-active-item>
        <dp-search-filter-active-item group="rhd_taxonomy_product" key="development" value="development" name="development">development</dp-search-filter-active-item>
        <dp-search-filter-active-item group="rhd_taxonomy_product" key="kit" value="kit" name="kit">kit</dp-search-filter-active-item>
        <dp-search-filter-active-item group="rhd_taxonomy_product" key="platform" value="platform" name="platform">platform</dp-search-filter-active-item>
        <dp-search-filter-active-item group="rhd_taxonomy_product" key="rhel" value="rhel" name="rhel">rhel</dp-search-filter-active-item>
        <dp-search-filter-active-item group="product_line" key="middleware" value="middleware" name="middleware">middleware</dp-search-filter-active-item>
        <dp-search-filter-active-item group="product_line" key="codeready" value="codeready" name="codeready">codeready</dp-search-filter-active-item>
        <dp-search-filter-active-item group="product_line" key="integration" value="integration" name="integration">integration</dp-search-filter-active-item>
        <dp-search-filter-active-item group="product_line" key="rhel" value="rhel" name="rhel">rhel</dp-search-filter-active-item>
        <dp-search-filter-active-item group="product_line" key="application" value="application" name="application">application</dp-search-filter-active-item>
        <dp-search-filter-active-item group="product_line" key="runtimes" value="runtimes" name="runtimes">runtimes</dp-search-filter-active-item>
        <dp-search-filter-active-item group="product_line" key="automation" value="automation" name="automation">automation</dp-search-filter-active-item>
        <dp-search-filter-active-item group="product_line" key="process" value="process" name="process">process</dp-search-filter-active-item>
        <dp-search-filter-active-item group="product_line" key="openshift" value="openshift" name="openshift">openshift</dp-search-filter-active-item>
        <dp-search-filter-active-item group="topic" key="linux" value="linux" name="Linux">Linux</dp-search-filter-active-item>
        <dp-search-filter-active-item group="topic" key="microservices" value="microservices" name="Microservices">Microservices</dp-search-filter-active-item>
        <dp-search-filter-active-item group="topic" key="java" value="java" name="Java">Java</dp-search-filter-active-item>
        <dp-search-filter-active-item group="topic" key="containers" value="containers" name="Containers">Containers</dp-search-filter-active-item>
        <dp-search-filter-active-item group="topic" key="kubernetes" value="kubernetes" name="Kubernetes">Kubernetes</dp-search-filter-active-item>
        <dp-search-filter-active-item group="topic" key="c" value="c" name="C">C</dp-search-filter-active-item>
        <dp-search-filter-active-item group="topic" key="devops" value="devops" name="DevOps">DevOps</dp-search-filter-active-item>
        <dp-search-filter-active-item group="topic" key="security" value="security" name="security">security</dp-search-filter-active-item>
        <dp-search-filter-active-item group="topic" key="boot" value="boot" name="boot">boot</dp-search-filter-active-item>
        <dp-search-filter-active-item group="topic" key="spring" value="spring" name="spring">spring</dp-search-filter-active-item>
        <dp-search-filter-active-item group="topic" key="mesh" value="mesh" name="mesh">mesh</dp-search-filter-active-item>
        <dp-search-filter-active-item group="topic" key="serverless" value="serverless" name="serverless">serverless</dp-search-filter-active-item>
        <dp-search-filter-active-item group="topic" key="service" value="service" name="service">service</dp-search-filter-active-item>
        <dp-search-filter-active-item group="topic" key="developer" value="developer" name="developer">developer</dp-search-filter-active-item>
        <dp-search-filter-active-item group="topic" key="tools" value="tools" name="tools">tools</dp-search-filter-active-item>
</dp-search-active-filters>
<dp-search-result-count></dp-search-result-count>
<dp-search-sort-page></dp-search-sort-page>
<dp-search-onebox url="../../json/onebox.json"></dp-search-onebox>
<dp-search-results></dp-search-results>
<dp-search-query url="https://api.developers.stage.redhat.com/search/"></dp-search-query>
</dp-search-app>
<a href="#top" id="scroll-to-top"></a>
{{< /code >}}

<!--
<dp-search-app url="https://dcp2.jboss.org/v2/rest/search/developer_materials">
<dp-search-box slot="query"></dp-search-box>
<dp-search-filters title="Filter By" slot="filters">
    <dp-search-filter-group name="CONTENT TYPE" name="type">
        <dp-search-filter-item group="type" key="article" value="article" name="Article">Article</dp-search-filter-item>
        <dp-search-filter-item group="type" key="webpage" value="webpage" name="webpage">webpage</dp-search-filter-item>
        <dp-search-filter-item group="type" key="video_resource" value="video_resource" name="video_resource">video_resource</dp-search-filter-item>
        <dp-search-filter-item group="type" key="page" value="page" name="page">page</dp-search-filter-item>
        <dp-search-filter-item group="type" key="product" value="product" name="product">product</dp-search-filter-item>
        <dp-search-filter-item group="type" key="coding_resource" value="coding_resource" name="coding_resource">coding_resource</dp-search-filter-item>
        <dp-search-filter-item group="type" key="books" value="books" name="books">books</dp-search-filter-item>
        <dp-search-filter-item group="type" key="assembly_page" value="assembly_page" name="assembly_page">assembly_page</dp-search-filter-item>
        <dp-search-filter-item group="type" key="topic_page" value="topic_page" name="topic_page">topic_page</dp-search-filter-item>
        <dp-search-filter-item group="type" key="promotion_card" value="promotion_card" name="promotion_card">promotion_card</dp-search-filter-item>
        <dp-search-filter-item group="type" key="cheat_sheet" value="cheat_sheet" name="cheat_sheet">cheat_sheet</dp-search-filter-item>
        <dp-search-filter-item group="type" key="promotion_page" value="promotion_page" name="promotion_page">promotion_page</dp-search-filter-item>
        <dp-search-filter-item group="type" key="katacoda_individual_lesson" value="katacoda_individual_lesson" name="katacoda_individual_lesson">katacoda_individual_lesson</dp-search-filter-item>
        <dp-search-filter-item group="type" key="rhd_microsite" value="rhd_microsite" name="rhd_microsite">rhd_microsite</dp-search-filter-item>
        <dp-search-filter-item group="type" key="author" value="author" name="author">author</dp-search-filter-item>
        <dp-search-filter-item group="type" key="learning_path" value="learning_path" name="learning_path">learning_path</dp-search-filter-item>
        <dp-search-filter-item group="type" key="katacoda_course" value="katacoda_course" name="katacoda_course">katacoda_course</dp-search-filter-item>
        <dp-search-filter-item group="type" key="landing_page_single_offer" value="landing_page_single_offer" name="SOLP">SOLP</dp-search-filter-item>
    </dp-search-filter-group>
    <dp-search-filter-group name="PRODUCT" name="product">
        <dp-search-filter-item group="rhd_taxonomy_product" facet="rhd_taxonomy_product" key="application" value="application" name="application">application</dp-search-filter-item>
        <dp-search-filter-item group="rhd_taxonomy_product" facet="rhd_taxonomy_product" key="openshift" value="openshift" name="openshift">openshift</dp-search-filter-item>
        <dp-search-filter-item group="rhd_taxonomy_product" facet="rhd_taxonomy_product" key="codeready" value="codeready" name="codeready">codeready</dp-search-filter-item>
        <dp-search-filter-item group="rhd_taxonomy_product" facet="rhd_taxonomy_product" key="data" value="data" name="data">data</dp-search-filter-item>
        <dp-search-filter-item group="rhd_taxonomy_product" facet="rhd_taxonomy_product" key="jboss" value="jboss" name="jboss">jboss</dp-search-filter-item>
        <dp-search-filter-item group="rhd_taxonomy_product" facet="rhd_taxonomy_product" key="manager" value="manager" name="manager">manager</dp-search-filter-item>
        <dp-search-filter-item group="rhd_taxonomy_product" facet="rhd_taxonomy_product" key="collections" value="collections" name="collections">collections</dp-search-filter-item>
        <dp-search-filter-item group="rhd_taxonomy_product" facet="rhd_taxonomy_product" key="development" value="development" name="development">development</dp-search-filter-item>
        <dp-search-filter-item group="rhd_taxonomy_product" facet="rhd_taxonomy_product" key="kit" value="kit" name="kit">kit</dp-search-filter-item>
        <dp-search-filter-item group="rhd_taxonomy_product" facet="rhd_taxonomy_product" key="platform" value="platform" name="platform">platform</dp-search-filter-item>
        <dp-search-filter-item group="rhd_taxonomy_product" facet="rhd_taxonomy_product" key="rhel" value="rhel" name="rhel">rhel</dp-search-filter-item>
    </dp-search-filter-group>
    <dp-search-filter-group name="PRODUCT LINE" key="product_line">
        <dp-search-filter-item group="product_line" facet="rhd_taxonomy_product_line" key="middleware" value="middleware" name="middleware">middleware</dp-search-filter-item>
        <dp-search-filter-item group="product_line" facet="rhd_taxonomy_product_line" key="codeready" value="codeready" name="codeready">codeready</dp-search-filter-item>
        <dp-search-filter-item group="product_line" facet="rhd_taxonomy_product_line" key="integration" value="integration" name="integration">integration</dp-search-filter-item>
        <dp-search-filter-item group="product_line" facet="rhd_taxonomy_product_line" key="rhel" value="rhel" name="rhel">rhel</dp-search-filter-item>
        <dp-search-filter-item group="product_line" facet="rhd_taxonomy_product_line" key="application" value="application" name="application">application</dp-search-filter-item>
        <dp-search-filter-item group="product_line" facet="rhd_taxonomy_product_line" key="runtimes" value="runtimes" name="runtimes">runtimes</dp-search-filter-item>
        <dp-search-filter-item group="product_line" facet="rhd_taxonomy_product_line" key="automation" value="automation" name="automation">automation</dp-search-filter-item>
        <dp-search-filter-item group="product_line" facet="rhd_taxonomy_product_line" key="process" value="process" name="process">process</dp-search-filter-item>
        <dp-search-filter-item group="product_line" facet="rhd_taxonomy_product_line" key="openshift" value="openshift" name="openshift">openshift</dp-search-filter-item>
    </dp-search-filter-group>
    <dp-search-filter-group name="TOPIC" key="topic">
        <dp-search-filter-item group="topic" facet="rhd_taxonomy_topic" key="linux" value="linux" name="Linux">Linux</dp-search-filter-item>
        <dp-search-filter-item group="topic" facet="rhd_taxonomy_topic" key="microservices" value="microservices" name="Microservices">Microservices</dp-search-filter-item>
        <dp-search-filter-item group="topic" facet="rhd_taxonomy_topic" key="java" value="java" name="Java">Java</dp-search-filter-item>
        <dp-search-filter-item group="topic" facet="rhd_taxonomy_topic" key="containers" value="containers" name="Containers">Containers</dp-search-filter-item>
        <dp-search-filter-item group="topic" facet="rhd_taxonomy_topic" key="kubernetes" value="kubernetes" name="Kubernetes">Kubernetes</dp-search-filter-item>
        <dp-search-filter-item group="topic" facet="rhd_taxonomy_topic" key="c" value="c" name="C">C</dp-search-filter-item>
        <dp-search-filter-item group="topic" facet="rhd_taxonomy_topic" key="devops" value="devops" name="DevOps">DevOps</dp-search-filter-item>
        <dp-search-filter-item group="topic" facet="rhd_taxonomy_topic" key="security" value="security" name="security">security</dp-search-filter-item>
        <dp-search-filter-item group="topic" facet="rhd_taxonomy_topic" key="boot" value="boot" name="boot">boot</dp-search-filter-item>
        <dp-search-filter-item group="topic" facet="rhd_taxonomy_topic" key="spring" value="spring" name="spring">spring</dp-search-filter-item>
        <dp-search-filter-item group="topic" facet="rhd_taxonomy_topic" key="mesh" value="mesh" name="mesh">mesh</dp-search-filter-item>
        <dp-search-filter-item group="topic" facet="rhd_taxonomy_topic" key="serverless" value="serverless" name="serverless">serverless</dp-search-filter-item>
        <dp-search-filter-item group="topic" facet="rhd_taxonomy_topic" key="service" value="service" name="service">service</dp-search-filter-item>
        <dp-search-filter-item group="topic" facet="rhd_taxonomy_topic" key="developer" value="developer" name="developer">developer</dp-search-filter-item>
        <dp-search-filter-item group="topic" facet="rhd_taxonomy_topic" key="tools" value="tools" name="tools">tools</dp-search-filter-item>
    </dp-search-filter-group>
</dp-search-filters>
<dp-search-active-filters title="Active Filters:">
        <dp-search-filter-active-item group="type" key="article" value="article" name="Article">Article</dp-search-filter-active-item>
        <dp-search-filter-active-item group="type" key="webpage" value="webpage" name="webpage">webpage</dp-search-filter-active-item>
        <dp-search-filter-active-item group="type" key="video_resource" value="video_resource" name="video_resource">video_resource</dp-search-filter-active-item>
        <dp-search-filter-active-item group="type" key="page" value="page" name="page">page</dp-search-filter-active-item>
        <dp-search-filter-active-item group="type" key="product" value="product" name="product">product</dp-search-filter-active-item>
        <dp-search-filter-active-item group="type" key="coding_resource" value="coding_resource" name="coding_resource">coding_resource</dp-search-filter-active-item>
        <dp-search-filter-active-item group="type" key="books" value="books" name="books">books</dp-search-filter-active-item>
        <dp-search-filter-active-item group="type" key="assembly_page" value="assembly_page" name="assembly_page">assembly_page</dp-search-filter-active-item>
        <dp-search-filter-active-item group="type" key="topic_page" value="topic_page" name="topic_page">topic_page</dp-search-filter-active-item>
        <dp-search-filter-active-item group="type" key="promotion_card" value="promotion_card" name="promotion_card">promotion_card</dp-search-filter-active-item>
        <dp-search-filter-active-item group="type" key="cheat_sheet" value="cheat_sheet" name="cheat_sheet">cheat_sheet</dp-search-filter-active-item>
        <dp-search-filter-active-item group="type" key="promotion_page" value="promotion_page" name="promotion_page">promotion_page</dp-search-filter-active-item>
        <dp-search-filter-active-item group="type" key="katacoda_individual_lesson" value="katacoda_individual_lesson" name="katacoda_individual_lesson">katacoda_individual_lesson</dp-search-filter-active-item>
        <dp-search-filter-active-item group="type" key="rhd_microsite" value="rhd_microsite" name="rhd_microsite">rhd_microsite</dp-search-filter-active-item>
        <dp-search-filter-active-item group="type" key="author" value="author" name="author">author</dp-search-filter-active-item>
        <dp-search-filter-active-item group="type" key="learning_path" value="learning_path" name="learning_path">learning_path</dp-search-filter-active-item>
        <dp-search-filter-active-item group="type" key="katacoda_course" value="katacoda_course" name="katacoda_course">katacoda_course</dp-search-filter-active-item>
        <dp-search-filter-active-item group="type" key="landing_page_single_offer" value="landing_page_single_offer" name="SOLP">SOLP</dp-search-filter-active-item>
        <dp-search-filter-active-item group="rhd_taxonomy_product" key="application" value="application" name="application">application</dp-search-filter-active-item>
        <dp-search-filter-active-item group="rhd_taxonomy_product" key="openshift" value="openshift" name="openshift">openshift</dp-search-filter-active-item>
        <dp-search-filter-active-item group="rhd_taxonomy_product" key="codeready" value="codeready" name="codeready">codeready</dp-search-filter-active-item>
        <dp-search-filter-active-item group="rhd_taxonomy_product" key="data" value="data" name="data">data</dp-search-filter-active-item>
        <dp-search-filter-active-item group="rhd_taxonomy_product" key="jboss" value="jboss" name="jboss">jboss</dp-search-filter-active-item>
        <dp-search-filter-active-item group="rhd_taxonomy_product" key="manager" value="manager" name="manager">manager</dp-search-filter-active-item>
        <dp-search-filter-active-item group="rhd_taxonomy_product" key="collections" value="collections" name="collections">collections</dp-search-filter-active-item>
        <dp-search-filter-active-item group="rhd_taxonomy_product" key="development" value="development" name="development">development</dp-search-filter-active-item>
        <dp-search-filter-active-item group="rhd_taxonomy_product" key="kit" value="kit" name="kit">kit</dp-search-filter-active-item>
        <dp-search-filter-active-item group="rhd_taxonomy_product" key="platform" value="platform" name="platform">platform</dp-search-filter-active-item>
        <dp-search-filter-active-item group="rhd_taxonomy_product" key="rhel" value="rhel" name="rhel">rhel</dp-search-filter-active-item>
        <dp-search-filter-active-item group="product_line" key="middleware" value="middleware" name="middleware">middleware</dp-search-filter-active-item>
        <dp-search-filter-active-item group="product_line" key="codeready" value="codeready" name="codeready">codeready</dp-search-filter-active-item>
        <dp-search-filter-active-item group="product_line" key="integration" value="integration" name="integration">integration</dp-search-filter-active-item>
        <dp-search-filter-active-item group="product_line" key="rhel" value="rhel" name="rhel">rhel</dp-search-filter-active-item>
        <dp-search-filter-active-item group="product_line" key="application" value="application" name="application">application</dp-search-filter-active-item>
        <dp-search-filter-active-item group="product_line" key="runtimes" value="runtimes" name="runtimes">runtimes</dp-search-filter-active-item>
        <dp-search-filter-active-item group="product_line" key="automation" value="automation" name="automation">automation</dp-search-filter-active-item>
        <dp-search-filter-active-item group="product_line" key="process" value="process" name="process">process</dp-search-filter-active-item>
        <dp-search-filter-active-item group="product_line" key="openshift" value="openshift" name="openshift">openshift</dp-search-filter-active-item>
        <dp-search-filter-active-item group="topic" key="linux" value="linux" name="Linux">Linux</dp-search-filter-active-item>
        <dp-search-filter-active-item group="topic" key="microservices" value="microservices" name="Microservices">Microservices</dp-search-filter-active-item>
        <dp-search-filter-active-item group="topic" key="java" value="java" name="Java">Java</dp-search-filter-active-item>
        <dp-search-filter-active-item group="topic" key="containers" value="containers" name="Containers">Containers</dp-search-filter-active-item>
        <dp-search-filter-active-item group="topic" key="kubernetes" value="kubernetes" name="Kubernetes">Kubernetes</dp-search-filter-active-item>
        <dp-search-filter-active-item group="topic" key="c" value="c" name="C">C</dp-search-filter-active-item>
        <dp-search-filter-active-item group="topic" key="devops" value="devops" name="DevOps">DevOps</dp-search-filter-active-item>
        <dp-search-filter-active-item group="topic" key="security" value="security" name="security">security</dp-search-filter-active-item>
        <dp-search-filter-active-item group="topic" key="boot" value="boot" name="boot">boot</dp-search-filter-active-item>
        <dp-search-filter-active-item group="topic" key="spring" value="spring" name="spring">spring</dp-search-filter-active-item>
        <dp-search-filter-active-item group="topic" key="mesh" value="mesh" name="mesh">mesh</dp-search-filter-active-item>
        <dp-search-filter-active-item group="topic" key="serverless" value="serverless" name="serverless">serverless</dp-search-filter-active-item>
        <dp-search-filter-active-item group="topic" key="service" value="service" name="service">service</dp-search-filter-active-item>
        <dp-search-filter-active-item group="topic" key="developer" value="developer" name="developer">developer</dp-search-filter-active-item>
        <dp-search-filter-active-item group="topic" key="tools" value="tools" name="tools">tools</dp-search-filter-active-item>
</dp-search-active-filters>
<dp-search-result-count></dp-search-result-count>
<dp-search-sort-page></dp-search-sort-page>
<dp-search-onebox></dp-search-onebox>
<dp-search-results></dp-search-results>
<dp-search-query url="https://api.developers.stage.redhat.com/search/"></dp-search-query>
</dp-search-app>
<a href="#top" id="scroll-to-top"></a>
<script>
var inject = document.createElement('script')
inject.innerText = "System.import('/themes/custom/rhdp//@patternfly/pfelement/pfelement.umd.js');\n"+
"System.import('/themes/custom/rhdp/js/@fortawesome/fontawesome-svg-core/index.js');\n"+
"System.import('/themes/custom/rhdp/js/@fortawesome/pro-solid-svg-icons/index.js');\n"+
"System.import('/themes/custom/rhdp/js/@rhd/dp-search/dp-search-app.js');\n"+
"System.import('/themes/custom/rhdp/js/@rhd/dp-search/dp-search-box.js');\n"+
"System.import('/themes/custom/rhdp/js/@rhd/dp-search/dp-search-filter-group.js');\n"+
"System.import('/themes/custom/rhdp/js/@rhd/dp-search/dp-search-filter-item.js');\n"+
"System.import('/themes/custom/rhdp/js/@rhd/dp-search/dp-search-filters.js');\n"+
"System.import('/themes/custom/rhdp/js/@rhd/dp-search/dp-search-onebox.js');\n"+
"System.import('/themes/custom/rhdp/js/@rhd/dp-search/dp-search-query.js');\n"+
"System.import('/themes/custom/rhdp/js/@rhd/dp-search/dp-search-result-count.js');\n"+
"System.import('/themes/custom/rhdp/js/@rhd/dp-search/dp-search-result.js');\n"+
"System.import('/themes/custom/rhdp/js/@rhd/dp-search/dp-search-results.js');\n"+
"System.import('/themes/custom/rhdp/js/@rhd/dp-search/dp-search-sort-page.js');\n"+
"System.import('/themes/custom/rhdp/js/@rhd/dp-search/dp-search-url.js');\n"+
"System.import('/themes/custom/rhdp/js/@rhd/dp-search/dp-search-modal-filters.js');\n"+
"System.import('/themes/custom/rhdp/js/@rhd/dp-search/dp-search-active-filters.js');\n"+
"System.import('/themes/custom/rhdp/js/@rhd/dp-search/dp-search-filter-active-item.js');\n"+
"System.import('/themes/custom/rhdp//@patternfly/pfe-datetime/pfe-datetime.min.js');"
setTimeout(function() {document.body.appendChild(inject); }, 5000);
</script>
-->
