class Site

  attr_accessor :current_page

  def initialize(driver)
    @driver = driver
  end

  def site_nav
    @site_nav ||= SiteNav.new(@driver)
    @current_page = @site_nav
  end

  def home
    @home ||= Home.new(@driver)
    @current_page = @home
  end

  def login
    @login ||= LoginPage.new(@driver)
    @current_page = @login
  end

  def forgot_password
    @forgot_password ||= ForgotPassword.new(@driver)
    @current_page = @forgot_password
  end

  def update_password
    @update_password ||= UpdatePassword.new(@driver)
    @current_page = @update_password
  end

  def registration
    @registration ||= Registration.new(@driver)
    @current_page = @registration
  end

  def additional_information
    @additional_information ||= AdditionalInformation.new(@driver)
    @current_page = @additional_information
  end

  def extended_registration
    @extended_registration ||= ExtendedRegistration.new(@driver)
    @current_page = @extended_registration
  end

  def confirmation
    @confirmation ||= RegistrationConfirmation.new(@driver)
    @current_page = @confirmation
  end

  def product_overview
    @product_overview ||= ProductOverviewPage.new(@driver)
    @current_page = @product_overview
  end

  def technologies
    @technologies ||= Technologies.new(@driver)
    @current_page = @technologies
  end

  def downloads
    @downloads ||= DownloadsPage.new(@driver)
    @current_page = @downloads
  end

  def upgrade_account
    @upgrade_account ||= UpgradeAccount.new(@driver)
    @current_page = @upgrade_account
  end

  def get_started
    @get_started ||= GetStartedPage.new(@driver)
    @current_page = @get_started
  end

  def download_overview
    @download_overview ||= ProductDownloadPage.new(@driver)
    @current_page = @download_overview
  end

  def terms_and_conditions
    @terms_and_conditions ||= TermsAndConditions.new(@driver)
    @current_page = @terms_and_conditions
  end

  def search
    @search ||= SearchPage.new(@driver)
    @current_page = @search
  end

  def link_to_github
    @link_to_github ||= LinkToGitHub.new(@driver)
    @current_page = @link_to_github
  end

  def github
    @github ||= GitHubPage.new(@driver)
    @current_page = @github
  end

end
