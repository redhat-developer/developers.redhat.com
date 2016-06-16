require_relative 'base'

class StackOverflow < Base
  attr_accessor :question_with_answer_el, :question_without_answer_el

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
  LATEST_ANSWER                      =  { css: '.display-answer' }
  READ_FULL_QUESTION_LINK            =  { css: '.display-answer a' }
  AUTHOR                             =  { css: '.so-author' }

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

  def author
    find_elements(AUTHOR)
  end

  def question_with_answer
    scroll_page(10) {
      @element, has_answer = query_questions('with')
      has_answer.eql?(true)
    }
  end

  def question_without_answer
    scroll_page(10) {
      @element, has_no_answer = query_questions('without')
      has_no_answer.eql?(true)
    }
  end

  def latest_answer_section_visible?
    custom_displayed?(@element, LATEST_ANSWER)
  end

  def read_full_question_link
    custom_find(@element, READ_FULL_QUESTION_LINK)
  end

  def click_read_full_question_link
    custom_click_on(@element, READ_FULL_QUESTION_LINK)
  end

  def scroll_to_bottom_of_page
    find_elements(ANSWER_COUNT).last.location_once_scrolled_into_view
    # Wait for the additional questions to load
    current_count = find_elements(ANSWER_COUNT).length
    until current_count < find_elements(ANSWER_COUNT).length
      sleep(1)
    end
  end


  private

  def scroll_page(number_of_times)
    count = 0; result = false
    until result == true || count == number_of_times
      result = yield
      find_elements(ANSWER_COUNT).last.location_once_scrolled_into_view
      # Wait for the additional questions to load
      current_count = find_elements(ANSWER_COUNT).length
      until current_count < find_elements(ANSWER_COUNT).length
        sleep(1)
      end
      count += 1
    end
    if result.eql? false
      raise("Scrolled page #{number_of_times} times, expected result to be true, but was false")
    end
  end

  def query_questions(answer)
    questions = @driver.find_elements(:css, '.stackoverflow-update .update .update-meta .row')
    questions.each do |q|
      @question_element = q
      child_elements = []
      parent_li = @question_element.find_elements(:xpath, './/*')
      parent_li.each do |t|
        child_elements << t['class']
        if answer == 'with'
          return @question_element, true if child_elements.include? 'callout qtn-answer display-answer'
        else
          return @question_element, true if !child_elements.include? 'callout qtn-answer display-answer'
        end
      end
    end
    false
  end

end
