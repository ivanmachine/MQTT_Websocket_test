import { Hono } from 'hono'
import { serve } from '@hono/node-server'

// Create a new Hono app
const app = new Hono()

// Store connected WebSocket clients
const clients = new Set<WebSocket>()

// Basic health check route
app.get('/', (c) => c.text('WebSocket Server Running'))

// WebSocket route
app.get('/ws', (c) => {
  const upgradeHeader = c.req.header('Upgrade')
  
  if (!upgradeHeader || upgradeHeader !== 'websocket') {
    return c.text('Expected websocket', 400)
  }

  const ws = c.upgrade()

  // Add client to connected clients
  clients.add(ws)

  // Handle incoming messages
  ws.onmessage = (message) => {
    console.log('Received:', message.data)
    // Broadcast to all clients
    broadcast(message.data)
  }

  // Handle client disconnect
  ws.onclose = () => {
    console.log('Client disconnected')
    clients.delete(ws)
  }

  // Handle errors
  ws.onerror = (error) => {
    console.error('WebSocket error:', error)
    clients.delete(ws)
  }
})

// Broadcast message to all connected clients
function broadcast(message: string) {
  clients.forEach((client) => {
    if (client.readyState === WebSocket.OPEN) {
      client.send(message)
    }
  })
}

// Start the server
const port = process.env.PORT || 3000
console.log(`Server is running on port ${port}`)

serve({
  fetch: app.fetch,
  port
})