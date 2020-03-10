class MessagesController < ApplicationController
  before_action :set_group
    
  def index
    # def set_groupで@groupを取得しているので、messages.html.hamlで@groupを使える
    @message = Message.new
    @messages = @group.messages.includes(:user)
  end

  def create
    
    @message = @group.messages.new(message_params)
    if @message.save
      respond_to do |format|
        format.html { redirect_to group_messages_path(@group), notice: "メッセージを送信しました" }
        format.json
      end

    else
      # 保存できなかった場合の処理が記載されている
      @messages = @group.messages.includes(:user)
      flash.now[:alert] = 'メッセージを入力してください。'
      # flash.nowはリダイレクトをしない場合に使用する。
      # renderを使ってもう一度indexのビューに飛ばしている

      render :index
     end  
     
  end

  private

  def message_params
    params.require(:message).permit(:content, :image,).merge(user_id: current_user.id)
  end

  def set_group
    @group = Group.find(params[:group_id])
    # ここで送られてくるパスからどのグループのメッセージを受け取るかを指定できる。
  end
  
end