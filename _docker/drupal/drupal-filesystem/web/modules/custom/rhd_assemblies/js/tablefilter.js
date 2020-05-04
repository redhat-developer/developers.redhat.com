/**
 * @file
 * Javascript Table Filter Component.
 */

(function ($, Drupal) {

  Drupal.behaviors.rhd_tablefilter = {
    attach: function (context, settings) {

      $('.assembly-type-events_collection', context).once('rhd_tablefilter').each(function () {
        var tableBody = $(context).find('table.views-table tbody');
        var tableBodyRows = tableBody.find('tr');
        var sessionSelect = $(context).find('#event-collection-filter__session');
        var languageSelect = $(context).find('#event-collection-filter__language');
        var filterSelects = $(context).find('#event-collection-filters select');

        // Find used categories and set as options in session filter.
        var categories = $(context).find('td.views-field-field-tax-event-categories');
        var categoryOptions = [];
        $.each(categories, function (key, value) {
          category = $.trim(value.innerText);
          categoryOption = '<option value="' + category + '">' + category + '</option>';
          if (categoryOptions.indexOf(categoryOption) == -1) {
            categoryOptions.push(categoryOption);
          }
        });
        sessionSelect.append(categoryOptions);

        // Find used languages and set as options in language filter.
        var languages = $(context).find('td.views-field-field-language');
        var languageOptions = [];
        $.each(languages, function (key, value) {
          language = $.trim(value.innerHTML);
          languageOption = '<option value="' + language + '">' + language + '</option>';
          if (languageOptions.indexOf(languageOption) == -1) {
            languageOptions.push(languageOption);
          }
        });
        languageSelect.append(languageOptions);

        // Everybody's ready, let's see that filter form!
        $('#event-collection-filters').show();

        // Setup no results message.
        $(tableBody).prepend('<div id="event-collection-filter__no-results" style="display: none"><p>No results found. Please modify your filter criteria.</p></div>');

        // Filter table on options chosen in select fields.
        filterSelects.change(function () {
          var selectedCategory = $('#event-collection-filter__session').val();
          var selectedLanguage = $('#event-collection-filter__language').val();
          $(tableBodyRows).hide().filter(function (index, row) {
            categoryCell = $(row).find('td.views-field-field-tax-event-categories');
            languageCell = $(row).find('td.views-field-field-language');
            category = $.trim(categoryCell[0].innerText);
            language = $.trim(languageCell[0].innerText);
            if (
              (category == selectedCategory || selectedCategory == 'All') &&
              (language == selectedLanguage || selectedLanguage == 'All')) {
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
