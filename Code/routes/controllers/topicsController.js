import * as topicsService from "../../services/topicsService.js";
import * as userService from "../../services/userService.js";
import { validasaur } from "../../deps.js";

const validationRules = {
  name: [validasaur.required, validasaur.minLength(1)]
};

const addTopic = async ({ request, response, user, render }) => {
  const body = request.body({ type: "form" });
  const params = await body.value;

  const data = {
    name: params.get("name")
  }

  const [passes, errors] = await validasaur.validate(
    data,
    validationRules,
  );

  if (!passes) {
    console.log(errors);
    data.validationErrors = errors;
    render("topics.eta", data );
  } else {
    if (await userService.isUserAdmin(user.id)) {
    await topicsService.addTopics(
      user.id,
      data.name
    );
    };
    response.redirect("/topics");
  }
};

const listTopics = async ({ render }) => {
  render("topics.eta", { topics: await topicsService.listTopics() });
};

const deleteTopic = async ({ params, response, user }) => {
  if (await userService.isUserAdmin(user.id)) {
  await topicsService.deleteTopic(params.id);
  };
  response.redirect("/topics");
};

export { addTopic, listTopics, deleteTopic };