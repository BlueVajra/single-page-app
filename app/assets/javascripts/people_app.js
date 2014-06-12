window.PeopleApp = {
  initialize: function () {

    $.getJSON("/api/people", this.renderPeople.bind(this));
    $('.create-form').on("submit", this.createPerson.bind(this));

  },

  renderPeople: function(data){
    html = JST['templates/people']({people: data._embedded.people});
    $("main .container div[data-container='people']").append(html);
    $('.edit').on("click", this.renderEditForm.bind(this));
  },

  createPerson: function(event){
    var $thisForm = $('.create-form');
    var person = {
      "first_name": $thisForm.find('input.first_name').val(),
      "last_name": $thisForm.find('input.last_name').val(),
      "address": $thisForm.find('textarea.address').val()
    }

    $.post("/api/people", JSON.stringify(person), function(response){
      PeopleApp.renderPerson(response);
    }, "json");

    event.preventDefault();
  },

  renderPerson: function(response){
    html = JST['templates/person']({person: response});
    $("main .container div[data-container='people']").append(html);
    $('.edit').on("click", this.renderEditForm.bind(this));

    $(".create-form").get(0).reset();

  },

  renderEditForm: function(event){
    var personToEdit = $(event.currentTarget).closest('.person');
    html = JST['templates/edit_form']({person: personToEdit.data("person")});

    personToEdit.before(html);
    personToEdit.hide();

    $('.edit-form').on("submit", personToEdit, this.editPerson.bind(this));
    event.preventDefault();
  },

  editPerson: function(event){
    var personToEdit = event.data;
    var $thisPerson = $(event.currentTarget).closest('.person');
    var person = {
      "first_name": $thisPerson.find('input.first_name').val(),
      "last_name": $thisPerson.find('input.last_name').val(),
      "address": $thisPerson.find('textarea.address').val()
    }

    var thisPath = $thisPerson.data("person")._links.self.href;

    $.ajax({
      type: "PUT",
      url: thisPath,
      data: JSON.stringify(person, ["first_name", "last_name", "address"]),
      success: function(response){PeopleApp.updatePerson(response, personToEdit, $thisPerson)},
      dataType: 'json'
    });

    event.preventDefault();
  },

  updatePerson: function(response, editedPerson, editedForm){
    html = JST['templates/person']({person: response});
    editedPerson.before(html);
    $('.edit').on("click", this.renderEditForm.bind(this));

    editedPerson.remove();
    editedForm.remove();
  }
}

