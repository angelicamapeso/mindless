AFRAME.registerComponent("env-modifier", {
  schema: {
    // id of environment that this will change
    envId: { type: "string", default: "" },
  },

  // Runs when object created
  init: function () {
    this.envEl = document.getElementById(this.data.envId);
    this.handleClick = () => {
      console.log(this.envEl);
      this.envEl.setAttribute("environment", {
        preset: "egypt",
      });
    };
  },

  // Runs after init and if object changes properties
  update: function () {
    const el = this.el;
    el.addEventListener("click", this.handleClick);
  },

  // Handle component removal
  remove: function () {
    const el = this.el;
    el.removeEventListener("click", this.handleClick);
  },
});
