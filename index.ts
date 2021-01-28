import Express from 'express'
import { store } from './async_hooks'

const app = Express()

let hooksId = 0
app.use((req, res, next) => {
    store.run(++hooksId, next)
})

function test1() {
    const id = store.getStore()
    console.log(`test1 ${id}`)
}

async function test2() {
    const id = store.getStore()
    console.log(`async test2 ${id}`)
    throw Error('async test2 error')
}

app.get('/test1', (req, res, next) => {
    test1()
    test2()
    const id = store.getStore()
    res.send(`test1! ${id}`)
})
app.post('/test1', (req, res, next) => {
    test1()
    test2()
    const id = store.getStore()
    res.send(`test1! ${id}`)
})
app.use(Express.json())
app.get('/test2', (req, res, next) => {
    test1()
    test2()
    const id = store.getStore()
    res.send(`test2! ${id}`)
})
app.post('/test2', (req, res, next) => {
    test1()
    test2()
    const id = store.getStore()
    res.send(`test2! ${id}`)
})

app.listen(3001, () => {
    console.log('listen')
})
