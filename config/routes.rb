Rails.application.routes.draw do
  
  root 'messages#index'
  resources :users, only: [:edit, :update]
end