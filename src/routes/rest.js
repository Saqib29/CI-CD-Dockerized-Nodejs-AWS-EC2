import express from "express";

const router = express.Router();

/**
 * @swagger
 * /api/hello:
 *   get:
 *     summary: Returns a hello message
 *     description: A simple REST endpoint that returns a JSON greeting.
 *     responses:
 *       200:
 *         description: Success
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Hello from REST API
 */
router.get("/hello", (req, res) => {
  res.json({ message: "Hello from REST API" });
});

export default router;
