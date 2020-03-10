Rails.application.routes.draw do
  devise_for :users
  root 'groups#index'
  resources :users, only: [:index,:edit, :update]
  resources :groups, only: [:new, :create, :edit, :update] do
    resources :messages, only: [:index, :create]
    namespace :api do
      resources :messages, only: :index, defaults: { format: 'json' }
      # defaults :{ format: 'json'}でjsonに飛ぶように設定している。
      # defaults: { format: 'json' }がなくても自動更新は一応発火できる
      # 理由はapi/messages_controllerに飛んでくるルーティングがjson形式でしか飛んでこないから
      # respond toはHTMLかJsonかを判断して返すものなのでこの場合は

    end
  end
end