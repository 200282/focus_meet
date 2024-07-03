
const express = require("express")
const app=express();
const http=require("http")
const server=require("http").createServer(app);
const cors = require("cors");
const { Socket } = require("socket.io");
const { default: Peer } = require("peerjs");

const io=require("socket.io")(server,{
cors:{
    origin:"*",
    methods:["GET","POST"]
} 
});

const room='';
var userid='';
var  rooms=[{rid:'',uid:''}];
var message=[{rid:'',m:''}];
var chat=[{rid:'',uid:'',m:''}];
const streams=[{}];
app.use(cors());
const PORT=process.env.PORT || 5000;
app.get("/",(req,res)=>{
res.send("is running");
});
var f=true;
var u='';
io.on('connection',(socket)=>{

    console.log("connect");
socket.emit('me',socket.id);

socket.on('disconnect',(useri)=>{
  socket.leave(room);
    console.log("disconnect");
  
});

socket.on('delete',()=>{
  if(f==false)
  {
    socket.to(room).emit('delete',u);
  }
})

socket.on('go',(stream)=>{
  streams.push(stream);
socket.broadcast.emit('streams',streams);
});

socket.on('create',(room)=>{
     console.log("create",room);
    });

socket.on('join',(room , userid)=>{
  //  rooms.push({rid:room,uid:userid});
  //  console.log(rooms);
  socket.join(room);
      socket.to(room).emit('user_connect',userid) ;
      console.log("join to room :", room ," user is :",userid);
     
   socket.to(room).emit('join',userid) ;
  //  socket.broadcast.emit('user_connect',userid);
   //   socket.emit("getusers", rooms );
});


socket.on('calluser',([usertocall,signaldata,from,name])=>{
io.to(usertocall).emit("calluser",{signal,signaldata,from,name});
});

socket.on('answercall',(data)=>{
    io.to(data.to).emit("callaccepted",data.signal);
});
socket.on("create_message",(room,n)=>{
    message.push({rid:room,m:n});
  const messages= message.filter(message=>message.rid===room);
  socket.broadcast.emit("get_message",message) ;
 socket.to(room).emit('get_message',message) ;
});


socket.on("end",(room)=>{
  console.log('meeting ended');
  socket.to(room).emit("end",room) ;
  socket.leave(room); 
});


socket.on("chat",c=>{
chat.push(c);
console.log("chatting");
console.log(chat);
//socket.to(room).emit("chat",chat) ;
socket.broadcast.emit('chat',chat);
});

socket.on("leave",(r)=>{
  //socket.leave(r);
  socket.to(room).emit("end",room) ;
 // socket.leave(room);
 
    console.log("leave");
  
});


socket.on("share",(vst,room)=>{
  console.log("share");
  socket.to(room).emit("share",vst) ;  
});


});




server.listen(PORT,()=>{console.log("server is running on port ",PORT)});



