# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)
puts "Seeding Data ..."

player1 = Player.create!({
  name: 'Rooney',
  email: 'wr@dc.com',
  score: 350,
  phonetype: "iphone 6",
  ip: "132.14.116.18",
  winner_status: true
})

player2 = Player.create!({
  name: 'Al Capone',
  email: 'Al@chicago.com',
  score: 2,
  phonetype: "iphone 5",
  ip: "192.24.146.92",
  winner_status: false
})

player3 = Player.create!({
  name: 'Naruto',
  email: 'Na@nn.com',
  score: 150,
  phonetype: "Sony Xperia XZ",
  ip: "164.18.106.37",
  winner_status: false
})

puts "Done!"