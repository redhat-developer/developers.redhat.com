/**
 * @file
 * Javascript Table Filter Component.
 */

(function ($, Drupal) {

  Drupal.behaviors.rhd_tablefilter = {
    attach: function (context, settings) {

      $('.assembly-type-events_collection', context).once('rhd_tablefilter').each(function () {
        var tableBody = $(context).find('table tbody');
        var tableBodyRows = tableBody.find('tr');
        var sessionSelect = $(context).find('#event-collection-filter__session');
        var languageSelect = $(context).find('#event-collection-filter__language');
        var filterSelects = $(context).find('#event-collection-filters select');
        var displayForm = false;

        // Find used categories and set as options in session filter.
        // Hide filter option if unused.
        var categories = $(context).find('td.event-session-field__categories');
        if (categories.length == 0) {
          $('.event-collection-filter-group__session').hide();
        }
        else {
          displayForm = true;
          var categoryOptions = [];
          $.each(categories, function (key, value) {
            categoryString = $.trim(value.innerText);
            categoryArray = categoryString.split(', ');
            $.each(categoryArray, function (key, value) {
              categoryOption = '<option value="' + value + '">' + value + '</option>';
              if (categoryOptions.indexOf(categoryOption) == -1) {
                categoryOptions.push(categoryOption);
              }
            });
          });
          sessionSelect.append(categoryOptions.sort());
        }

        // Find used languages and set as options in language filter.
        // Hide filter option if unused.
        var languages = $(context).find('td.event-session-field__language');
        if (languages.length == 0) {
          $('.event-collection-filter-group__language').hide();
        }
        else {
          displayForm = true;
          var languageOptions = [];
          $.each(languages, function (key, value) {
            language = $.trim(value.innerHTML);
            languageOption = '<option value="' + language + '">' + language + '</option>';
            if (languageOptions.indexOf(languageOption) == -1) {
              languageOptions.push(languageOption);
            }
          });
          languageSelect.append(languageOptions.sort());
        }

        // Everybody's ready, let's see if we should see that filter form!
        if (displayForm) {
          $('#event-collection-filters').show();
        }

        // Setup no results message.
        $(tableBody).prepend('<div id="event-collection-filter__no-results" style="display: none"><p>No results found. Please modify your filter criteria.</p></div>');

        // Filter table on options chosen in select fields.
        filterSelects.change(function () {
          var selectedCategory = $('#event-collection-filter__session').val();
          var selectedLanguage = $('#event-collection-filter__language').val();
          $(tableBodyRows).hide().filter(function (index, row) {
            categoryCell = $(row).find('td.event-session-field__categories');
            languageCell = $(row).find('td.event-session-field__language');
            categoryResult = false;
            languageResult = false;
            if (categoryCell.length) {
              categoryString = $.trim(categoryCell[0].innerText);
              categoryArray = categoryString.split(', ');
              if (categoryArray.indexOf(selectedCategory) > -1 || selectedCategory == 'All') {
                categoryResult = true;
              }
            }
            else {
              categoryResult = true;
            }
            if (languageCell.length) {
              language = $.trim(languageCell[0].innerText);
              if (language == selectedLanguage || selectedLanguage == 'All') {
                languageResult = true;
              }
            }
            else {
              languageResult = true;
            }
            if (categoryResult && languageResult) {
                return true;
            }
          }).show();

          // Show message if filters return zero results.
          if (tableBody.find('tr:visible').length == 0) {
            $('#event-collection-filter__no-results').show();
          }
          else {
            $('#event-collection-filter__no-results').hide();
          }
        });
      });
    }
  }

})(jQuery, Drupal);
