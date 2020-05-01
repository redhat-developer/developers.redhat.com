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

        $('#event-collection-filters').show();

        // Filter select options chosen.
        sessionSelect.change(function () {
          var selectedCategory = $(this).val();
          if (selectedCategory == 'All') {
            $(tableBodyRows).show();
          }
          else {
            $(tableBodyRows).hide().filter(function (index, row) {
              categoryCell = $(row).find('td.views-field-field-tax-event-categories');
              category = $.trim(categoryCell[0].innerText);
              if (category == selectedCategory) {
                return true;
              }
            }).show();
          }
        });

      });
    }
  }

})(jQuery, Drupal);
