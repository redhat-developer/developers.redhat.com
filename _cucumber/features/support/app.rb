class App

  attr_reader :current_page
  # :current_page sets an instance variable for current page. This makes common steps more readable.
  # for example expect(@page.current_page.title).to have_text("Example")

  def initialize(driver)
    @driver = Capybara.current_session
  end

  def login
    @login ||= LoginPage.new(@driver)
    @current_page = @login
  end

  def forgot_password
    @forgot_password ||= ForgotPassword.new(@driver)
    @current_page = @forgot_password
  end

  def password_reset
    @password_reset ||= PasswordReset.new(@driver)
    @current_page = @password_reset
  end

  def registration
    @registration ||= Registration.new(@driver)
    @current_page = @registration
  end

  def upgrade_account
    @upgrade_account ||= UpgradeAccount.new(@driver)
    @current_page = @upgrade_account
  end

  def terms_and_conditions
    @terms_and_conditions ||= TermsAndConditions.new(@driver)
    @current_page = @terms_and_conditions
  end

  def home
    @home ||= Home.new(@driver)
    @current_page = @home
  end

  def solutions
    @solutions ||= SolutionsPage.new(@driver)
    @current_page = @solutions
  end

  def technologies
    @technologies ||= Technologies.new(@driver)
    @current_page = @technologies
  end

  def product_overview
    @product_overview ||= ProductOverviewPage.new(@driver)
    @current_page = @product_overview
  end

  def download_overview
    @download_overview ||= ProductDownloadPage.new(@driver)
    @current_page = @download_overview
  end

  def downloads
    @downloads ||= DownloadsPage.new(@driver)
    @current_page = @downloads
  end

  def get_started
    @get_started ||= GetStartedPage.new(@driver)
    @current_page = @get_started
  end

  def resources
    @resources ||= ResourcesPage.new(@driver)
    @current_page = @resources
  end

end
