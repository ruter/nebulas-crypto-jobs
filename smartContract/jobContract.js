"use strict";

class JobContract {
    constructor() {
        LocalContractStorage.defineMapProperty(this, 'jobPostBy');
    }

    init() {

    }
}

module.exports = JobContract;