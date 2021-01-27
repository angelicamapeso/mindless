AFRAME.registerComponent("deselect-control", {
  init: function () {
    this.handleClick = () => {
      const onCameraSelectables = document.querySelectorAll(
        ".on-camera-selectable"
      );
      for (const selectable of onCameraSelectables) {
        if (selectable.getAttribute("visible")) {
          // hide the selected object
          selectable.setAttribute("visible", false);
          selectable.classList.remove("clickable");

          // hide the ui controls
          this.el.setAttribute("visible", false);
          this.el.classList.remove("clickable");

          // display the related environment object
          const toDisplay = document.getElementById(
            selectable.getAttribute("target")
          );
          toDisplay.setAttribute("visible", true);
          toDisplay.classList.add("clickable");

          break;
        }
      }
    };
  },

  update: function () {
    const el = this.el;
    el.addEventListener("click", this.handleClick);
  },

  remove: function () {
    const el = this.el;
    el.removeEventListener("click", this.handleClick);
  },
});
