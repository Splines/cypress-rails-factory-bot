Rails.application.routes.draw do

  # ⚠ Only allow these routes in test environment (!!!)
  if Rails.env.test?
    namespace :cypress do
      resources :factories, only: :create
      resources :database_cleaner, only: :create
      resources :user_creator, only: :create
    end
  end

  # your other routes
  # ...
end
