import {test, beforeAll, afterAll, describe, expect, beforeEach} from 'vitest'
import {execSync} from 'node:child_process'
import request from 'supertest'
import {app} from '../src/app'
import { afterEach } from 'node:test'

describe('Transactions routes', () => {

    beforeAll( async () => {
        await app.ready()
    })
    
    afterAll(async () =>{
        await app.close()
    })

    beforeEach(() => {
        execSync('yarn knex migrate:rollback --all')
        execSync('yarn knex migrate:latest')
    })

    test('User can create a new transaction', async () => {
        await request(app.server).post('/transactions').send({
        title: 'New transaction',
        amount: 5000,
        type: 'credit'
        }).expect(201)
    })

    test('User can list all transactions', async () => {
        const createTransactionResponse = await request(app.server).post('/transactions').send({
            title: 'New transaction',
            amount: 5000,
            type: 'credit'
        })

        const cookies = createTransactionResponse.get('Set-Cookie')

        const listTransactionResponse = await request(app.server).get('/transactions').set('Cookie', cookies || []).expect(200)

        expect(listTransactionResponse.body.transactions).toEqual([
            expect.objectContaining({
                title: 'New transaction',
                amount: 5000,
            })
        ])
        
    })

})