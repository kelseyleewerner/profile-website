window.addEventListener("load", () => {
  $("#primaryProfileImage").on("click", () => {
    profile_img = $("#primaryProfileImage");

    if (profile_img.attr("src") === "images/profile_picture1.JPG") {
      profile_img.attr("src", "images/profile_picture2.JPG");
    } else {
      profile_img.attr("src", "images/profile_picture1.JPG");
    }
  });
});
