'use strict'
var helper = require('../../helper');
var InternNoteManager = require('../../../src/managers/garment-purchasing/intern-note-manager');
var codeGenerator = require('../../../src/utils/code-generator');

var supplierDataUtil = require('../master/garment-supplier-data-util');
var currencyDataUtil = require('../master/currency-data-util');
var invoiceNoteDataUtil = require('../garment-purchasing/invoice-note-data-util');

class InternNoteDataUtil {
    getNewData() {
        return helper
            .getManager(InternNoteManager)
            .then(manager => {
                return Promise.all([invoiceNoteDataUtil.getNewTestData(), currencyDataUtil.getTestData()])
                    .then(results => {
                        var invoiceNote = results[0];
                        var dataCurrency = results[1];

                        var dateNow = new Date();
                        var dateAfter = new Date();
                        dateAfter.setDate(dateAfter.getDate() + 1);

                        var data = {
                            no: `UT/IN/${codeGenerator()}`,
                            date: dateNow,
                            supplierId: invoiceNote.supplier._id,
                            supplier: invoiceNote.supplier,
                            currency: dataCurrency,
                            hasUnitReceiptNote: false,
                            remark: 'Unit Test Intern Note',
                            items: [invoiceNote]
                        };
                        return Promise.resolve(data);
                    });
            })
    }

    getNewTestData() {
        return helper
            .getManager(InternNoteManager)
            .then((manager) => {
                return this.getNewData().then((data) => {
                    return manager.create(data)
                        .then((id) => manager.getSingleById(id));
                });
            });
    }

}

module.exports = new InternNoteDataUtil();
