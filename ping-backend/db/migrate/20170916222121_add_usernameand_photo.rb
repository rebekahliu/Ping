class AddUsernameandPhoto < ActiveRecord::Migration[5.1]
  def change
    add_column :users, :name, :string
    add_column :users, :pro_pic_url, :string
  end
end
