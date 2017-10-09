json.extract! user, :name, :pro_pic_url

json.friends  do
  user.friends.each do |friend|
    json.set! friend.facebook_id do
      json.name friend.name
      json.pro_pic_url friend.pro_pic_url
    end
  end
end
