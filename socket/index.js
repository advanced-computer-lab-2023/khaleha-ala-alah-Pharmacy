const io=require('socket.io')(4001,{
    cors:{
         origin:'http://localhost:3000'
    }
});

const {saveMessage} = require('./database.js');
let users=[];

const addUser=(userID,socketID)=>{
    !users.some(user=>user.userID===userID) &&
    users.push({userID,socketID});
}
const removeUser=(socketID)=>{
    users=users.filter(user=>user.socketID!==socketID);
}

io.on('connection',socket=>{
    //connection
    console.log("a user connected "+socket.id);
    socket.on("addUser",userID=>{
        addUser(userID,socket.id);
    })
    //send  and get messages
    socket.on("sendMessage",({senderId,receiverId,text,file,fileType,voiceNote})=>{
        const user=users.find(user=>user.userID===receiverId);
        if(user){
            if(voiceNote){
                console.log(voiceNote);
                io.to(user.socketID).emit("getMessage",{
                    senderId,
                    text,
                    file:voiceNote.blob,
                    fileType:"audio/wav"
                })
                return;
            }
            io.to(user.socketID).emit("getMessage",{
                senderId,
                text,
                file,
                fileType
            })
        }
         const newMessage = {
            senderId,
            receiverId,
        };
        saveMessage(newMessage);
    })

    //disconnection
    socket.on("disconnect",()=>{
        console.log("a user disconnected ");
        removeUser(socket.id);
    });

})