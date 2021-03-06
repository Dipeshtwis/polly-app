class Poll < ApplicationRecord
  belongs_to :user
  has_many :options, dependent: :destroy
  has_many :votes, dependent: :destroy
  accepts_nested_attributes_for :options, :reject_if => :all_blank
  validates :title, presence: true, length: { maximum: 150 }
end
