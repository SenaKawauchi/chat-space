class Api::MessagesController < ApplicationController
  def index
    group = Group.find(params[:group_id])
    last_message_id = params[:id].to_i
    # nullにto_iを実行すると0になる
    
    @messages = group.messages.includes(:user).where("id > #{last_message_id}")
    

    # idで投稿済みのidよりも新しいidをwhere()で取得してきている
  end
end