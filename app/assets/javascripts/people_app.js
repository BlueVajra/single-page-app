window.PeopleApp = {
  initialize: function () {

    $.getJSON("/api/people", function (data) {
      var people = []
      $(data._embedded.people).each(function (i) {
        people[i] = this
      });
      html = JST['templates/people']({people: people});
      $("main .container div[data-container='people']").append(html)

    });

  }
}

