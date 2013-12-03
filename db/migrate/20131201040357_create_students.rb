class CreateStudents < ActiveRecord::Migration
  def change
    create_table :students do |t|
      t.string :firstname
      t.string :lastname
      t.integer :age
      t.text :address
      t.string :email
      t.date :doj

      t.timestamps
    end
  end
end
