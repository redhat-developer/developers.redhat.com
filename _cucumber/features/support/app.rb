class App

  def initialize(driver)
    @driver = Capybara.current_session
  end

  def primary_nav
    @primary_nav ||= PrimaryNav.new(@driver)
  end

  def home
    @home ||= Home.new(@driver)
  end

  def downloads
    @downloads ||= DownloadsPage.new(@driver)
  end

  def community
    @community ||= CommunityPage.new(@driver)
  end

  def products
    @products ||= ProductsPage.new(@driver)
  end

  def solutions
    @solutions ||= SolutionsPage.new(@driver)
  end

end
