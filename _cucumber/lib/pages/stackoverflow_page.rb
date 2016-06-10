require_relative 'base'

class StackOverflow < Base

  QUESTION_ROW                       =  { css: '.stackoverflow-update' }
  VOTES                              =  { css: '.stackoverflow-update .update .votes-count' }
  ANSWERS                            =  { css: '.stackoverflow-update .update .answer-count' }
  VIEWS                              =  { css: '.stackoverflow-update .update .views-count' }

  def initialize(driver)
    super
    verify_page('Stack Overflow')
  end

  def questions
    stack_questions = find_elements(QUESTION_ROW)
    stack_questions.size
  end

  def votes
    stack_questions = find_elements(VOTES)
    stack_questions.size
  end

  def answers
    stack_questions = find_elements(ANSWERS)
    stack_questions.size
  end

  def views
    stack_questions = find_elements(VIEWS)
    stack_questions.size
  end

end