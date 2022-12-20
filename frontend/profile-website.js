$(window).on("load", () => {
  $("#contactMeForm").on("submit", (event) => {
    event.preventDefault();

    let formData = {};
    formData[event.currentTarget[0].name] = event.currentTarget[0].value;
    formData[event.currentTarget[1].name] = event.currentTarget[1].value;
    formData[event.currentTarget[2].name] = event.currentTarget[2].value;
    formData = JSON.stringify(formData);

    $.post("/contact_form", formData);

    $("#contactMeForm").trigger("reset");
  });

  $("#primaryProfileImage").on("click", () => {
    profile_img = $("#primaryProfileImage");

    if (profile_img.attr("src") === "images/profile_picture1.JPG") {
      profile_img.attr("src", "images/profile_picture2.JPG");
    } else {
      profile_img.attr("src", "images/profile_picture1.JPG");
    }
  });
});
