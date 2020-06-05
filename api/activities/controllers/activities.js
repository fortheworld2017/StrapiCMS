"use strict";

const { parseMultipartData, sanitizeEntity } = require("strapi-utils");

const Filter = require("bad-words");
const filter = new Filter();
module.exports = {
  discount: async (ctx) => {
    //    discount custom function
    let entities;
    if (
      ctx.request.body.discount &&
      ctx.request.body.discount > 0 &&
      ctx.request.body.discount < 100
    ) {
      entities = await strapi.services.activities.find(ctx.query);
      let allUpdates = [];
      entities.map((entity) => {
        allUpdates.push(
          strapi.services.activities.update(
            { id: entity.id },
            {
              Price: entity.Price * ((100 - ctx.request.body.discount) / 100),
            }
          )
        );
      });
      let data = await Promise.all(allUpdates);
      return ctx.send("Success.");
    } else {
      return ctx.throw(400, "There is no discount");
    }
  },

  async create(ctx) {
    //   when create new activity, send email to  info@mallorcard.es
    let entity;
    if (ctx.is("multipart")) {
      const { data, files } = parseMultipartData(ctx);
      entity = await strapi.services.activities.create(data, { files });
    } else {
      entity = await strapi.services.activities.create(ctx.request.body);
    }

    let entry = sanitizeEntity(entity, { model: strapi.models.activities });
    // email send when create new activity
    strapi.services.activities.send(
      "Welcome",
      "new activites created " + entry.id
    );
    return entry;
  },
};
