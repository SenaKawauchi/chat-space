$(function(){
    function buildHTML(message){
        var insertImage = '';
        if (message.image) {
          insertImage = `<img src="${message.image}">`;
        }
        // ここから上の記述はimageが存在した場合はif文が実装される
        // HTMLはimageがあった際のviewに追加するための記述！
         var html = `<div class="message" data-message-id=${message.id}>
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
      // ここのメソッドは非同期通信の記述
        e.preventDefault();
        // デフォルトのイベントを止める
        // 今回でいうとsubmitを押した際に、指定されたredirect_toの発火するというイベントをストップさせている
        // preventDefault();を実行しないとredirect_toが発火して同期通信になってしまう
        var formData = new FormData(this);
        var url = $(this).attr('action');
       
        // 上記の.attr('action')はhamlで書いているurlをattrで取得している
        // $(this).attr('action');この記述でパスを取得することができる！→console.logで確認してみるといい！
        $.ajax({
            url: url,
            // パス的な役割
            type: "POST",
            // httpメソッド
            data: formData,
            // new_messageで取得したデータ
            dataType: 'json',
            // どのような形で情報を送るかを設定指定いる。

            processData: false,
            contentType: false
        })
        .done(function(data){

            var html = buildHTML(data);
            if (data.length !=0) {
            $('.messages').append(html);}
            // ここの記述はhamlの方で設定している記述なので、_message.html.hamlを読んでいる
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
      // ここのメソッドは自動更新の記述
        last_message_id = $('.message').last().attr('data-message-id') 
       
        // .last()を使って、HTML要素の中から最後の要素を取得して.data()を使ってmessage-idのidを取得している
        $.ajax({
          url: 'api/messages',
          // apiを指定している理由はわかりやすくするためだけ。指定しないでmessages_controllerに記述しても一応できる！
          type: 'get',
          dataType: 'json',
          data: { id: last_message_id }
        })

        .done(function(messages) {
          // done(function(messages)のmessageはapi.index.json.jbuilderのmessages
          var insertHTML = '';
          messages.forEach(function (message){

            
            // forEachで記述しているのは、index.json.jduilderで
            // json.array! @messages do |message|という記述があるため配列から１つずつ取り出している
            insertHTML = buildHTML(message);
           
            $('.messages').append(insertHTML);
            $('.messages').animate({scrollTop: $('.messages')[0].scrollHeight}, "fast");
             
          })
        })
        .fail(function() {
          alert('自動更新に失敗しました');
    })}

    if (document.location.href.match(/\/groups\/\d+\/messages/)) {
      // document.location.href.matchこの記述によって以下のパスの場合のみ、
      // setInterval(reloadMessages, 5000);が発火するようになる
        setInterval(reloadMessages, 5000);
        // 時間がたった際に発火するメソッド
        // 一定時間が経過するごとに処理  
        // 自動更新を発火させる起点になっている。
    }
});