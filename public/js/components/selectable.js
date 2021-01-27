AFRAME.registerComponent("selectable", {
  schema: {
    target: { type: "string", default: "" },
  },

  init: function () {
    if (this.data.target) {
      this.targetEl = document.getElementById(this.data.target);
      this.handleClick = () => {
        const ui = document.getElementById("close-button");
        ui.setAttribute("visible", true);
        ui.classList.add("clickable");
        this.targetEl.setAttribute("visible", true);
        this.targetEl.classList.add("clickable");
        this.el.setAttribute("visible", false);

        // make all other selectable objects unclickable when something selected
        const selectables = document.querySelectorAll(".selectable");
        for (const selectable of selectables) {
          selectable.classList.remove("clickable");
        }
      };
    } else {
      console.log("Missing target!", this.el);
    }
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
