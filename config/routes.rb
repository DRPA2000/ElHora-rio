Rails.application.routes.draw do
  root 'home#index'
  # For details on the DSL available within this file, see https://guides.rubyonrails.org/routing.html
  get "home/data", to: "home#data", as: :data
  get "home/db_action", to: "home#db_action", as: :db_action
end
