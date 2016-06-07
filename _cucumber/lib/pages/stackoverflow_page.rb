require_relative 'base'

class StackOverflow < Base

  QUESTION_ROW                       =  { css: '.stackoverflow-update' }

  def initialize(driver)
    super
  end

  def questions
    stack_questions = find_elements(QUESTION_ROW)
    stack_questions.size
  end

end