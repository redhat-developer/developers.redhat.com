app.downloads = {};

app.downloads.url = app.downloadManagerBaseUrl + '/download-manager/rest/available/';

app.downloads.createDownloadTable = function(products) {

  var lastVersionName, lastDescription, row;
  var $table = $('<table>').addClass('large-24 small-24 columns downloads-table');

  // create headers
  var headers = ['Version' ,'Release Date' ,'Description' ,'Download'].map(function(text){
    return $('<th>').text(text);
  });

  var head = $('<thead>');
  row = $('<tr>').append(headers);
  head.append(row);
  $table.append(head);

  // clear out row after it's appended
  row = null;

  // loop over each product and append to the table
  $.each(products, function(i,product){

    // loop over each file inside each product
    $.each(product.files,function(j,file) {

      var versionName = product.versionName;
      var date = new Date(product.releaseDate);
      var dateString = ([date.getFullYear(), date.getMonth() + 1, date.getDate()].map(function(int) {
        return (int < 10 ? '0' + int : int);
      })).join('-');

      if(versionName === lastVersionName) {
        versionName = '';
        dateString = '';
      }

      // TODO: CHeck for last item
      // If the version is different OR the description is different than the last
      if(file.description !== lastDescription || versionName !== '') {
        row = $('<tr>').append(
          $('<td>').text(versionName),
          $('<td>').text(dateString),
          $('<td>').text(file.description !== lastDescription || versionName !== '' ? file.description : ''),
          $('<td>').addClass('download-links link-sm').append(app.downloads.createInstallerLink(file))
        );
      } else {
        var link = app.downloads.createInstallerLink(file);
        $(row).find('.download-links').append(link);
      }

      // if the next one isn't the same, or it's the last item, append it..
      if((j + 1) === product.files.length || file.description !== lastDescription || versionName !== '') {
        $table.append(row);
      }

      lastVersionName = product.versionName;
      lastDescription = file.description;

    }); // end each file

  }); // end each product

  // put it in the dom
  return $table;


}

app.downloads.bytesToSize = function(bytes) {
   var sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB'];
   if (bytes == 0) return '0 Byte';
   var i = parseInt(Math.floor(Math.log(bytes) / Math.log(1024)));
   return Math.round(bytes / Math.pow(1024, i), 2) + ' ' + sizes[i];
};

/*
  Creates large "Download" link above table
*/
app.downloads.createDownloadLink = function(data) {
  // HACK for rhoar not wanting a download button
  if (data[0].productCode === "rhoar") {
    return "";
  }
  else if (data[0].productCode === "devsuite") {
    data[0].featuredWindowsArtifact = app.products.downloads.devsuite.windowsUrl;
    data[0].featuredMacArtifact = app.products.downloads.devsuite.macUrl;
    data[0].featuredRhelArtifact = app.products.downloads.devsuite.rhelUrl;
  }
  else if (data[0].productCode === "cdk") {
    data[0].featuredWindowsArtifact = app.products.downloads.cdk.windowsUrl;
    data[0].featuredMacArtifact = app.products.downloads.cdk.macUrl;
    data[0].featuredRhelArtifact = app.products.downloads.cdk.rhelUrl;
 }

  else if(!data[0].featuredArtifact) {
    return "";
  }

  else {
      data[0].featuredWindowsArtifact = "";
      data[0].featuredMacArtifact = "";
      data[0].featuredRhelArtifact = "";

  }
  var $downloadLink = new RHDPOSDownload();
      $downloadLink.productCode  = data[0].productCode;
      $downloadLink.downloadURL  = data[0].featuredArtifact.url;
      $downloadLink.winURL       = data[0].featuredWindowsArtifact;
      $downloadLink.macURL       = data[0].featuredMacArtifact;
      $downloadLink.rhelURL      = data[0].featuredRhelArtifact;
      $downloadLink.productName  = data[0].name;
      $downloadLink.version      = data[0].featuredArtifact.versionName;

  // Pull the first one from the sorted array
  return $downloadLink;
}

/*
  Creates Release Notes Link
*/

