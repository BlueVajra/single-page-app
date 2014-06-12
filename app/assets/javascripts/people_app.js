window.PeopleApp = {
  initialize: function () {

    $.getJSON("/api/people", this.renderPeople.bind(this));
    $(document).on("submit", '.create-form', this.createPerson.bind(this));
    $(document).on("click", ".edit", this.renderEditForm.bind(this));
    $(document).on("submit", '.edit-form', this.editPerson.bind(this));
    $(document).on("click", "a:contains('cancel')", this.cancelEditPerson.bind(this));
    $(document).on("click", "a:contains('delete')", this.deletePerson.bind(this));

  },

  renderPeople: function(data){
    html = JST['templates/people']({people: data._embedded.people});
    $("main .container div[data-container='people']").append(html);
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
    $(".create-form").get(0).reset();
  },

  renderEditForm: function(event){
    var $personToEdit = $(event.currentTarget).closest('.person');
    html = JST['templates/edit_form']({person: $personToEdit.data("person")});

    $personToEdit.append(html);
    $personToEdit.find('.person_information').hide();
    event.preventDefault();
  },

  cancelEditPerson: function(event){
    var $personToEdit = $(event.currentTarget).closest('.person');
    $personToEdit.find('.person_information').show();
    $personToEdit.find('.person-edit').remove();
    event.preventDefault();
  },

  deletePerson: function(event){
    var $personToEdit = $(event.currentTarget).closest('.person');
    var thisPath = $personToEdit.data("person")._links.self.href;

    $.ajax({
      type: "DELETE",
      url: thisPath,
      data: {},
      success: function(){$personToEdit.remove();}
    });

    event.preventDefault();
  },

  editPerson: function(event){
    var $personToEdit = $(event.currentTarget).closest('.person');
    var person = {
      "first_name": $personToEdit.find('input.first_name').val(),
      "last_name": $personToEdit.find('input.last_name').val(),
      "address": $personToEdit.find('textarea.address').val()
    }

    var thisPath = $personToEdit.data("person")._links.self.href;

    $.ajax({
      type: "PUT",
      url: thisPath,
      data: JSON.stringify(person, ["first_name", "last_name", "address"]),
      success: function(response){PeopleApp.updatePerson(response, $personToEdit)},
      dataType: 'json'
    });

    event.preventDefault();
  },

  updatePerson: function(response, $personToEdit){
    html = JST['templates/person']({person: response});
    $personToEdit.before(html);
    $personToEdit.remove();
  }
}

