json.array! @messages do |message|
  
    json.content message.content
    json.image message.image.url
    # image.urlという記載をしている理由はimageの中にあるurlを取得するため
    json.created_at message.created_at.strftime("%Y年%m月%d日 %H時%M分")
    json.user_name message.user.name
    json.id message.id
  end
# [{content: message.image, image: message.image.url.......}]