class User < ApplicationRecord
  has_secure_password
  
  has_many :polls, dependent: :destroy, foreign_key: :user_id
  has_many :votes, dependent: :destroy
  has_secure_token :authentication_token
  validates :first_name, presence: true,
                       length: { minimum: 2, maximum: 20 }
  VALID_EMAIL_REGEX = /\A[\w+\-.]+@[a-z\d\-.]+\.[a-z]+\z/i.freeze
  validates :email, presence: true, length: { maximum: 50 },
                    uniqueness: true,
                    format: { with: VALID_EMAIL_REGEX }
  validates :password, presence: true, confirmation: true, length: { minimum: 6, maximum: 25 }
  validates :password_confirmation, presence: true, on: :create

  private

  def to_lowercase
    email.downcase!
  end
end
