import express, { Request, Response, Router } from 'express'

const router: Router = express.Router()

// GET /api/hello - Returns a greeting message
router.get('/hello', (_req: Request, res: Response) => {
  res.json({ message: 'Hello from REST API' })
})

router.get('/health', (_req: Request, res: Response) => {
  res.json({ status: 'ok' })
})

router.post('/echo', (req: Request, res: Response) => {
  res.json(req.body)
})

export default router
