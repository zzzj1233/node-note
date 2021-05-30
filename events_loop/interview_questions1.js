/**
 * node关于事件循环的面试题
 */
async function async1() {
    console.log('async1 start')
    await async2()
    console.log('async1 end')
}

async function async2() {
    console.log('async2')
}

console.log('script start')

setTimeout(() => {
    console.log('setTimeout0')
}, 0)

setTimeout(() => {
    console.log('setTimeout300')
}, 300)

setImmediate(() => {
    console.log('setImmediate')
})

process.nextTick(() => {
    console.log('nextTick1')
})

async1()

process.nextTick(() => {
    console.log('nextTick2')
})

new Promise((resolve) => {
    console.log('promise1')
    resolve()
    console.log('promise2')
}).then(() => {
    console.log('promise3')
})

console.log('script end')

// Nodejs队列优先级 : nextTick > microTask > timer > immediate

// line: 14 [ script start ]        nextTick: [] , microTask: [] , timer: [] , immediate: []
// line: 16                         nextTick: [] , microTask: [] , timer: [setTimeout0] , immediate: []
// line: 20                         nextTick: [] , microTask: [] , timer: [setTimeout0] , immediate: []  (other C++Memory : setTimeout 300)
// line: 24                         nextTick: [nextTick1] , microTask: [] , timer: [setTimeout0] , immediate: [setImmediate]  (other C++Memory : setTimeout 300)
// line: 32
// line: 32 -> line: 5              [ async1 start ]
// line: 32 -> line: 5 -> line: 11  [ async2 ]
// line: 32 -> line: 7 (return promise) nextTick: [nextTick1] , microTask: [async1 end] , timer: [setTimeout0] , immediate: [setImmediate]  (other C++Memory : setTimeout 300)
// line: 34                         nextTick: [nextTick1, nextTick2] , microTask: [async1 end] , timer: [setTimeout0] , immediate: [setImmediate]  (other C++Memory : setTimeout 300)
// line: 42 ->  [ promise1 ]        nextTick: [nextTick1, nextTick2] , microTask: [async1 end] , timer: [setTimeout0] , immediate: [setImmediate]  (other C++Memory : setTimeout 300)
// line: 40 ->                      nextTick: [nextTick1, nextTick2] , microTask: [async1 end, promise3] , timer: [setTimeout0] , immediate: [setImmediate]  (other C++Memory : setTimeout 300)
// line: 41 ->  [ promise2 ]
// line: 46 ->  [ script end ]
// [ nextTick1 ]
// [ nextTick2 ]
// [ async1 end ]
// [ promise3 ]
// [ setTimeout0 ]
// [ setImmediate ]
// [ setTimeout300 ]

