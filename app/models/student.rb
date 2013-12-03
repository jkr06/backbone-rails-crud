class Student < ActiveRecord::Base
  attr_accessible :address, :age, :doj, :email, :firstname, :lastname
  validates :firstname, :lastname, :email, :doj, :age, presence: true
end
