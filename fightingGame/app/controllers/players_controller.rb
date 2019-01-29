class PlayersController < ApplicationController

  def create
  user_agent = 'Mozilla/5.0 (Windows NT 6.2; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/30.0.1599.17 Safari/537.36'
  @player = Player.new(player_form_params)
  @player.ip = request.remote_ip
  client = DeviceDetector.new(user_agent)

  # puts "The country:      #{Geocoder.search('209.171.88.22').first.country}"
  # puts "The country:      #{Geocoder.search('209.171.88.22').first.city}"

    if @player.save
      #not sure about the url of controller
      redirect_to "/controller/:id"
    end

  end


  def show
  end

  private

  def player_form_params
    params.require(:player).permit(:name, :email,)
  end

end
