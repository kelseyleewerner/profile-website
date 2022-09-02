$(window).on("load", () => {
  $("#contactMeForm").on("submit", (event) => {
    event.preventDefault();

    // TODO: will need to change url and update nginx
    // TODO: make sure i dont get cross origin console error
    let formData = {};
    formData[event.currentTarget[0].name] = event.currentTarget[0].value;
    formData[event.currentTarget[1].name] = event.currentTarget[1].value;
    formData[event.currentTarget[2].name] = event.currentTarget[2].value;
    formData = JSON.stringify(formData);

    $.post("http://localhost:8000/contact_form", formData);

    $("#contactMeForm").trigger("reset");
  });
});
