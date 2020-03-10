class UsersController < ApplicationController

    def index
      return nil if params[:keyword] == ""
      # 空で検索をした際に全てのuser情報が表示されてしまうために、nilで弾くようにしている。
      @users = User.where(['name LIKE ?', "%#{params[:keyword]}%"]).where.not(id: current_user.id)
      # ここの記述はキーワードを取得しているから、whereで記述してあげる必要がある
      # .where.not(id: current_user.id)は自分自身が検索されないように事前にコントローラーで防ぐ
      respond_to do |format|
        format.html
        format.json
      end
    end

    def edit
    end
  
    def update
     
      if current_user.update(user_params)
        redirect_to root_path
      else
        render :edit
        
      end
    end
  
    private
  
    def user_params
      params.require(:user).permit(:name, :email)
    end
  end