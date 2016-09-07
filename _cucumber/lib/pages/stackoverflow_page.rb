require_relative 'abstract/standardised_search'

class StackOverflowPage < StandardisedSearch
  page_url('/stack-overflow/')
  expected_element(:div, class: 'stackoverflow-main')
  #page_title('Stack Overflow')

  attr_accessor :element

  element(:product_filter)            { |b| b.select_list(id: 'filterByProduct') }
  elements(:question_rows)            { |b| b.divs(css: '.stackoverflow-update .update .update-meta') }
  elements(:question_summary)         { |b| b.ps(class: 'qtn-content') }
  elements(:question_links)           { |b| b.as(css: 'h4 a') }
  elements(:answer_count)             { |b| b.spans(css: '.stackoverflow-update .update .answer-count h4') }
  elements(:votes)                    { |b| b.spans(css: '.stackoverflow-update .update .votes-count p') }
  elements(:answers)                  { |b| b.spans(css: '.stackoverflow-update .update .answer-count p') }
  elements(:views)                    { |b| b.spans(css: '.stackoverflow-update .update .views-count p') }
  elements(:author)                   { |b| b.spans(class: 'so-author') }

  def selected_filter
    default_dropdown_item(product_filter)
  end

  def select_product(product)
    product_filter.select(product)
    wait_for_results
  end

  def questions_loaded?(i)
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
    questions = @browser.driver.find_elements(:css, '.stackoverflow-update .update .update-meta .row')
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
