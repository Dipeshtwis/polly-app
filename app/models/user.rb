class User < ApplicationRecord
  has_secure_password
  
  before_save { self.email = email.downcase }
  validates :first_name, presence: true,
                       length: { minimum: 2, maximum: 20 }
  VALID_EMAIL_REGEX = /\A[\w+\-.]+@[a-z\d\-.]+\.[a-z]+\z/i.freeze
  validates :email, presence: true, length: { maximum: 50 },
                    uniqueness: true,
                    format: { with: VALID_EMAIL_REGEX }
  validates :password, presence: true, length: { minimum: 6, maximum: 25 }
end
