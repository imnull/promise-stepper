const reducer = (factories = [], args) => {
    return new Promise((resolve, reject) => {
        if(!Array.isArray(factories)){
            factories = [];
        }
        if(factories.length < 1){
            resolve(args);
        } else {
            factories = [...factories];
            let factory = factories.shift();
            try {
                let promise = factory(args);
                if(promise instanceof Promise){
                    promise.then((args) => {
                        reducer(factories, args).then(resolve, reject)
                    }, error => {
                        console.error('PromiseReducer Error(1)', { factory, error });
                        reducer(factories, args).then(resolve, reject);
                    })
                } else {
                    if(typeof(promise) !== 'undefined'){
                        args = promise;
                    }
                    reducer(factories, args).then(resolve, reject);
                }
            } catch(error) {
                console.error('PromiseReducer Error(0)', { factory, error });
                reducer(factories, args).then(resolve, reject);
            }
        }
    })
};

module.exports = reducer;