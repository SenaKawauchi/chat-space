class GroupsController < ApplicationController
  before_action :set_group, only: [:edit, :update]

    def index
    end
  
    def new
      @group = Group.new
      @group.users << current_user
    end

    def update
      if @group.update(group_params)
        redirect_to group_messages_path(@group), notice: 'グループを編集しました'
      else
        render :edit
      end
    end
  
    def create
      
      @group = Group.new(group_params)
      if @group.save
        redirect_to root_path, notice: 'グループを作成しました'
      else
        render :new
      end
    end
  
    private
    def group_params
      params.require(:group).permit(:name, { :user_ids => [] })
      # 更新ボタンを押した際に、飛んでくる情報を受け取る記述。
      # function addMember(userId)のhiddonから飛んでくる
    end

    def set_group
      @group = Group.find(params[:id])
    end
end

