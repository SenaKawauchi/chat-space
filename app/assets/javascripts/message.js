$(function(){
    function buildHTML(message){
        var insertImage = '';
        if (message.image) {
          insertImage = `<img src="${message.image}">`;
        }
        // ここから上の記述がよくわからない
         var html = `<div class="message" data-message-id="${message.id}">
                      <div class="upper-message">
                        <div class="upper-message__user-name">
                          ${message.user_name}
                        </div>
                        <div class="upper-message__date">
                          ${message.created_at}
                        </div>
                      </div>
                      <div class="lower-message">
                        <p class="lower-message__content">
                          ${message.content}
                        </p>
                        ${insertImage}
                      </div>
                    </div>`
   
        return html;
    }

    
    $('#new_message').on('submit', function(e){
        e.preventDefault();
        // デフォルトのイベントを止める
        var formData = new FormData(this);
        var url = $(this).attr('action');
        // $(this).attr('action');この記述でパスを取得することができる！→console.logで確認してみるといい！
        $.ajax({
            url: url,
            type: "POST",
            data: formData,
            dataType: 'json',
            processData: false,
            contentType: false
        })
        .done(function(data){
            var html = buildHTML(data);
            if (data.length != 0) {
            $('.messages').append(html);}
            // .messageに追加してしまうと全ての投稿に追加されてしまうので、親要素である.messagesに追加する
            else {
              alert('メッセージを入力してください');
            } 
            $('#new_message')[0].reset();
            $('.messages').animate({scrollTop: $('.messages')[0].scrollHeight}, "fast");  
        })
        .fail(function(){
            alert('メッセージ送信に失敗しました');
        })
        .always(function(){
          $('.form__submit').prop('disabled', false);
          
        });
    });


    var reloadMessages = function() {
        last_message_id = $('.message').last().data('message-id')
        $.ajax({
          url: 'api/messages',
          type: 'get',
          dataType: 'json',
          data: { id: last_message_id }
        })
        .done(function(messages) {
          var insertHTML = '';
          messages.forEach(function (message){
            console.log(message)
            insertHTML = buildHTML(message);
            $('.messages').append(insertHTML);
            $('.messages').animate({scrollTop: $('.messages')[0].scrollHeight}, "fast");
          })
        })
        .fail(function() {
          console.log('自動更新に失敗しました');
        })}
        setInterval(reloadMessages, 7000);

});