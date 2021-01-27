AFRAME.registerComponent("deselect-control", {
  init: function () {
    this.handleClick = () => {
      const onCameraSelectables = document.querySelectorAll(
        ".on-camera-selectable"
      );
      for (const selectable of onCameraSelectables) {
        // make all in scene selectables clickable again
        const inScene = document.getElementById(
          selectable.getAttribute("target")
        );
        inScene.classList.add("clickable");

        // use case for displaying in scene object and hiding
        // current ui
        if (selectable.getAttribute("visible")) {
          // hide the selected object
          selectable.setAttribute("visible", false);
          selectable.classList.remove("clickable");

          // hide the ui controls
          this.el.setAttribute("visible", false);
          this.el.classList.remove("clickable");

          // display the related environment object
          inScene.setAttribute("visible", true);
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
