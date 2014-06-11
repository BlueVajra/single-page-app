require 'rails_helper'

feature 'The one-page contact manager app' do
  before :each do
    Person.create!(first_name: "Joe", last_name: "Example", address: "15 Main St")
    Person.create!(first_name: "Edna", last_name: "Example", address: "15 Oak St")
  end

  scenario 'The homepage loads', js: true do
    visit '/'
    expect(page).to have_title("Contact Manager")
    expect(page).to have_content("Joe Example")
    expect(page).to have_content("Edna Example")
  end
end