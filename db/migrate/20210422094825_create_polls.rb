class CreatePolls < ActiveRecord::Migration[6.0]
  def change
    create_table :polls do |t|
      t.text :title, null: false
      t.integer :user_id, null: false

      t.timestamps
    end
    add_foreign_key :polls, :users, column: :user_id, on_delete: :cascade
  end
end
