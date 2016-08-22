module PageHelper
  attr_accessor :current_page

  def visit(page_class, &block)
    on page_class, true, &block
  end

  def on(page_class, visit=false, &block)
    page = page_class.new(@driver, visit)
    block.call page if block
    @current_page = page
  end

end
