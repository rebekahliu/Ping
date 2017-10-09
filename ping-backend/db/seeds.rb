# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)

User.destroy_all
Location.destroy_all
Friendship.destroy_all
#
#Location
minna = Location.create!(name: "735 Minna", latitude: 37.776521, longitude: -122.413125)
app_academy = Location.create!(name: "431 Tehma", latitude: 37.780360, longitude: -122.405042)
google = Location.create!(name: "1600 Ampitheater Parkway", latitude: 37.421655, longitude: -122.085637)
#
# #User
# sachith = User.create!(facebook_id: "1", session_token: "abc", location_id: google.id, visible_radius: 15)
# kevin = User.create!(facebook_id: "2", session_token: "def", location_id: minna.id, visible_radius: 15)
# tommy = User.create!(facebook_id: "3", session_token: "ghi", location_id: app_academy.id, visible_radius: 15)
#
#
# #Friendship
# sachithlikestommy = Friendship.create!(user_id: sachith.id, friend_id: tommy.id)
# tommylikessachith = Friendship.create!(user_id: tommy.id, friend_id: sachith.id)
# kevinlikestommy = Friendship.create!(user_id: kevin.id, friend_id: tommy.id)
# tommylikeskevin = Friendship.create!(user_id: tommy.id, friend_id: kevin.id)
