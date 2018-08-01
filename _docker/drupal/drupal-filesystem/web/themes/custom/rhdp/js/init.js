// Category Selection
System.import('@rhd/dp-category-list/dp-category-item-list');
System.import('@rhd/dp-category-list/dp-category-item');
System.import('@rhd/dp-category-list/dp-category-list');
System.import('@rhd/dp-category-list/dp-category');
System.import('@rhd/dp-category-list/dp-product-short-teaser');
// End Category Selection

// Search
System.import('@rhd/rhdp-search/rhdp-search-app').then(function(module) {
    window.RHDPSearchApp = module.default; 
});
System.import('@rhd/rhdp-search/rhdp-search-box').then(function(module) {
    window.RHDPSearchBox = module.default; 
});
System.import('@rhd/rhdp-search/rhdp-search-filter-group').then(function(module) {
    window.RHDPSearchFilterGroup = module.default; 
});
System.import('@rhd/rhdp-search/rhdp-search-filter-item').then(function(module) {
    window.RHDPSearchFilterItem = module.default; 
});
System.import('@rhd/rhdp-search/rhdp-search-filters').then(function(module) {
    window.RHDPSearchFilters = module.default; 
});
System.import('@rhd/rhdp-search/rhdp-search-onebox').then(function(module) {
    window.RHDPSearchOneBox = module.default; 
});
System.import('@rhd/rhdp-search/rhdp-search-query').then(function(module) {
    window.RHDPSearchQuery = module.default; 
});
System.import('@rhd/rhdp-search/rhdp-search-result-count').then(function(module) {
    window.RHDPSearchResultCount = module.default; 
});
System.import('@rhd/rhdp-search/rhdp-search-result').then(function(module) {
    window.RHDPSearchResult = module.default; 
});
System.import('@rhd/rhdp-search/rhdp-search-results').then(function(module) {
    window.RHDPSearchResults = module.default; 
});
System.import('@rhd/rhdp-search/rhdp-search-sort-page').then(function(module) {
    window.RHDPSearchSortPage = module.default; 
});
System.import('@rhd/rhdp-search/rhdp-search-url').then(function(module) {
    window.RHDPSearchURL = module.default; 
});

// End Search

// Product Download Components
System.import('@rhd/rhdp-downloads/rhdp-downloads-all-item').then(function(module) {
    window.RHDPDownloadsAllItem = module.default; 
});

System.import('@rhd/rhdp-downloads/rhdp-downloads-all').then(function(module) {
    window.RHDPDownloadsAll = module.default; 
});

System.import('@rhd/rhdp-downloads/rhdp-downloads-app').then(function(module) {
    window.RHDPDownloadsApp = module.default; 
});

System.import('@rhd/rhdp-downloads/rhdp-downloads-popular-product').then(function(module) {
    window.RHDPDownloadsPopularProduct = module.default; 
});

System.import('@rhd/rhdp-downloads/rhdp-downloads-popular-products').then(function(module) {
    window.RHDPDownloadsPopularProducts = module.default; 
});

System.import('@rhd/rhdp-downloads/rhdp-downloads-products').then(function(module) {
    window.RHDPDownloadsProducts = module.default; 
});

System.import('@rhd/rhdp-os-download').then(function(module) {
    window.RHDPOSDownload = module.default; 
});

// End Product Download Components

System.import('@rhd/rhdp-alert').then(function(module) {
    window.RHDPAlert = module.default; 
});

System.import('@rhd/dp-stackoverflow').then(function(module) {
    window.DPStackOverflow = module.default; 
});

System.import('@rhd/rhdp-thankyou-page').then(function(module) {
    window.RHDPThankYouPage = module.default; 
});

System.import('@rhd/rhdp-tryitnow').then(function(module) {
    window.RHDPTryItNow = module.default; 
});

System.import('@rhd/dp-referrer').then(function(module) {
    window.DPReferrer = module.default; 
});