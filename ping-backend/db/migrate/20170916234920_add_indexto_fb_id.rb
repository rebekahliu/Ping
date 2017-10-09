class AddIndextoFbId < ActiveRecord::Migration[5.1]
  def change
    add_index :users, :facebook_id
    add_index :users, :session_token
    add_index :users, :location_id
  end
end
