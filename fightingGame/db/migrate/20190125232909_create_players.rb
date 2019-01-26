class CreatePlayers < ActiveRecord::Migration[5.1]
  def change
    create_table :players do |t|
      t.string :name
      t.string :email
      t.string :score
      t.string :phonetype
      t.string :ip
      t.string :winner_status

      t.timestamps
    end
  end
end
