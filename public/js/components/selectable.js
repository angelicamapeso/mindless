AFRAME.registerComponent("selectable", {
  schema: {
    target: { type: "string", default: "" },
  },

  init: function () {
    if (this.data.target) {
      this.targetEl = document.getElementById(this.data.target);
      this.handleClick = () => {
        this.targetEl.setAttribute("visible", true);
        this.targetEl.classList.add("clickable");
        this.el.classList.remove("clickable");
        this.el.setAttribute("visible", false);
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
