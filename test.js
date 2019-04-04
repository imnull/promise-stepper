const reducer = require('./reducer');

reducer([
    () => { throw 'tese error' }, // reducer 抛错测试
    (args) => new Promise(r => r([...args, 1])),
    () => { throw 'tese error' }, // reducer 抛错测试
    (args) => new Promise(r => r([...args, 2])),
    () => new Promise((resolve, reject) => { throw 'test error promise' }),
    (args) => new Promise(r => r([...args, 3])),
    (args) => new Promise(r => r([...args, 4])),
    () => new Promise((resolve, reject) => { throw 'test error promise' }),
    (args) => new Promise(r => r([...args, 5])),
    () => { throw 'tese error' }, // reducer 抛错测试
    () => new Promise((resolve, reject) => { throw 'test error promise' }),
    () => { throw 'tese error' }, // reducer 抛错测试
    (args) => new Promise(r => r([...args, 6])),
    () => new Promise((resolve, reject) => { throw 'test error promise' }),
    (args) => [...args, 7],
    () => new Promise((resolve, reject) => { throw 'test error promise' }),
], [0]).then(r => {
    console.log(r)
})