window.PeopleApp = {
  initialize: function () {

    $.getJSON("/api/people", function(data){
      PeopleApp.renderPeople(data)
    });

    $('.create-form').submit( function(event){
      PeopleApp.createPerson(event)
    });
  },

  renderPeople: function (data) {
    html = JST['templates/people']({people: data._embedded.people});
    $("main .container div[data-container='people']").append(html)
  },

  renderPerson: function(response){
    html = JST['templates/person']({person: response});
    $("main .container div[data-container='people']").append(html);
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

