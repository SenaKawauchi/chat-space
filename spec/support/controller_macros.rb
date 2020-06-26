module ControllerMacros
  # ここで定義したものをmessages_controllerのメソッドとして使用している
    def login(user)
      @request.env["devise.mapping"] = Devise.mappings[:user]
      sign_in user
    end
  end