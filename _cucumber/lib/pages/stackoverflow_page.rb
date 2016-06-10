require_relative 'base'

class StackOverflow < Base

  QUESTION_ROW                       =  { css: '.stackoverflow-update' }
  VOTES                              =  { css: '.stackoverflow-update .update .votes-count' }
  ANSWERS                            =  { css: '.stackoverflow-update .update .answer-count' }
  VIEWS                              =  { css: '.stackoverflow-update .update .views-count' }
  QUESTION_TITLE                     =  { css: '.qtn-title' }
  QUESTION_SUMMARY                   =  { css: '.qtn-content' }

  def initialize(driver)
    super
    verify_page('Stack Overflow')
  end

  def questions
    stack_questions = find_elements(QUESTION_ROW)
    stack_questions.size
  end

  def votes
    question_votes = find_elements(VOTES)
    question_votes.size
  end

  def answers
    question_answers = find_elements(ANSWERS)
    question_answers.size
  end

  def views
    question_views = find_elements(VIEWS)
    question_views.size
  end

  def question_title
    href = []
    title = find_elements(QUESTION_TITLE)
    href.each do |t|
      href << t.attribute('href')
    end
    title.size
    return title, href
  end

  def question_summary
    summary = find_elements(QUESTION_SUMMARY)
    summary.size
  end

end