"use strict";
var _getSert = require("../getsert");
var generateCode = require("../../../src/utils/code-generator");

class StandardTestDataUtil {
    getSert(input) {
        var Manager = require("../../../src/managers/master/standard-test-manager");
        return _getSert(input, Manager, (data) => {
            return {
                name: data.name
            };
        });
    }

    getNewData() {
        var Model = require("dl-models").master.StandardTest;
        var data = new Model();

        var code = generateCode();

        data.code = code;
        data.name = `Name [${code}]`;
        data.remark = `remark [${code}]`;

        return Promise.resolve(data);
    }

    getTestData() {
        var data = {
            code : generateCode(),
            name: "ST/UAT/TEST",
            remark:"remark for UT"
        };
        return this.getSert(data);
    }
}

module.exports = new StandardTestDataUtil();