app.downloads.createReleaseNotesLink = function() {
  var link = $('<a>').text(' View Release Notes').attr('href', 'https://access.redhat.com/documentation/en/').prepend($('<i>').addClass('fa fa-pencil'));
  return link;
}

/*
  Creates smaller installer link in the grouped table
*/

app.downloads.createInstallerLink = function(file) {
  var label = ' ' + file.label;
  if(file.fileSize) {
    label += ' (' + app.downloads.bytesToSize(file.fileSize) + ')';
  }
  var link = $('<a>').text(label).attr('href',file.url).prepend($('<i>').addClass('fa fa-download'));
  return link;
}

app.downloads.display = function(data) {

  // Sort products by their release date
  var productArray = data[0].productVersions.sort(function(a,b) {
    return (a.releaseDate > b.releaseDate) ? -1 : 1;
  });

  // create a download link
  var $downloadLink = app.downloads.createDownloadLink(data);

  // create toggle Link
  var $toggleLink = $('<a>').text('View Older Downloads ▾').addClass('large-24 columns view-older-downloads').attr('href', '#').on('click touchstart',function(e) {
    e.preventDefault();
    $(this).next('div').toggle();
  });

  // We split this into two parts - everything up to and including the latest GA, and everything after it
  for (var i = 0; i < productArray.length; i++) {
    var match = productArray[i].versionName.match(/alpha|beta|EA/gi);
    if(!match) {
      break;
    }
  };

  var end = i + 1;

  // create the featured downloads tables
  var currentDownloads = productArray.slice(0,end);

  /* loop through all the curent downloads and make their own table */
  var $latestDownloadsTables = $("<div>").addClass('large-24 columns');
  $latestDownloadsTables.append( app.downloads.createDownloadTable(currentDownloads) );

  // var $latestDownloadsTable = app.downloads.createDownloadTable();

  // create 'try it ' title
  var $titleContainer = $("<div>").addClass('large-24 columns');
  var $tryTitle = $("<h4>").addClass('caps').append('Try it');
  $titleContainer.append($tryTitle);

  // create 'all downloads' title
  var $allContainer = $("<div>").addClass('large-24 columns');
  var $allTitle = $("<h4>").addClass('caps').append('All Downloads');
  $allContainer.append($allTitle);

  // past downloads table
  var $allDownloadsTable = $("<div style='display:none;'>").addClass('large-24 columns');
  $allDownloadsTable.append( app.downloads.createDownloadTable(productArray.slice(end) ));
  
  // put everything into an element
  $downloads = $('<div>').addClass('rh-downloads').append($titleContainer, $downloadLink, $allContainer, $latestDownloadsTables, $toggleLink, $allDownloadsTable);

  // put it into the DOM
  $('.product-downloads').html($downloads);

  $("div.download-loading").removeClass('loading');

}

app.downloads.populateLinks = function() {

  var links = $('[data-download-id]');

  if(!links.length) {
    return;
  }

  $.each(links,function(i,el) {
    var productCode = $(this).data('download-id');
    // get data
    $.getJSON(app.downloads.url + productCode,function(data) {
      var $el = $(el);
      $el.html('<i class="fa fa-download"></i> Download');

      if(data[0] && data[0].featuredArtifact && data[0].featuredArtifact.url) {
        // find the date:
        var timeStamp = new Date(data[0].featuredArtifact.releaseDate);
        var releaseDate = moment(timeStamp).format('LL');

        $el.attr('href',data[0].featuredArtifact.url);
        $('[data-download-id-version="'+productCode+'"]').text('Version: ' + data[0].featuredArtifact.versionName);
        $('[data-download-id-release="'+productCode+'"]').text(releaseDate);
      } else {
        $el.attr('href', $el.data('fallback-url'));
      }
    });
  });

}

$(function() {

  var $productDownloads = $('[data-product-code]');
  var productCode = $productDownloads.data('product-code');

  if($productDownloads && productCode) {
    $.getJSON(app.downloads.url + productCode,function(data) {
      if(!data.length || !data[0].productVersions.length || !data[0].featuredArtifact) {
        $("div.download-loading").removeClass('loading');
        $('.no-download').show();
        return;
      }
      $('.has-download').show();
      app.downloads.display(data);
    });
  }

  //app.downloads.populateLinks();

});
