"use strict";

class JobContract {
    constructor() {
        LocalContractStorage.defineProperties(this, {
            admin: null,
            size: null,
            carouselSize: null,
            normalFee: null,
            carouselFee: null
        });
        LocalContractStorage.defineMapProperty(this, 'jobs');
        LocalContractStorage.defineMapProperty(this, 'carousel');
        LocalContractStorage.defineMapProperty(this, 'jobPostBy');
    }

    init() {
        this.admin = Blockchain.transaction.from;
        this.size = 0;
        this.carouselSize = 0;
        this.normalFee = new BigNumber(1000000000000000);       // 0.001 NAS
        this.carouselFee = new BigNumber(100000000000000000);   // 0.1 NAS
    }

    getJobs(page, limit) {
        page = page || 1;
        limit = limit || 10;
        const maxAmount = this.size;
        const maxPage = Math.ceil(maxAmount / limit);
        let start = null,
            end = null,
            jobs = [];
        if (maxAmount > 0 && page <= maxPage) {
            if (maxPage === page) {
                start = 1;
                end = maxAmount - (page - 1) * limit;
            } else {
                start = maxAmount - page * limit + 1;
                end = maxAmount - (page - 1) * limit;
            }
            for (let i = start; i <= end; i++) {
                const job = this.jobs.get(i);
                jobs.unshift(job);
            }
        }
        return {
            jobs: jobs,
            page: page,
            limit: limit,
            size: maxAmount
        }
    }

    getCarousel() {
        return this.carousel
    }

    getJobPostBy() {
        const owner = Blockchain.transaction.from;
        return this.jobPostBy.get(owner);
    }

    createJob(detail) {
        const amount = Blockchain.transaction.value;
        if (amount.lt(this.normalFee)) {
            throw new Error("Insufficient NAS");
        }
        this.size++;
        let job = {
            hash: Blockchain.transaction.hash,
            publisher: Blockchain.transaction.from,
            title: detail.title,
            link: detail.link || '#',
            location: detail.location,
            type: detail.type,
            category: detail.category,
            salary: detail.salary,
            exp: detail.exp,
            edu: detail.edu,
            company: detail.company,
            website: detail.website || '#',
            domain: detail.domain,
            scale: detail.scale,
            phase: detail.phase,
            datetime: new Date()
        };
        this.jobs.put(this.size, job);
        Event.Trigger('createJob', {
            id: id,
            hash: Blockchain.transaction.hash
        });
    }

    createCarousel(detail) {
        const amount = Blockchain.transaction.value;
        if (amount.lt(this.carouselFee)) {
            throw new Error("Insufficient NAS");
        }
        this.carouselSize++;
        let carousel = {
            hash: Blockchain.transaction.hash,
            publisher: Blockchain.transaction.from,
            link: detail.link,
            image: detail.image
        };
        this.carousel.put(this.carouselSize, carousel);
        Event.Trigger('createJob', {
            id: id,
            hash: Blockchain.transaction.hash
        });
    }

    deleteCarousel(id) {
        if (Blockchain.transaction.from === this.admin) {
            this.carouselSize--;
            this.carousel.del(id);
        } else {
            throw new Error("Permission Denied");
        }
    }

    setNormalFee(value) {
        if (Blockchain.transaction.from === this.admin) {
            this.normalFee = new BigNumber(value);
        } else {
            throw new Error("Permission Denied");
        }
    }

    setCarouselFee(value) {
        if (Blockchain.transaction.from === this.admin) {
            this.carouselFee = new BigNumber(value);
        } else {
            throw new Error("Permission Denied");
        }
    }

    setAdministrator(address) {
        if (Blockchain.transaction.from === this.admin) {
            this.admin = address;
        } else {
            throw new Error("Permission Denied");
        }
    }

    transfer(value) {
        let amount = new BigNumber(value);
        if (Blockchain.transaction.from === this.admin) {
            Blockchain.transfer(this.admin, amount);
        } else {
            throw new Error("Permission Denied");
        }
    }
}

module.exports = JobContract;