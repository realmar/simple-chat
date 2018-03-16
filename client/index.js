var chatModule = function () {
    var socket = io();

    var myWindow = $(window);
    var messageWindow = $('#messageWindow');
    var messages = $('#messages');
    var form = $('form');
    var input = $('#m');
    
    var my = {};

    my.init = function() {
        
        my.attachHandlers();
        my.attachSocketHandlers();
        my.setMessagesHeight();

        input.focus();
    }

    my.setMessagesHeight = function() {
        messageWindow.height(myWindow.innerHeight() - form.outerHeight());
        messageWindow.scrollTop(messageWindow.get(0).scrollHeight);
    }

    my.attachHandlers = function() {
        form.submit(function(){
            if(!$.trim(input.val()) == ''){
                socket.emit('chat message', input.val());
                input.val('');
            }
            return false;
        });
        
        myWindow.resize(function() {
            my.setMessagesHeight();
        });
    }

    my.attachSocketHandlers = function(){
        socket.on('chat message', function(msg){
            messages.append($('<li>').text(msg.user + ": " + msg.message));
            my.setMessagesHeight();
        });

        socket.on('new user', function(msg){
            messages.append($('<li>').text(msg + " joined chat!"));
            my.setMessagesHeight();
        });

        socket.on('user left', function(msg){
            messages.append($('<li>').text(msg + " left chat!"));
            my.setMessagesHeight();
        });
    };

    my.init();
    return my;
}

$(document).ready(chatModule);