class Project < ApplicationRecord
    has_many :project_tools, dependent: :destroy
    has_many :tools, through: :project_tools
end
