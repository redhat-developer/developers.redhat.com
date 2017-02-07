require 'json'

# class to merge cucumber json reports
class CucumberJSONMerger
  attr_reader :master

  def initialize(profile)
    @profile = profile
    @cucumber_dir = File.dirname(__FILE__)
    @reports = Dir.glob("#{@cucumber_dir}/reports/#{@profile}/*.json").map { |f| JSON.parse(File.read(f)) }
    @master = @reports.shift
    @logger = DefaultLogger.logger
  end

  def run
    @reports.each do |report|
      report.each do |feature|
        fname = feature.fetch 'uri'
        update(fname, feature, report)
      end
    end
  end

  def update(fname, feature, report)
    if feature_exists? fname
      scenarios(report, fname).each do |scenario|
        sname = scenario.fetch 'name'
        sline = scenario.fetch 'line'
        scenario_exists?(sname, fname) ? replace_scenario(sname, sline, scenario, fname) : append_scenario(scenario, fname)
      end
    else
      append_feature feature
    end
  end

  def rerun
    json_rerun = Dir.glob "#{@cucumber_dir}/reports/#{@profile}/rerun.json"
    if json_rerun.empty?
      @logger.info('no rerun file found')
    else
      @reports = [JSON.parse(File.read("#{@cucumber_dir}/reports/#{@profile}/rerun.json"))]
      run
    end
  end

  def rerun_2
    json_rerun = Dir.glob "#{@cucumber_dir}/reports/#{@profile}/rerun2.json"
    if json_rerun.empty?
      @logger.info('no second rerun file found')
    else
      @reports = [JSON.parse(File.read("#{@cucumber_dir}/reports/#{@profile}/rerun2.json"))]
      run
    end
  end

  private

  def feature_names(report)
    report.map { |f| f['uri'] }
  end

  def scenario_names(report, fname)
    scenarios(report, fname).map { |s| s['name'] }
  end

  def scenarios(report, fname)
    report.find { |f| f['uri'] == fname }['elements'].select { |e| e['keyword'].include? 'Scenario' }.flatten
  end

  def feature_exists?(name)
    feature_names(@master).include? name
  end

  def scenario_exists?(scenario, fname)
    scenario_names(@master, fname).include? scenario
  end

  def replace_scenario(sname, sline, scenario, feature)
    @master.find { |f| f['uri'] == feature }['elements'].delete_if do |e|
      exists = e['keyword'].include?('Scenario') && e['name'] == sname && e['line'] == sline
      exists
    end
    append_scenario(scenario, feature)
  end

  def append_scenario(scenario, feature)
    @master.find { |f| f['uri'] == feature }['elements'] << scenario
  end

  def append_feature(feature)
    @master.push feature
  end
end
