$(function() {
    function addUser(user) {
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
      $("#user-search-result").append(html);
    }

    function addDeleteUser(name, id) {
      let html = `
      <div class="chat-group-user clearfix" id="${id}">
        <p class="chat-group-user__name">${name}</p>
        <div class="user-search-remove chat-group-user__btn chat-group-user__btn--remove js-remove-btn" data-user-id="${id}" data-user-name="${name}">削除</div>
      </div>`;
      $(".js-add-user").append(html);
    }

    function addMember(userId) {
      let html = `<input value="${userId}" name="group[user_ids][]" type="hidden" id="group_user_ids_${userId}" />`;
      $(`#${userId}`).append(html);
    }
    $("#user-search-field").on("keyup", function() {
      let input = $("#user-search-field").val();

      $.ajax({
        type: "GET",
        url: "/users",
        data: { keyword: input },
        dataType: "json"
      })

      .done(function(users) {
        $("#user-search-result").empty();
        // .remove();にした場合一致するものが無いという表示がうまくできない
          if (users.length !== 0) {
            users.forEach(function(user) {
            addUser(user);
            });
          }
          else {
          addNoUser();
          }
      })
      .fail(function() {
        alert("通信エラーです。ユーザーが表示できません。");
      });
    });
        
    // ここから下はdoneで帰って来た非同期通信の「追加」と「削除」に関するコード
    $(document).on("click", ".chat-group-user__btn--add", function() {
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