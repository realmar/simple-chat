$(function () {
    var socket = io();

    var myWindow = $(window);
    var messageWindow = $('#messageWindow');
    var messages = $('#messages');
    var form = $('form');
    
    var my = {};

    my.init = function() {
        form.focus();
        
        my.attachHandlers();
        my.attachSocketHandlers();
        my.setMessagesHeight();

        form.show();
    }

    my.setMessagesHeight = function() {
        messageWindow.height(myWindow.innerHeight() - form.outerHeight());
        messageWindow.scrollTop(messageWindow.get(0).scrollHeight);
    }

    my.attachHandlers = function() {
        form.submit(function(){
            socket.emit('chat message', $('#m').val());
            $('#m').val('');
            return false;
        });
        
        myWindow.resize(function() {
            my.setMessagesHeight();
        });
    }

    my.attachSocketHandlers = function(){
        socket.on('chat message', function(msg){
            messages.append($('<li>').text(msg));
            my.setMessagesHeight();
        });
    };
    
    my.init();
    return my;
});