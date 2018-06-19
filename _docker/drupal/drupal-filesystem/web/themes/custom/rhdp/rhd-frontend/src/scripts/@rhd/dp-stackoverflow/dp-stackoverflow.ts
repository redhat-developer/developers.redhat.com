import RHElement from '@rhelements/rhelement';

export default class DPStackOverflow extends RHElement {
    template = el => {
        const tpl = document.createElement("template");
        tpl.innerHTML = `
        <style>

        </style>
        <label for="filterByProduct">Filter by Product</label>
        <select id="filterByProduct" name="filter-by-product" ng-change="updateSearch(); resetPagination();" ng-model="params.product">
<div ng-app="search">
<div class="row" ng-controller="SearchController">
    <div class="large-24 columns">
    <div class="row">
        <div class="large-24 columns">
        <form class="search-bar" ng-submit="updateSearch(); resetPagination();" role="search"> </form>
        </div>
        <div class="large-24 columns" id="scrollPoint">
        <div class="row">
            <div class="large-14 columns stackoverflow-filters">
            <label for="filterByProduct">Filter by Product</label>

            <div class="styled-select">
<select id="filterByProduct" name="filter-by-product" ng-change="updateSearch(); resetPagination();" ng-model="params.product">
    <option value="">Show all</option>
    <option value="openjdk">OpenJDK</option>
    <option value="rhamt">Red Hat Application Migration Toolkit</option>
    <option value="cdk">Red Hat Developer Container Kit</option>
    <option value="developertoolset">Red Hat Developer Toolset</option>
    <option value="rhel">Red Hat Enterprise Linux</option>
    <option value="amq">Red Hat JBoss AMQ</option>
    <option value="rhpam">Red Hat Process Automation Manager</option>
    <option value="brms">Red Hat Decision Manager</option>
    <option value="datagrid">Red Hat JBoss Data Grid</option>
    <option value="datavirt">Red Hat JBoss Data Virtualization</option>
    <option value="devstudio">Red Hat JBoss Developer Studio</option>
    <option value="eap">Red Hat JBoss Enterprise Application Platform</option>
    <option value="fuse">Red Hat JBoss Fuse</option>
    <option value="webserver">Red Hat JBoss Web Server</option>
    <option value="rhmap">Red Hat Mobile Application Platform</option>
    <option value="rhoar">Red Hat Openshift Application Runtimes</option>
    <option value="openshift">Red Hat OpenShift Container Platform</option>
    <option value="softwarecollections">Red Hat Software Collections</option>
    <option value="dotnet">.NET Core for Red Hat Enterprise Linux</option>
</select>
</div>
            </div>

            <div class="large-10 columns">
            <div class="sorting so-sorting">
                <p ng-if="totalCount &gt; 10">Show<select class="results-count" ng-change="updateSearch()" ng-model="params.size"><option value="10">10</option>
<option value="25">25</option>
<option value="50">50</option>
<option value="100">100</option></select>results per page</p>
            </div>
            </div>
        </div>

        <div class="row">
            <div class="large-24 columns">
            <h3 class="results-title" ng-bind-template="No results found" ng-if="totalCount &lt;= 0"> </h3>

            <h4 class="results-sub-title" ng-bind-template="Please select a different product" ng-if="totalCount &lt;= 0"> </h4>

            <div class="stackoverflow-results-container" ng-class="loading ? 'invisible' : 'search-results-loaded'" ng-if="totalCount &gt; 0">
                <div ng-init="r = result" ng-repeat="result in results">
                <div class="stackoverflow-update">
                    <div class="update">
                    <div class="update-meta">
                        <div class="row">
                        <div class="large-6 columns qtn-stats">

                            <div class="votes-count">
                            <h4 ng-bind="r._source.up_vote_count"> </h4>
                            <p ng-bind-template="Votes"> </p>
                            </div>
                            <div class="answer-count" ng-class="(r._source.answers[0].is_accepted == true) ? 'accepted-answer' : '' ">
                            <h4 ng-bind="r._source.answer_count"> </h4>
                            <p ng-bind-template="Answers"> </p>
                            </div>
                            <div class="views-count">
                            <h4 ng-bind="r._source.view_count"> </h4>
                            <p ng-bind-template="Views"> </p>
                            </div>
                        </div>

                        <div class="large-18 columns">
                            <a class="qtn-title" ng-href="{{r._source.sys_url_view}}" ng-bind-html="r._source.sys_title"> </a>
                            <p class="qtn-content" ng-bind-html="r | question"> </p>

                            <div class="callout qtn-answer" ng-class="r._source.answers[0] ? 'display-answer' : 'hide-answer' ">
                            <p ng-show="r._source.answers[0].is_accepted == true">
                                <strong ng-bind-template="Accepted answer: "> </strong>
                            </p>
                            <p ng-show="r._source.answers[0].is_accepted == false">
                                <strong ng-bind-template="Latest answer: "> </strong>
                            </p>
                            <p ng-bind="r._source.answers[0].body | htmlToPlaintext"></p>
                            <a ng-href="{{r._source.sys_url_view}}" target="_blank" rel="noopener noreferrer" ng-bind-template="Read full question at Stack Overflow ›"> </a>
                            </div>
                            <div class="so-tags">
                            <strong class="tag-label" ng-bind-template="Tags:"> </strong>
                            <span class="tag" ng-repeat="tag in r._source.sys_tags" ng-bind="tag"> </span>
                            <span class="so-author" ng-bind-template="{{r | stackDate}} | {{r | author}}"> </span>
                            </div>
                        </div>
                        </div>
                    </div>
                    </div>
                </div>
                </div>
            </div>
            </div>
        </div>

        <nav id="paginator" ng-hide="loading" ng-if="paginate.pages &gt; 1"><span ng-bind-template="Showing {{params.from + 1}}-{{paginate.lastVisible}} of  {{totalCount}} results"></span>
            <ul class="pagination">
<li id="pagination-first" ng-class="paginate.currentPage &lt; 2 ? 'unavailable': 'available'">
                <a ng-click="goToPage('first'); scrollPosition();">First</a>
            </li>
            <li id="pagination-prev" ng-class="paginate.currentPage &lt; 2 ? 'unavailable': 'available'">
                <a ng-click="goToPage('prev'); scrollPosition();">Previous</a>
            </li>
            <li class="pagination-page-number" id="pagination-{{$index}}" ng-class="{current: page == paginate.currentPage}" ng-repeat="page in paginate.pagesArray track by $index">
                <a ng-click="goToPage(page); scrollPosition();" data-page="{{page}}" ng-bind="page"> </a>
            </li>
            <li id="pagination-next" ng-class="paginate.currentPage &gt;= paginate.pages ? 'unavailable': 'available'">
                <a ng-click="goToPage('next'); scrollPosition();">Next</a>
            </li>
            <li id="pagination-last" ng-class="paginate.currentPage  == paginate.pages ? 'unavailable': 'available'">
                <a ng-click="goToPage('last'); scrollPosition();">Last</a>
            </li>
            </ul></nav>
</div>
`;
        return tpl;
    }
    constructor() {
        super('dp-category-list');
        
    }

    connectedCallback() {
        super.render(this.template(this));
    }
}