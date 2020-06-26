require 'rails_helper'

describe MessagesController do
  #  letを利用してテスト中使用するインスタンスを定義
  #:groupや:userはfactoriesを利用している
  let(:group) { create(:group) }
  let(:user) { create(:user) }
  # これをすることによってgroupやuserといったローカル変数を扱いやすくしている

  describe '#index' do

    context 'ログインしている場合のテスト' do
      # beforeメソッドは各exampleの実行前に毎回行う処理
      before do
        login user
        # loginメソッドは、support/controllerでメソッド定義したもの
        get :index, params: { group_id: group.id }
        # { group_id: group.id }のバリューの方のgroupはfactoriesで作成されたgroupでそのidをgroup_idにセットしている
      end

      it '@messageが存在しているかのテスト' do
        expect(assigns(:message)).to be_a_new(Message)
        # (assigns(:message))の:messageはmessages_controller.rbの@message = Message.newのこと
        # be_a_newマッチャを利用することで、 対象が引数で指定したクラスのインスタンスかつ
        # 未保存のレコードであるかどうか確かめる
      end

      it '@groupが存在しているかのテスト' do
        expect(assigns(:group)).to eq group
      end

      it 'indexのviewが呼び出すことができるかのテスト' do
        expect(response).to render_template :index
      end
    end

    context 'ログインしていない場合のテスト' do
      before do
        # 「login user」この記述が存在しないためここではredirect_toでログイン画面に推移させる
        get :index, params: { group_id: group.id }
      end

      it 'ログインしていないのでredirect_toさせるテスト' do
        expect(response).to redirect_to(new_user_session_path)
      end
    end
  end

  describe '#create' do
    let(:params) { { group_id: group.id, user_id: user.id, message: attributes_for(:message) } }
    # ここでattributes_forを使用している理由は実際に送られてくるparamsの形式(ハッシュ)にしなければいけないから
    # letを使用してparamsという変数をここで定義している
    context 'ログインしている場合' do
      before do
        login user
        #beforeでuserをログイン状態にさせている
      end

      context '保存ができるかのテスト' do
        subject {
          post :create,
          # httpメソッドがpostでcreateアクションに推移させる記述
          params: params
          # letで作成したparamsをバリューにセット
        }
        # subjectを利用してexpectの引数を別枠で用意してコードを短くしている

        it 'メッセージが投稿できたかのテスト(１つmessageが追加されたかの確認)' do
          expect{ subject }.to change(Message, :count).by(1)
          # 60行目で定義したsubjectを利用している
        end

        it '投稿完了後に　group_messages_path　に推移できているかのテスト' do
          subject
          expect(response).to redirect_to(group_messages_path(group))
        end
      end

      context '保存ができないテスト' do
        let(:invalid_params) { { group_id: group.id, user_id: user.id, message: attributes_for(:message, content: nil, image: nil) } }

        subject {
          post :create,
          params: invalid_params
        }

        it 'メッセージが投稿できないのテスト(１つmessageが追加できない確認)' do
          expect{ subject }.not_to change(Message, :count)
        end

        it '投稿失敗時にindexアクションのビューを表示できるかのテスト' do
          subject
          expect(response).to render_template :index
        end
      end
    end

    context 'ログインしていない場合' do

      it 'new_user_session_pathに戻すテスト' do
        # ここにlogin　userがないのでuserはログインしていない状態にある
        post :create, params: params
        expect(response).to redirect_to(new_user_session_path)
      end
    end
  end





end