module Cypress
  # Creates a user for use in Cypress tests.
  class UserCreatorController < Cypress::CypressController
    def create
      unless params[:role].is_a?(String)
        msg = "First argument must be a string indicating the user role."
        msg += " But we got: '#{params["0"]}'"
        raise(ArgumentError, msg)
      end

      role = params[:role]
      is_admin = (role == "admin")

      # This is specific to our codebase at MaMpf: https://github.com/MaMpf-HD/mampf
      # You might have a different way of creating users.
      user = User.create(name: "#{role} Cypress", email: "#{role}@mampf.cypress",
                         password: "cypress123", consents: true, admin: is_admin,
                         locale: I18n.default_locale)
      user.confirm

      render json: user.to_json, status: :created
    end
  end
end
