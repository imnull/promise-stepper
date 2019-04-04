
const singleton = (factory, config = {}) => {
    return () => new Promise((resolve, reject) => {
        let state = 0, R = undefined;
        let { timeout = 1000, delay = 200, cache = 1000 } = config;
        if(state === 0){
            let timeoutHandle = setTimeout(() => {
                if(state === 1){
                    state = 0;
                }
            }, timeout);
            state = 1;
            factory().then(r => {
                clearTimeout(timeoutHandle);
                if(state === 1){
                    state = 2;
                }
                let cacheHandle = setTimeout(() => {
                    clearTimeout(cacheHandle);
                    state = 0;
                    R = undefined;
                }, cache);
                R = r;
                resolve(r);
            }, err => {
                clearTimeout(timeoutHandle);
                state = 0;
                reject(err);
            });
        } else if(state === 1){
            setTimeout(() => {
                singleton(factory, timeout, delay).then(resolve, reject)
            }, delay);
        } else if(state === 2){
            resolve(R);
        }
    });
};

const factory = () => new Promise(resolve => {
    setTimeout(() => { resolve(Date.now()) }, 500);
})

let promise = singleton(factory);

promise().then(r => console.log(r));
promise().then(r => console.log(r));
promise().then(r => console.log(r));
promise().then(r => console.log(r));
promise().then(r => console.log(r));
promise().then(r => console.log(r));
promise().then(r => console.log(r));
promise().then(r => console.log(r));
promise().then(r => console.log(r));