require_relative 'base.rb'

class SolutionsPage < Base

  SOLUTIONS_HEADER = '.hero-solutions'
  SOLUTIONS = '.solutions > li'

  def initialize(driver)
    super
    loaded?('Technology Solutions')
  end

  def solutions_title
    page.has_selector?(SOLUTIONS_HEADER, :text => 'SOLUTIONS')
  end

  def available_solutions(solutions)
    page.has_selector?(SOLUTIONS, visible: true, :count => solutions.to_i)
  end

end
