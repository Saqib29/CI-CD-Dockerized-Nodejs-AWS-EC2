import request from 'supertest'
import type { Express } from 'express'
import { createApp } from '../src/app'

let app: Express

beforeAll(async () => {
  app = await createApp()
})

describe('REST API', () => {
  it('GET /api/hello should return greeting', async () => {
    const res = await request(app).get('/api/hello')
    expect(res.status).toBe(200)
    expect(res.body).toEqual({ message: 'Hello from REST API' })
  })

  it('GET /api/health should return status ok', async () => {
    const res = await request(app).get('/api/health')
    expect(res.status).toBe(200)
    expect(res.body).toEqual({ status: 'ok' })
  })

  it('POST /api/echo echoes body', async () => {
    const payload = { foo: 'bar' }
    const res = await request(app).post('/api/echo').send(payload)
    expect(res.status).toBe(200)
    expect(res.body).toEqual(payload)
  })
})
