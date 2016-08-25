require_relative 'abstract/common_elements'

class StackOverflowPage < CommonElements
  attr_accessor :element

  page_url('/stack-overflow/')
  #page_title('Stack Overflow')

  element(:product_filter)            { |el| el.find(id: 'filterByProduct') }

  elements(:question_rows)            { |el| el.find_elements(css: '.stackoverflow-update .update .update-meta .row') }
  elements(:question_summary)         { |el| el.find_elements(class: 'qtn-content') }
  elements(:question_links)           { |el| el.find_elements(class: 'update-source') }
  elements(:answer_count)             { |el| el.find_elements(css: '.stackoverflow-update .update .answer-count h4') }
  elements(:votes)                    { |el| el.find_elements(css: '.stackoverflow-update .update .votes-count p') }
  elements(:answers)                  { |el| el.find_elements(css: '.stackoverflow-update .update .answer-count p') }
  elements(:views)                    { |el| el.find_elements(css: '.stackoverflow-update .update .views-count p') }
  elements(:author)                   { |el| el.find_elements(class: 'so-author') }
  element(:vote_count)                { |el| el.find(css: '.stackoverflow-update .update .votes-count h4') }
  element(:view_count)                { |el| el.find(css: '.stackoverflow-update .update .views-count h4') }
  element(:latest_answer)             { |el| el.find(css: 'callout qtn-answer display-answer') }
  element(:read_full_question_link)   { |el| el.find(css: 'display-answer a') }


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
    wait_for_results
  end

  def questions_loaded?(i)
    wait_for_results
    begin
      wait_for {
        @stack_questions = question_rows
        @stack_questions.size == i
      }
    rescue
      raise("Expected #{i} results but received #{@stack_questions.size}")
    end
  end

  def get_question_with_answer
    find_answer {
      query_questions('with')[1]
    }
    @element = query_questions('with')[0]
  end

  def get_question_without_answer
    find_answer {
      query_questions('without')[1]
    }
    @element = query_questions('without')[0]
  end

  def latest_answer_section_visible?
    @element.text.include?('Latest answer:') || @element.text.include?('Accepted answer:')
  end

  def read_full_question_link
    custom_find(@element, css: 'display-answer a')
  end

  def click_read_full_question_link(link)
    custom_click_on(@element, partial_link_text: link)
  end


  private

  def find_answer(number_of_times=3)
    count = 0; result = false
    until result == true || count == number_of_times
      result = yield
      click_pagination('next') unless result == true
      wait_for_results
      count += 1
    end
  end

  def query_questions(answer)
    questions = @driver.find_elements(:css, '.stackoverflow-update .update .update-meta .row')
    questions.each do |q|
      child_elements = []
      parent_li = q.find_elements(:xpath, './/*')
      parent_li.each do |t|
        @question_element = t
        child_elements << t['class']
        if answer == 'with'
          return @question_element, true if child_elements.include? 'callout qtn-answer display-answer'
        else
          return @question_element, true if !child_elements.include? 'callout qtn-answer display-answer'
        end
      end
    end
  end

end
