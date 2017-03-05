module.exports = {

    hello: function (req, res) {

        // Убедитесь, что это запрос на сокет (не традиционный HTTP)
        if (!req.isSocket) {
            return res.badRequest();
        }

        // Есть сокет, который сделал запрос присоединиться к комнате "funSockets".
        sails.sockets.join(req, 'funSockets');

        // Broadcast уведомление всех sockets, которые присоединились к
        // Но "funSockets" номер, за исключением нашего вновь добавленное гнездо:
        sails.sockets.broadcast('funSockets', 'hello', {howdy: 'hi there!'}, req);

// ^^^
// At this point, we've blasted out a socket message to all sockets who have
// joined the "funSockets" room.  But that doesn't necessarily mean they
// are _listening_.  In other words, to actually handle the socket message,
// connected sockets need to be listening for this particular event (in this
// case, we broadcasted our message with an event name of "hello").  The
// client-side you'd need to write looks like this:
//// На данный момент, мы выброшенными сообщение сокет ко всем разъемам, которые имеют
// Присоединился к "funSockets" номер. Но это не обязательно означает, что они
// Являются _listening_. Другими словами, на самом деле обработать сообщение сокета,
// подключенные розетки необходимо для прослушивания данного события (в этом
// Случай, мы транслировались наше сообщение с именем событий "привет").
// На стороне клиента вы должны были бы написать, выглядит следующим образом:
//
// io.socket.on('hello', function (broadcastedData){
//   console.log(data.howdy);
//   // => 'hi there!'
// }
//
// Now that we've broadcasted our socket message, we still have to continue on
// with any other logic we need to take care of in our action, and then send a
// response.  In this case, we're just about wrapped up, so we'll continue on

// Respond to the request with a 200 OK.
// The data returned here is what we received back on the client as `data` in:
// `io.socket.get('/say/hello', function gotResponse(data, jwRes) { /* ... */ });`
        return res.json({
            anyData: 'we want to send back'
        });
    }
};