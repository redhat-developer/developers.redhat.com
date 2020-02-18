import Login from '../support/pages/keycloak/Login.page';
import ProductOverview from '../support/pages/website/ProductOverview.page';
import CheatSheets from '../support/pages/website/CheatSheets.page';
import DownloadDir from '../support/utils/DownloadDir';
import Utils from '../support/utils/Utils';

tags('desktop').describe('Download Manager', function() {
    // eslint-disable-next-line no-invalid-this
    this.retries(2);

    beforeEach(function() {
        DownloadDir.init();
        Utils.cleanSession();
    }, 2);

    it('@downloads: should allow users to login in and download RHEL', function() {
        ProductOverview
            .open('rhel', 'download')
            .download();
        Login.with(process.env.RHD_KEYCLOAK_ADMIN_USERNAME, process.env.RHD_KEYCLOAK_ADMIN_PASSWORD);
        ProductOverview.awaitDownloadThankYou();
        const downloadName = DownloadDir.get();
        expect(downloadName.toString(), 'rhel download was not triggered').to.include('rhel');
    });

    it('@downloads: should allow users to login and download advanced-linux-commands', function() {
        /*
            Please see https://issues.jboss.org/browse/DEVELOPER-5938
            The DownloadManager is hard-coded and does not respect environment configuration. This means that some Downloads are hard-coded to use production URLs. We cannot
            test these in lower environments because the authentication flow is not correct (non-PR environments do not authenticate with production Keycloak).
            Fundamentally DownloadManager should respect environment configuration.

						This has become more complicated unfortunately because a number of Cheatsheets and Ebooks now are created using the Page content type. The download manager links on
						these pages are entered into WYSIWYG fields of Rich Text assemblies. This makes it much more difficult to target and contextually switch the download manager link(s)
            to the correct environment.
         */
        if (Utils.isProduction()) {
          CheatSheets
              .open('advanced-linux-commands')
              .loginToDownload();
          Login.with(process.env.RHD_KEYCLOAK_ADMIN_USERNAME, process.env.RHD_KEYCLOAK_ADMIN_PASSWORD);
          CheatSheets.awaitDownloadThankYou();
          const downloadName = DownloadDir.get();
          expect(downloadName.toString(), 'rhel advanced linux cheatsheet download was not triggered').to.include('rheladvancedlinux_cheat_sheet');
        }
    });

    afterEach(function() {
        DownloadDir.destroy();
        Utils.cleanSession();
    }, 2);
});
