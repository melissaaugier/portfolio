# This file should ensure the existence of records required to run the application in every environment (production,
# development, test). The code here should be idempotent so that it can be executed at any point in every environment.
# The data can then be loaded with the bin/rails db:seed command (or created alongside the database with db:setup).
#
# Example:
#
#   ["Action", "Comedy", "Drama", "Horror"].each do |genre_name|
#     MovieGenre.find_or_create_by!(name: genre_name)
#   end

dataset = [
  { title: "Vertiflor", pseudo: "vertiflor", description: 'A website that showcases and catalogs luxury vinyl flooring.', date: "2025", role: "UX Designer<br>Wordpress Developper", tools: ['wordpress', 'php', 'figma'] },
  { title: "WeatherAI", pseudo: "weatherai", description: 'An AI-powered app for real-time weather updates.', date: "2024", role: "Fullstack Developper", tools: ['react', 'api chatgpt'] },
  { title: "Anah (French Ministry of Housing)", pseudo: "anah", description: 'A platform supporting housing environmental improvement', date: "2021 - 2023", role: "Fullstack Developper", tools: ['ruby on rails', 'hotwire', 'gitlab'] },
  { title: "Cultura", pseudo: "cultura", description: 'An app for self-service terminals selling second-hand books.', date: "2021", role: "UX Designer<br>Front-end Developper", tools: ['ruby on rails', 'webapp', 'gitlab'] }
]

dataset.each do |project_data|
  project = Project.find_or_create_by!(title: project_data[:title], pseudo: project_data[:pseudo], description: project_data[:description], date: project_data[:date], role: project_data[:role])

  tools = project_data[:tools].map do |tool_name|
    Tool.find_or_create_by!(name: tool_name)
  end

  project.tools << tools  # Assign tools AFTER project creation
end
