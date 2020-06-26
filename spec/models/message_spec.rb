# require 'rails_helper'

# RSpec.describe Message, type: :model do
#   describe '#create' do
#     context '投稿が保存できるかのテスト' do
#       it 'テキストのみ投稿されている' do
#         expect(build(:message, image: nil)).to be_valid
#       end

#       it '画像のみが投稿されている' do
#         expect(build(:message, content: nil)).to be_valid
#       end

#       it 'テキストと画像どっちも投稿している' do
#         expect(build(:message)).to be_valid
#       end
#     end

#     context '投稿が保存できないテスト' do
#       it 'テキストと画像がどちらも存在していない' do
#         message = build(:message, content: nil, image: nil)
#         message.valid?
       
#         expect(message.errors[:content]).to include("を入力してください")
#       end

#       it 'group_idがない場合に保存されない' do
#         message = build(:message, group_id: nil)
#         message.valid?
        
#         expect(message.errors[:group]).to include("を入力してください")
#       end

#       it 'user_idがない場合に保存されない' do
#         message = build(:message, user_id: nil)
#         message.valid?
       
#         expect(message.errors[:user]).to include("を入力してください")
#       end
#     end
#   end
# end

require 'rails_helper'

RSpec.describe Message, type: :model do
  describe '#create' do
    context 'can save' do
      it 'is valid with content' do
        expect(build(:message, image: nil)).to be_valid
      end

      it 'is valid with image' do
        expect(build(:message, content: nil)).to be_valid
      end

      it 'is valid with content and image' do
        expect(build(:message)).to be_valid
      end
    end

    context 'can not save' do
      it 'is invalid without content and image' do
        message = build(:message, content: nil, image: nil)
        message.valid?
        binding.pry
        expect(message.errors[:content]).to include("を入力してください")
      end

      it 'is invalid without group_id' do
        message = build(:message, group_id: nil)
        message.valid?
        expect(message.errors[:group]).to include("を入力してください")
      end

      it 'is invaid without user_id' do
        message = build(:message, user_id: nil)
        message.valid?
        expect(message.errors[:user]).to include("を入力してください")
      end
    end
  end
end