$(window).on("load", () => {
  emailjs.init("WOhLFa0iXMf6JoLra");
  $("#contactMeForm").on("submit", (event) => {
    event.preventDefault();

    emailjs.sendForm("default_service", "contact_form", "#contactMeForm");
  });
});
