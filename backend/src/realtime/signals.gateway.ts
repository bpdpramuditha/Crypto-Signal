import { WebSocketGateway, WebSocketServer } from '@nestjs/websockets';
import { Server } from 'ws';

@WebSocketGateway({ path: '/ws' })
export class SignalsGateway {
  @WebSocketServer()
  server: Server;

  broadcast(payload: any) {
    if (!this.server) return;
    const msg = JSON.stringify({ type: 'signal', data: payload });
    this.server.clients.forEach((c) => {
      if ((c as any).readyState === 1) (c as any).send(msg);
    });
  }
}
