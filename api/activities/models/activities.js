"use strict";

/**
 * Read the documentation (https://strapi.io/documentation/v3.x/concepts/models.html#life-cycle-callbacks)
 * to customize this model
 */

module.exports = {
  lifecycles: {
    beforeCreate(data) {},
    afterCreated(result) {
      console.log("created", result);
      strapi.services.activities.send(
        "welcome@mysite.com",
        result.id,
        "Welcome",
        "new activites created" + result.id
      );
    },
  },
};
