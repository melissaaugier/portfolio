class CreateProjectTools < ActiveRecord::Migration[7.1]
  def change
    create_table :project_tools do |t|
      t.references :project, null: false, foreign_key: true
      t.references :tool, null: false, foreign_key: true

      t.timestamps
    end
  end
end
