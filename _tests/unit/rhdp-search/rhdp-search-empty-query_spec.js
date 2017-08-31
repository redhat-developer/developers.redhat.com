"use strict";
/* global RHDPSearchBox */
// Test rhdp-search-box component
describe('Search Empty Query', function() {

    var wc;

    beforeEach(function() {
       wc= document.createElement('rhdp-search-empty-query');
    });

    afterEach(function() {
        document.body.removeChild(document.body.firstChild);
    });


    describe('properties', function() {
        beforeEach(function() {
            document.body.insertBefore(wc, document.body.firstChild);
        });

        it('should update empty and message variables', function() {
            wc.setAttribute('empty', true);
            wc.setAttribute('message', 'test')
            expect(wc.empty).toEqual(true);
            expect(wc.message).toEqual('test');
        });

        it('should be false with no empty value', function() {
            wc.setAttribute('empty', '');
            expect(wc.empty).toEqual(false);
        });

        it('should be blank with no message value', function() {
            wc.setAttribute('message', '');
            expect(wc.message).toEqual('');
        });

    });

    // describe('with valid data', function() {
    //     var mockApp;
    //     var emptyQuery;
    //     beforeEach(function() {
    //         document.body.insertBefore(wc, document.body.firstChild);
    //         mockApp = document.createElement('rhdp-search-app');
    //         mockApp['filterObj'] = {"term":"","facets":[{"name":"CONTENT TYPE","key":"sys_type","items":[{"key":"archetype","name":"Archetype","value":["jbossdeveloper_archetype"],"type":["jbossdeveloper_archetype"]},{"key":"article","name":"Article","value":["article","solution"],"type":["rhd_knowledgebase_article","rht_knowledgebase_solution"]},{"key":"blogpost","name":"Blog Posts","value":["blogpost"],"type":["jbossorg_blog"]},{"key":"book","name":"Book","value":["book"],"type":["jbossdeveloper_book"]},{"key":"bom","name":"BOM","value":["jbossdeveloper_bom"],"type":["jbossdeveloper_bom"]},{"key":"cheatsheet","name":"Cheat Sheet","value":["cheatsheet"],"type":["jbossdeveloper_cheatsheet"]},{"key":"demo","name":"Demo","value":["demo"],"type":["jbossdeveloper_demo"]},{"key":"event","name":"Event","value":["jbossdeveloper_event"],"type":["jbossdeveloper_event"]},{"key":"get-started","name":"Get Started","value":["jbossdeveloper_example"],"type":["jbossdeveloper_example"]},{"key":"quickstart","name":"Quickstart","value":["quickstart"],"type":["jbossdeveloper_quickstart"]},{"key":"stackoverflow","name":"Stack Overflow","value":["stackoverflow_thread"],"type":["stackoverflow_question"]},{"key":"video","name":"Video","value":["video"],"type":["jbossdeveloper_vimeo","jbossdeveloper_youtube"]},{"key":"webpage","name":"Web Page","value":["webpage"],"type":["rhd_website"]}]},{"name":"PRODUCT","key":"product","items":[{"key":"dotnet-product","name":".NET Runtime for Red Hat Enterprise Linux","value":["dotnet"]},{"key":"amq","name":"JBoss A-MQ","value":["amq"]},{"key":"bpmsuite","name":"JBoss BPM Suite","value":["bpmsuite"]},{"key":"brms","name":"JBoss BRMS","value":["brms"]},{"key":"datagrid","name":"JBoss Data Grid","value":["datagrid"]},{"key":"datavirt","name":"JBoss Data Virtualization","value":["datavirt"]},{"key":"devstudio","name":"JBoss Developer Studio","value":["devstudio"]},{"key":"eap","name":"JBoss Enterprise Application Platform","value":["eap"]},{"key":"fuse","name":"JBoss Fuse","value":["fuse"]},{"key":"webserver","name":"JBoss Web Server","value":["webserver"]},{"key":"openjdk","name":"OpenJDK","value":["openjdk"]},{"key":"rhamt","name":"Red Hat Application Migration Toolkit","value":["rhamt"]},{"key":"cdk","name":"Red Hat Container Development Kit","value":["cdk"]},{"key":"developertoolset","name":"Red Hat Developer Toolset","value":["developertoolset"]},{"key":"devsuite","name":"Red Hat Development Suite","value":["devsuite"]},{"key":"rhel","name":"Red Hat Enterprise Linux","value":["rhel"]},{"key":"mobileplatform","name":"Red Hat Mobile Application Platform","value":["mobileplatform"]},{"key":"openshift","name":"Red Hat OpenShift Container Platform","value":["openshift"]},{"key":"softwarecollections","name":"Red Hat Software Collections","value":["softwarecollections"]}]},{"name":"TOPIC","key":"tag","items":[{"key":"dotnet","name":".NET","value":["dotnet",".net","visual studio","c#"]},{"key":"containers","name":"Containers","value":["atomic","cdk","containers"]},{"key":"devops","name":"DevOps","value":["DevOps","CI","CD","Continuous Delivery"]},{"key":"enterprise-java","name":"Enterprise Java","value":["ActiveMQ","AMQP","apache camel","Arquillian","Camel","CDI","CEP","CXF","datagrid","devstudio","Drools","Eclipse","fabric8","Forge","fuse","Hawkular","Hawtio","Hibernate","Hibernate ORM","Infinispan","iPaas","java ee","JavaEE","JBDS","JBoss","JBoss BPM Suite","JBoss BRMS","JBoss Data Grid","jboss eap","JBoss EAP",""]},{"key":"iot","name":"Internet of Things","value":["IoT","Internet of Things"]},{"key":"microservices","name":"Microservices","value":["Microservices"," WildFly Swarm"]},{"key":"mobile","name":"Mobile","value":["Mobile","Red Hat Mobile","RHMAP","Cordova","FeedHenry"]},{"key":"web-and-api-development","name":"Web and API Development","value":["Web","API","HTML5","REST","Camel","Node.js","RESTEasy","JAX-RS","Tomcat","nginx","Rails","Drupal","PHP","Bottle","Flask","Laravel","Dancer","Zope","TurboGears","Sinatra","httpd","Passenger"]}]}]};
    //         document.body.insertBefore(mockApp,document.body.firstChild);
    //     });
    //
    //     it('should update empty and message variables', function() {
    //         wc.toggleQueryMessage('no-term');
    //         wc.setAttribute('message', 'test')
    //         expect(wc.empty).toEqual(true);
    //     });
    //
    //
    // });



});