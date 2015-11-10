class App

  attr_reader :current_page
  # :current_page sets an instance variable for current page. This makes common steps more readable.
  # for example expect(@site.current_page.title).to have_text("Example")

  def initialize(driver)
    @driver = Capybara.current_session
  end

  def primary_nav
    @primary_nav ||= PrimaryNav.new(@driver)
    @current_page = @primary_nav
  end

  def home
    @home ||= Home.new(@driver)
    @current_page = @home
  end

  def solutions
    @solutions ||= SolutionsPage.new(@driver)
    @current_page = @solutions
  end

  def products
    @products ||= ProductsPage.new(@driver)
    @current_page = @products
  end

  def product_overview
    @product_overview ||= ProductOverviewPage.new(@driver)
    @current_page = @product_overview
  end

  def downloads
    @downloads ||= DownloadsPage.new(@driver)
    @current_page = @downloads
  end

  def resources
    @resources ||= ResourcesPage.new(@driver)
    @current_page = @resources
  end

  def community
    @community ||= CommunityPage.new(@driver)
    @current_page = @community
  end

  def events
    @events ||= EventsPage.new(@driver)
    @current_page = @events
  end

end
