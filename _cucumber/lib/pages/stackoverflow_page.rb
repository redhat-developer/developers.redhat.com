require_relative 'site_base'

class StackOverflowPage < SiteBase
  page_url('/stack-overflow/')
  page_title('Stack Overflow')

  element(:product_filter)            { |el| el.find(id: 'filterProducts') }

  elements(:question_rows)            { |el| el.find_elements(class: 'stackoverflow-update') }
  elements(:question_summary)         { |el| el.find_elements(class: 'qtn-content') }
  elements(:question_links)           { |el| el.find_elements(class: 'update-source') }
  elements(:question_titles)          { |el| el.find_elements(class: 'qtn-title') }
  elements(:answer_count)             { |el| el.find_elements(css: '.stackoverflow-update .update .answer-count h4') }
  elements(:votes)                    { |el| el.find_elements(css: '.stackoverflow-update .update .votes-count p') }
  elements(:answers)                  { |el| el.find_elements(css: '.stackoverflow-update .update .answer-count p') }
  elements(:views)                    { |el| el.find_elements(css: '.stackoverflow-update .update .views-count p') }
  elements(:author)                   { |el| el.find_elements(class: 'so-author') }
  element(:vote_count)                { |el| el.find(css: '.stackoverflow-update .update .votes-count h4') }
  element(:view_count)                { |el| el.find(css: '.stackoverflow-update .update .views-count h4') }
  element(:latest_answer)             { |el| el.find(css: 'callout qtn-answer display-answer') }
  element(:read_full_question_link)   { |el| el.find(css: 'display-answer a') }

  def wait_until_loaded
    wait_for(20) {
      stack_questions = question_rows
      stack_questions.size >= 10
    }
  end

  def selected_filter
    select_list = wait_for {
      element = product_filter
      element if element.displayed?
    }
    options=select_list.find_elements(:tag_name => 'option')
    options.each do |g|
      if g.selected?
        return g.text
      end
    end
  end

  def select_product(product)
    select(product_filter, product)
    wait_for_ajax
  end

  def questions_loaded?(i)
    begin
      wait_for(20) {
        @stack_questions = question_rows
        @stack_questions.size == i
      }
    rescue
      raise("Expected #{i} results but received #{@stack_questions.size}")
    end
  end

  def activity_summary(type)
    case type.downcase
      when 'votes'
        votes
      when 'answers'
        answers
      when 'views'
        views
      else
        raise("#{type} is not a recognised activity summary element")
    end
  end

  def scroll_to_question_with_answer
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
    @element.text.include? 'Latest answer:'
  end

  def read_full_question_link
    custom_find(@element, css: 'display-answer a')
  end

  def click_read_full_question_link(link)
    custom_click_on(@element, partial_link_text: link)
  end

  def scroll_to_bottom_of_page
    wait_until_loaded
    answer_count.last.location_once_scrolled_into_view
    # Wait for the additional questions to load
    current_count = answer_count.length
    until current_count < answer_count.length
      sleep(1)
    end
  end


  private

  def scroll_page(number_of_times)
    wait_until_loaded
    count = 0; result = false
    until result == true || count == number_of_times
      result = yield
      answer_count.last.location_once_scrolled_into_view
      # Wait for the additional questions to load
      current_count = answer_count.length
      until current_count < answer_count.length
        sleep(1)
      end
      count += 1
    end
    if result.eql? false || count == number_of_times
      raise("Scrolled page #{number_of_times} times, expected result to be true, but was false")
    end
  end

  def query_questions(answer)
    wait_until_loaded
    questions = @driver.find_elements(:css, '.stackoverflow-update .update .update-meta .row')
    questions.each do |q|
      child_elements = []
      parent_li = q.find_elements(:xpath, './/*')
      parent_li.each do |t|
        @question_element = t
        child_elements << t['class']
        if answer == 'with'
          unless child_elements.include? 'answer-count accepted-answer'
            return @question_element, true if child_elements.include? 'callout qtn-answer display-answer'
          end
        else
          return @question_element, true if !child_elements.include? 'callout qtn-answer display-answer'
        end
      end
    end
    false
  end

end
