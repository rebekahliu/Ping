class CreateUsers < ActiveRecord::Migration[5.1]
  def change
    create_table :users do |t|
      t.string :facebook_id, null: false
      t.string :session_token, null: false
      t.integer :location_id
      t.integer :visible_radius, null: false, :default => 10
      t.timestamps
    end
  end
end
