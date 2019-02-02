Rails.application.routes.draw do
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
  # Game screen for laptop

  #Server websocket cable requests in-process
  mount ActionCable.server => '/cable'

  root 'welcome#index'

  resources :game, only: [:index, :new]
  # welcome page for mobile devices
  resources :welcome, only: [:index, :show]
  # controller pages for players
  resources :players, only: [:show, :create]

  resources :gamepads, only: [:show]

end
