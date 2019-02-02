class PlayersController < ApplicationController

  def create
  @player = Player.new(player_form_params)
  @player.ip = request.remote_ip


    if @player.save
      #not sure about the url of controller
      redirect_to "/gamepad/:id"
    end

  end


  def show
  end

  private

  def player_form_params
    params.require(:player).permit(:name, :email,)
  end

end
