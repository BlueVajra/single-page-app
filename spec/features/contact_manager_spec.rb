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

  scenario 'User adds a person', js: true do
    visit '/'
    fill_in 'First name', with: 'Joe'
    fill_in 'Last name', with: 'Schmoe'
    fill_in 'Address', with: '22 Pearl St'
    click_button 'Add Person'

    expect(page).to have_content 'Joe'
    expect(page).to have_content 'Schmoe'
    expect(page).to have_content '22 Pearl St'
  end

  scenario 'User edits a person', js: true do
    visit '/'
    page.find('div.person', :text => 'Joe').click_link('edit')
    expect(page).to have_content "15 Main St"
    fill_in 'Address', with: '22 Pearl St'
    click_button 'Update Person'
    expect(page).to have_content "22 Pearl St"

  end
end