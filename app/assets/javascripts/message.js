$(function(){
    function buildHTML(message){
        var insertImage = '';
        if (message.image) {
          insertImage = `<img src="${message.image}">`;
        }
         var html = 
         `<div class="message">
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
        var formData = new FormData(this);
        var url = $(this).attr('action');
       
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
            else {
              alert('メッセージを入力してください');
            }
            
            $('#new_message')[0].reset();
            $('.form__message').animate({scrollTop: $('.form__message')[0].scrollHeight}, 10);
            
            
        })

        .fail(function(){
            alert('メッセージ送信に失敗しました');
        })

        .always(function(){
          $('.form__submit').prop('disabled', false);
        });

        
    });
});
