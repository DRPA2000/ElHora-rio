class CreateEvents < ActiveRecord::Migration[6.1]
  def change
    create_table :events do |t|
      t.datetime :start_date
      t.datetime :end_date
      t.string :text

      t.timestamps
    end
  end
end
