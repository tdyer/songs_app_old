class CreateSongs < ActiveRecord::Migration
  def change
    create_table :songs do |t|
      t.string :name
      t.integer :duration
      t.integer :price

      t.timestamps
    end
  end
end
