window.PeopleApp = {
  initialize: function () {

    $.getJSON("/api/people", this.renderPeople.bind(this));
    $('.create-form').on("submit", this.createPerson.bind(this));

  },

  renderPeople: function(data){
    html = JST['templates/people']({people: data._embedded.people});
    $("main .container div[data-container='people']").append(html);
    $('.edit').on("click", this.renderEditForm);
  },

  renderPerson: function(response){
    html = JST['templates/person']({person: response});
    $("main .container div[data-container='people']").append(html);
    $('.edit').on("click", this.renderEditForm);
  },

  renderEditForm: function(event){
    var person_to_edit = $(this).closest('.person');
    html = JST['templates/edit_form']({person: person_to_edit.data("person")});

    person_to_edit.before(html);
    person_to_edit.hide();


    event.preventDefault();
  },

  createPerson: function(event){
    var person = {
      "first_name": $('input.first_name').val(),
      "last_name": $('input.last_name').val(),
      "address": $('textarea.address').val()
    }

    $.post("/api/people", JSON.stringify(person), function(response){
      PeopleApp.renderPerson(response);
    }, "json");

    event.preventDefault();
  }
}

