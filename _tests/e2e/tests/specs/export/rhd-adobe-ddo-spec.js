import Driver from '../support/utils/Driver.Extension';
import Home from '../support/pages/website/Home.page';
import Login from '../support/pages/keycloak/Login.page';
import NavigationBar from '../support/pages/website/NavigationBar.section';
import BasicPage from '../support/pages/website/BasicPage.page';
import ProductOverview from '../support/pages/website/ProductOverview.page';
import Utils from '../support/utils/Utils';

describe('Adobe DDO', function() {
    // eslint-disable-next-line no-invalid-this
    this.retries(1);

    it("should have a valid digitalData object on the homepage", () => {
        Home.open('/');
        const digitalData = Driver.getAdobeDdo();

        if (Utils.isManagedPaasEnvironment() || Utils.isProduction()) {
            expect(digitalData.page.category.primaryCategory).to.equal("home page");
            expect(digitalData.page.category.subCategories[0]).to.equal("cms");
            expect(digitalData.page.pageInfo.title).to.equal("Red Hat Developer Homepage");
        }
        else {
            expect(digitalData).to.not.be.null;
        }
    });

    it("should have a valid digitalData object on the Kubernetes topic page", () => {
        BasicPage.open('topics/kubernetes');
        const digitalData = Driver.getAdobeDdo();

        if (Utils.isManagedPaasEnvironment() || Utils.isProduction()) {
            expect(digitalData.page.category.primaryCategory).to.equal("topics");
            expect(digitalData.page.category.subCategories[0]).to.equal("kubernetes");
        }
        else { 
            expect(digitalData).to.not.be.null;
        }
    });

    it("should have a valid digitalData object on the /rhel8 page", () => {
        BasicPage.open('rhel8');
        const digitalData = Driver.getAdobeDdo();

        if (Utils.isManagedPaasEnvironment() || Utils.isProduction()) {
            expect(digitalData.page.category.primaryCategory).to.equal("rhel8");
        }
        else { 
            expect(digitalData).to.not.be.null;
        }
    });

    it("should have a valid digitalData object on the RHEL product page", () => {
        ProductOverview.open('rhel', 'download');
        const digitalData = Driver.getAdobeDdo();

        if (Utils.isManagedPaasEnvironment() || Utils.isProduction()) {
            expect(digitalData.page.category.primaryCategory).to.equal("products");
            expect(digitalData.page.category.subCategories[0]).to.equal("rhel");
            expect(digitalData.page.category.subCategories[1]).to.equal("download");
        }
        else { 
            expect(digitalData).to.be.null;
        }
    });

    it("should have a valid digitalData object on the OpenJDK product page", () => {
        ProductOverview.open('openjdk', 'download');
        const digitalData = Driver.getAdobeDdo();

        if (Utils.isManagedPaasEnvironment() || Utils.isProduction()) {
            expect(digitalData.page.category.primaryCategory).to.equal("products");
            expect(digitalData.page.category.subCategories[0]).to.equal("openjdk");
            expect(digitalData.page.category.subCategories[1]).to.equal("download");
        }
        else { 
            expect(digitalData).to.not.be.null;
        }
    });

});
