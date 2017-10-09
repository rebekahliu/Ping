# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# Note that this schema.rb definition is the authoritative source for your
# database schema. If you need to create the application database on another
# system, you should be using db:schema:load, not running all the migrations
# from scratch. The latter is a flawed and unsustainable approach (the more migrations
# you'll amass, the slower it'll run and the greater likelihood for issues).
#
# It's strongly recommended that you check this file into your version control system.

ActiveRecord::Schema.define(version: 20170916234920) do

  create_table "friendships", force: :cascade do |t|
    t.integer "user_id"
    t.integer "friend_id"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  create_table "locations", force: :cascade do |t|
    t.string "name"
    t.decimal "latitude", precision: 15, scale: 10
    t.decimal "longitude", precision: 15, scale: 10
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["latitude", "longitude"], name: "index_locations_on_latitude_and_longitude"
    t.index ["latitude"], name: "index_locations_on_latitude"
    t.index ["longitude"], name: "index_locations_on_longitude"
  end

  create_table "users", force: :cascade do |t|
    t.string "facebook_id", null: false
    t.string "session_token", null: false
    t.integer "location_id"
    t.integer "visible_radius", default: 10, null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.string "name"
    t.string "pro_pic_url"
    t.index ["facebook_id"], name: "index_users_on_facebook_id"
    t.index ["location_id"], name: "index_users_on_location_id"
    t.index ["session_token"], name: "index_users_on_session_token"
  end

end
