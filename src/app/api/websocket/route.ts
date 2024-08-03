import { NextApiRequest, NextApiResponse } from 'next';
import { WebSocketServer } from 'ws';

const wss = new WebSocketServer({ noServer: true });

wss.on('connection', (ws, req) => {
  const key = req.url?.split('?key=')[1];
  if (key) {
    const interval = setInterval(() => {
      ws.send(`Key: ${key}`);
    }, 5000);

    ws.on('close', () => {
      clearInterval(interval);
    });
  }
});

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'GET') {
    res.status(200).end();
  } else {
    res.status(405).json({ error: 'Не действительный метод' });
  }
}

export const config = {
  api: {
    bodyParser: false,
    externalResolver: true,
  },
};
