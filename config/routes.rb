Rails.application.routes.draw do
  root 'queries#index'

  post 'add' => 'queries#create'
end
