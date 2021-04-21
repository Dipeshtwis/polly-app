Rails.application.routes.draw do
  root "home#index"
  
  namespace :api do
    namespace :v1 do
      resources :users, only: %i[create]
    end
  end
  
  get '*path', to: 'home#index', via: :all
end
