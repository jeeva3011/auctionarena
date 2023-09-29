import { WebSocketGateway, SubscribeMessage, MessageBody, WebSocketServer } from '@nestjs/websockets';
import { LiveService } from './live.service';
import { CreateLiveDto } from './dto/create-live.dto';
import { UpdateLiveDto } from './dto/update-live.dto';
import { Server,Socket } from 'socket.io';
import { OnModuleInit, UnauthorizedException } from '@nestjs/common';

@WebSocketGateway(
  {cors:{
    origin:"*"
  }}
)
export class LiveGateway implements OnModuleInit{
  constructor(private readonly liveService: LiveService) {}
  private readonly rooms = new Map<string, Socket[]>()
  private readonly users = new Map<string, string[]>()
  private sockets: any
    @WebSocketServer()
    server: Server

    onModuleInit() {
        this.server.on('connect',(socket)=>{
          console.log("connected to:",socket.id)
          this.sockets = socket
          socket.on("disconnect", () => {
            console.log("Disconnected from the WebSocket server");
          })
          socket.on('onMessage', (data)=>{console.log(data)})
          socket.on('end-live',(data)=>{console.log(data)})
          socket.on('joinRoom', (data) => {console.log('joinRoom',data)})
          socket.on('room-created',(data)=>{console.log(data)}) 
          socket.on('current-auction', (data)=>{console.log("current-auction",data)})
          socket.on('auction-data',(data)=>{console.log('auction-data',data)})
          socket.on('sold-data',(data)=>{console.log(data)})
          socket.on('room-join-success', (data)=>{console.log(data)})
        })
    }


  @SubscribeMessage('create-room')
  onCreateROom(@MessageBody() body: any){
    if (!this.rooms.has(body.roomName)) {
      this.rooms.set(body.roomName, [this.sockets]);
      this.server.emit('room-created', { roomName:body.roomName, message: 'success' });
    } else {
      this.server.emit('room-created', { roomName:body.roomName, message: 'error' });
    }
  }

  @SubscribeMessage('file-status')
  onFileUpload(@MessageBody() body:any){
    this.server.emit('file-upload-complete',body)
  }
  @SubscribeMessage('progress-bar')
  onProgressBar(@MessageBody() body:any){
    this.server.emit('progress-percent', body)
  }
  // @SubscribeMessage('start-bid')
  // onTeamBid(@MessageBody() body: any){
  //   this.server.emit('team-bid', {userName: body.userName, playerName:body.playerName, points:body.points, roomName: body.roomName, message: body.message})
  // }

  @SubscribeMessage('sold-unsold')
  onSoldUnsold(@MessageBody() body: any){
    this.server.emit('sold-data',body)
  }

  @SubscribeMessage('current-auction')
  onCurrentAuction(@MessageBody() body: any){
    this.server.emit('auction-data',body)
  }

  @SubscribeMessage('delete-room')
  onDeleteRoom(@MessageBody() body: any){
    if (this.rooms.has(body.roomName)) {
      const sockets = this.rooms.get(body.roomName) ?? [];
        if(body.userName==='HOST'){
          this.rooms.delete(body.roomName);
          this.users.delete(body.roomName);
          this.server.emit('end-live', { roomName:body.roomName, message: 'success' });
        }
        else {
          this.server.emit('end-live', { roomName:body.roomName, message: 'unauthorized' });
        }
    } else {
      this.server.emit('end-live', { roomName:body.roomName, message: 'error' });
    }
  }

  @SubscribeMessage('joinRoom')
  onJoinRoom(@MessageBody() body: any){
    if (!this.rooms.has(body.roomName)) {   
      this.server.emit('room-join-success', { roomName:body.roomName,userName:body.userName, message: 'error' });
    } else {
      this.sockets.join(body.roomName);
      const allUsers = this.users.get(body.roomName) ?? [];
      const usersockets = this.rooms.get(body.roomName) ?? [];
      allUsers.push(body.userName);
      usersockets.push(this.sockets);
      this.users.set(body.roomName, allUsers);
      this.rooms.set(body.roomName, usersockets);
      this.server.emit('room-join-success', { roomName:body.roomName, userName:body.userName, message: 'success' })
    }

  }
  @SubscribeMessage('newMessage')
  onNewMessage(@MessageBody() body: any) {
    console.log(body);
    const { roomName, message, userName } = body;
    if (roomName) {
      this.server.emit('onMessage', {
        roomName: roomName,
        msg: 'New Message',
        body,
    })
    }
  }

  @SubscribeMessage('findAllLive')
  findAll() {
    return this.liveService.findAll();
  }

  @SubscribeMessage('findOneLive')
  findOne(@MessageBody() id: number) {
    return this.liveService.findOne(id);
  }

  @SubscribeMessage('updateLive')
  update(@MessageBody() updateLiveDto: UpdateLiveDto) {
    return this.liveService.update(updateLiveDto.id, updateLiveDto);
  }

  @SubscribeMessage('removeLive')
  remove(@MessageBody() id: number) {
    return this.liveService.remove(id);
  }
}
