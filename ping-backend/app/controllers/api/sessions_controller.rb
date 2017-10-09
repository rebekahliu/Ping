class Api::SessionsController < ApplicationController

# We create and look up users by fbId here
# If the user esists, we assign session token to log them in
# If they don't exist we create
  def create
    @user = current_user
    if @user
      @user.session_token = params[:session_token]
      @user.save!
      render "api/users/show"
    else
      make_user
    end
  end

# Session token here is the users's fb session token
# We use this to get their name, pro pic, and friends on creation
  def make_user
    @user = User.new({session_token: params[:session_token]})
    graph = Koala::Facebook::API.new(@user.session_token)
    id = graph.get_object("me")["id"]
    if id != params[:facebook_id]
      render json: ["Invalid session token"], status: 401
      return
    end
    @user.fill_user_data(graph)
    if @user.save
      @user.add_friends(graph)
      render "api/users/show"
    else
      render json: @user.errors.full_messages, status: 422
    end
  end


  def current_user
    return User.find_by(facebook_id: params[:facebook_id])
  end

  private

  # def user_params
  #   params.permit(:session_token, :facebook_id)
  # end

end
