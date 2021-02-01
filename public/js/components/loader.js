AFRAME.registerComponent("loader", {
  init: function () {
    setTimeout(() => {
      document.getElementById("loading").style.display = "none";
    }, 1000);
  },
});
