$(function() {
    function addUser(user) {
      // ユーザーを検索した際に、該当する人がいた場合表示する
      let html = `
        <div class="chat-group-user clearfix">
          <p class="chat-group-user__name">${user.name}</p>
          <div class="user-search-add chat-group-user__btn chat-group-user__btn--add" data-user-id="${user.id}" data-user-name="${user.name}">追加</div>
        </div>
      `;
      $("#user-search-result").append(html);
      
    }
  
    function addNoUser() {
      let html = `
        <div class="chat-group-user clearfix">
          <p class="chat-group-user__name">ユーザーが見つかりません</p>
        </div>
      `;
      // 上記は追加するHTML
      $("#user-search-result").append(html);
      // ユーザーがいなかった際に表示する記述

    }

// 　ここから下は非同期通信で表示されたuserを削除するコマンドと追加するコマンド
    function addDeleteUser(name, id) {
      // userIdとidは同じ意味なので、こっそりaddMemberのhtmlをくっつけてidを付与している
      // 付与している理由は、更新するを押した際に、groups_controller.rbにparmusとして送るため
      let html = `
      <div class="chat-group-user clearfix" id="${id}">
        <p class="chat-group-user__name">${name}</p>
        <div class="user-search-remove chat-group-user__btn chat-group-user__btn--remove js-remove-btn" data-user-id="${id}" data-user-name="${name}">削除</div>
      </div>`;
      // 上記は追加するHTML
      $(".js-add-user").append(html);
      // 追加ボタンを押した後に下に表示されるようにする記述
    }

    // addMemberの記述は画面には出てこないけど、IDの付与を行うために必要
    // ぶっちゃけよくわからん
    // userIdを追加ボタンを押した際に、parmusとして、userIDがこっそり送られるようにする。
    function addMember(userId) {
      let html = `<input value="${userId}" name="group[user_ids][]" type="hidden" id="group_user_ids_${userId}" />`;
      $(`#${userId}`).append(html);
    }// ここの記述がよくわからない。



    $("#user-search-field").on("keyup", function() {
      let input = $("#user-search-field").val();
      
      // テキストフィールドに文字が入力されるたびにイベントが呼び出される
      $.ajax({
        type: "GET",
        url: "/users",
        data: {keyword:  input },
        dataType: "json"
      })

      .done(function(users) {
        $("#user-search-result").empty();
        // .remove();にした場合一致するものが無いという表示がうまくできない
        // ここの記述がないと、どんどん下に積み重なってしまう
        // 存在しているものを消したいと考えると比較的わかりやすい
          if (users.length !== 0) {
            // 条件分岐でユーザーの文字が0でない場合はif文を実行する
            users.forEach(function(user) {
            addUser(user);
            
            });
          }
          else {
            // 文字が何もなかった際にはaddNOUserが発火する。
          addNoUser();
          }
      })
      .fail(function() {
        alert("通信エラーです。ユーザーが表示できません。");
      });
    });
        
    // ここから下はdoneで帰って来た非同期通信の「追加」と「削除」に関するコード
    $(document).on("click", ".chat-group-user__btn--add", function() {
    // 非同期で追加されてhtmlはjs側ではそのhtmlを認識されないから、documentで再度htmlを
    // 読ませることで、非同期で追加させたhtmlを認識させる
      userName = $(this).data("user-name");
      userId = $(this).data("user-id");
      $(this).parent().remove();
      // .chat-group-user__btn--addの親要素を.parent()で取得して、.remove()で削除する。
        addDeleteUser(userName, userId);
        // 下の欄に追加する記述
        addMember(userId);
    });

    $(document).on("click", ".chat-group-user__btn--remove", function() {
      $(this).parent().remove();
     
    });
  });