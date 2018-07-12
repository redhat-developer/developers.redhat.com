const fs = require('fs-extra');
const path = require('path');
const http = require('superagent');
const superagentPromisePlugin = require('superagent-promise-plugin');

class Mock {

    constructor() {

    }

    foo() {
        var contents = fs.readFileSync(path.resolve('fixtures/search/hello_world.json'));
        var jsonContent = JSON.parse(contents);
        let url = "https://dcp2.jboss.org/v2/rest/search/developer_materials?tags_or_logic=true&filter_out_excluded=true&from=0&query=hello+world&query_highlight=true&size10=true";
        return http
            .post(url)
            .use(superagentPromisePlugin)
            .send({
                request: {
                    url: url,
                    method: "GET"
                },
                response: {
                    status: 404,
                    "headers": {
                        "content-type": "application/json",
                    },
                    "jsonBody": {jsonContent}
                }
            });
    }
}

module.exports = Mock;

