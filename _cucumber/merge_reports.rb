#!/usr/bin/env ruby
require 'rubygems'
require 'nokogiri'

def durations_of(report)
  report.css('script:contains("duration")').text.match(DURATION_REGEXP)[1].to_f
end

def examples_failures_of(report)
  examples_failures   = report.css('script:contains("totals")').text.match(EXAMPLES_FAILURES_REGEXP)[1]

  examples_failures.split(',').collect{|x| x.match(/([\d]+)/)[1].to_i}
end

def concat_reports_results(reports, report_name)
  reports.each do |report|
    results = report.css('.results div.example_group')

    report_name.css('.results div.example_group').after(results)
  end

  report_name
end

def update_tag_id(report_name)
  report_name.css('.results div.example_group').each_with_index do |div, index|
    original_id = div['id']
    div['id'] = "div_group_%s" % (index + 1)

    div.css('script:contains("div_group_")').each{|js| js.content = js.content.gsub(original_id, div['id']) }

    unless div.css('dt').count.zero?
      original_id = div.css('dt').first['id']
      div.css('dt').first['id'] = "example_group_%s" % (index + 1)

      div.css('script:contains("example_group_")').each{|js| js.content = js.content.gsub(original_id, div.css('dt').first['id']) }
    end
  end

  report_name
end

def update_titles(report_name, durations, examples_count, failures_count, pending_count)
  report_name.css('script:contains("duration")').first.content = report_name.css('script:contains("duration")').first.content.gsub!(DURATION_REGEXP, durations.to_s)

  report_name.css('script:contains("totals")').first.content = report_name.css('script:contains("totals")').first.content.gsub(/".*"/, '"' + examples_count.to_s + ' examples, ' + failures_count.to_s+ ' failures, ' + pending_count.to_s+ ' pending"')

  report_name
end

def calcul_count_of examples_failures, report_examples_failures
  [examples_failures, report_examples_failures].transpose.collect{|a| a.inject{|sum, x| sum + x}}
end

DURATION_REGEXP          = /<strong>([\d.]*).*<\/strong>/
EXAMPLES_FAILURES_REGEXP = /"(.*)"/

files = File.basename("/reports/*.html")

report_name = Nokogiri::HTML(open("#{files}", "r"))

durations = durations_of(report_name)

examples_count, failures_count, pending_count = examples_failures_of(report_name)

report_names = []
files.drop(1).each do |report_file|
  new_report = Nokogiri::HTML(open(report_file))
  report_names.push(new_report)

  durations += durations_of(new_report)

  examples_count, failures_count, pending_count = calcul_count_of([examples_count, failures_count, pending_count], examples_failures_of(new_report))
end

report_name = concat_reports_results(report_names, report_name)

report_name = update_tag_id(report_name)

report_name = update_titles(report_name, durations, examples_count, failures_count, pending_count)

File.open('cucumber_results.html', 'w') {|f| f.write(report_name.to_html) }
