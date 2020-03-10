json.array! @users do |user|
    json.id user.id
    json.name user.name
    # この後に設定したものをuser.jsのdoneに戻る
  end