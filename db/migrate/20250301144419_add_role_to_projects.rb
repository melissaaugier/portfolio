class AddRoleToProjects < ActiveRecord::Migration[7.1]
  def change
    add_column :projects, :role, :string
    add_column :projects, :date, :string
  end
end
