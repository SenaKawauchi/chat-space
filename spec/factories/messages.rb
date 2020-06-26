FactoryBot.define do
  factory :message do
    content {Faker::Lorem.sentence}
    image {File.open("#{Rails.root}/public/images/test_image.jpg")}
    # ここの.openはFakerとかとは関係のないメソッド
    user
    group
  end
end