class FooterSection {

    footerDropdownItems(i) {
        return $(`//*[@id="collapseFooter"]/div[${i}]/h3`);
    }

    sectionContent(i) {
        return $(`//*[@id="collapseFooter"]/div[${i}]/div`);
    }

    collapseFooter(i) {
        if ($(`//*[@id="collapseFooter"]/div[${i}][contains(@class,'collapsed')]`).isVisible()) {
            let footerItem = this.footerDropdownItems(i);
            let location = this.footerDropdownItems(i).getLocationInView();
            footerItem.scroll(location['x'], location['y']);
            footerItem.click();
        }
    }
}

module.exports = FooterSection;
