# README

This README would normally document whatever steps are necessary to get the
application up and running.

Things you may want to cover:

* Ruby version

* System dependencies

* Configuration

* Database creation

* Database initialization

* How to run the test suite

* Services (job queues, cache servers, search engines, etc.)

* Deployment instructions

* ...

#chat-space DB設計
## usersテーブル
ALTER TABLE users ADD INDEX (name);
|Column|Type|Options|key|
|------|----|-------|
|name|string|null: false|   |
|password|string|null: false|   |
|email|string|null: false|MUL|
### Association
- has_many :user_groups
- has_many :messages
- has_many :groups , through: :user_groups

##groupsテーブル
|Column|Type|Options|
|------|----|-------|
|name|string|null: false|
### Association
- has_many :uses_groups
- has_many :masseges
- has_many :users , through: :user_groups

##messagesテーブル
|Column|Type|Options|
|------|----|-------|
|text|string|
|image|string|
|user_id|integer|null: false, foreign_key: true|
|group_id|integer|null: false, foreign_key: true|
- belongs_to :user
- belongs_to :group

##user_groupsテーブル
|Column|Type|Options|
|------|----|-------|
|user_id|integer|null: false, foreign_key: true|
|group_id|integer|null: false, foreign_key: true|
### Association
- belongs_to :user
- belongs_to :group