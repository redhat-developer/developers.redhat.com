const jswiremocklib = require('jswiremock');

export class Wiremock {

    constructor() {
        this.jswiremock = new jswiremocklib.jswiremock(9999);
    }

    stop() {
        this.jswiremock.stopJSWireMock();
    }

    get(url, body) {
        jswiremocklib.stubFor(this.jswiremock, jswiremocklib.get(jswiremocklib.urlEqualTo(url))
            .willReturn(jswiremocklib.a_response()
                .withStatus(200)
                .withHeader({"Content-Type": "application/json"})
                .withBody(JSON.stringify(body))));
    }
}
