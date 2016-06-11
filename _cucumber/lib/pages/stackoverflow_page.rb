require_relative 'base'

class StackOverflow < Base

  STACK_OVERFLOW_CONTAINER           =  { css: '.update' }
  QUESTION_ROW                       =  { css: '.stackoverflow-update' }
  VOTES                              =  { css: '.stackoverflow-update .update .votes-count' }
  ANSWERS                            =  { css: '.stackoverflow-update .update .answer-count' }
  VIEWS                              =  { css: '.stackoverflow-update .update .views-count' }
  QUESTION_TITLE                     =  { css: '.qtn-title' }
  QUESTION_LINK                      =  { css: '.update-source' }
  QUESTION_SUMMARY                   =  { css: '.qtn-content' }

  def initialize(driver)
    super
    verify_page('Stack Overflow')
  end

  def questions_loaded?(i)
    stack_questions = find_elements(QUESTION_ROW)
    begin
      wait_for(12) { stack_questions.size == i }
    rescue
      raise("Expected #{i} results but received #{stack_questions.size}")
    end
  end

  def votes
    find_elements(VOTES)
  end

  def answers
    find_elements(ANSWERS)
  end

  def views
    find_elements(VIEWS)
  end

  def question_title
    href = []
    question_title = find_elements(QUESTION_TITLE)
    question_link  = find_elements(QUESTION_LINK)
    question_link.each do |t|
      href << t.attribute('href')
    end
    return question_title, href
  end

  def question_summary
    find_elements(QUESTION_SUMMARY)
  end

end