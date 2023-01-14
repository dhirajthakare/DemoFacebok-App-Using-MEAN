exports.io = (newIo)=> newIo.on('connection', (socket) => {
    console.log("socket io connection done");
});

