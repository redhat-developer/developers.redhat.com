require_relative 'base'

class StackOverflow < Base

  STACK_OVERFLOW_CONTAINER           =  { css: '.update' }
  QUESTION_ROW                       =  { css: '.stackoverflow-update' }
  VOTES                              =  { css: '.stackoverflow-update .update .votes-count p' }
  VOTE_COUNT                         =  { css: '.stackoverflow-update .update .votes-count h4' }
  ANSWERS                            =  { css: '.stackoverflow-update .update .answer-count p' }
  ANSWER_COUNT                       =  { css: '.stackoverflow-update .update .answer-count h4' }
  VIEWS                              =  { css: '.stackoverflow-update .update .views-count p' }
  VIEW_COUNT                         =  { css: '.stackoverflow-update .update .views-count h4' }
  QUESTION_TITLE                     =  { css: '.qtn-title' }
  QUESTION_LINK                      =  { css: '.update-source' }
  QUESTION_SUMMARY                   =  { css: '.qtn-content' }
  LATEST_ANSWER                      =  { css: '.display-answer p' }
  READ_FULL_QUESTION_LINK            =  { css: '.display-answer a' }

  def initialize(driver)
    super
    verify_page('Stack Overflow')
  end

  def questions_loaded?(i)
    begin
      wait_for(12) {
        @stack_questions = find_elements(QUESTION_ROW)
        @stack_questions.size == i
      }
    rescue
      raise("Expected #{i} results but received #{@stack_questions.size}")
    end
  end

  def activity_summary(type)
    case type
      when 'Votes'
        find_elements(VOTES)
      when 'Answers'
        find_elements(ANSWERS)
      when 'Views'
        find_elements(VIEWS)
      else
        raise("#{type} is not a recognised activity summary element")
    end
  end

  def question_titles
    find_elements(QUESTION_LINK)
  end

  def question_summary
    find_elements(QUESTION_SUMMARY)
  end

  def latest_answer
    find(LATEST_ANSWER)
  end

  def read_full_question_link
    find(READ_FULL_QUESTION_LINK)
  end

  def click_read_full_question_link
    wait_for { displayed?(READ_FULL_QUESTION_LINK) }
    click_on(READ_FULL_QUESTION_LINK)
  end

  def question_with_answer
    scroll_page(10) {
      displayed?(LATEST_ANSWER)
    }
  end

  def question_without_answer
    no_answer = []
    scroll_page(10) {
      question = find_elements(ANSWER_COUNT)
      question.each { |answer|
        if answer.text == '0'
          no_answer << answer
        end
      }
      !no_answer.empty?
    }
    @element = no_answer.first
    p @element.text
  end

  private

  def scroll_page(number_of_times)
    count = 0; answer = false
    until answer == true || count == number_of_times
      answer = yield
      find_elements(ANSWER_COUNT).last.location_once_scrolled_into_view
      # Wait for the additional answers to load
      current_count = find_elements(ANSWER_COUNT).length
      until current_count < find_elements(ANSWER_COUNT).length
        sleep(1)
      end
      count += 1
    end
    if answer.eql? false
      raise("Question with an answer was not found after #{number_of_times} attempts!")
    end
  end

end
