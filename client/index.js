var dateModule = {
    parseDate: function(timestamp) {
        return new Date(Date.parse(timestamp));
    },

    formatDate: function(date) {
        return date.getHours() + ':' + date.getMinutes();
    }
}

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
            my.pushNewMessage(msg);
        });

        socket.on('status message', function(msg){
            my.pushNewStatusMessage(msg);
        });
    };

    my.pushNewMessage = function(messageObj){
        var username = $('<div>').text(messageObj.user).addClass('username');
        username.css('color', messageObj.usercolor);

        var time = $('<div>').text(dateModule.formatDate(dateModule.parseDate(messageObj.time))).addClass('time');
        var message = $('<div>').text(messageObj.message).addClass('message');

        var headerDiv = $('<div>').append(username).append(time).addClass('message-header');
        var div = $('<div>').append(headerDiv).append(message).addClass('message-container');
        var html = $('<li>').html(div);

        messages.append(html)
        my.setMessagesHeight();
    }

    my.pushNewStatusMessage = function(messageObj){
        var statusMessage = $('<div>').text(messageObj.message).addClass('status');
        statusMessage.css('color', messageObj.usercolor);
        
        messages.append(statusMessage);
        my.setMessagesHeight();
    }

    my.init();
    return my;
}

$(document).ready(chatModule);