
class PlayersChannel < ApplicationCable::Channel
  def subscribed
    stream_from 'players'
  end
end
