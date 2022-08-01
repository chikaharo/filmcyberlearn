import Axios from "axios";
import { DOMAIN } from "../utils/settings/config";

export default class BaseServices {
  put = (url, model) => {
    return Axios({
      url: `${DOMAIN}/${url}`,
      method: "PUT",
      data: model,
      headers: {
        Authorization: "Bearer " + JSON.parse(localStorage.getItem("TOKEN")),
      },
    });
  };
  post = (url, model) => {
    // console.log("MODEL: ", model);

    return Axios({
      url: `${DOMAIN}/${url}`,
      method: "POST",
      data: model,
      headers: {
        Authorization: "Bearer " + JSON.parse(localStorage.getItem("TOKEN")),
      },
    });
  };
  get = (url) => {
    return Axios({
      url: `${DOMAIN}/${url}`,
      method: "GET",
      headers: {
        Authorization: "Bearer " + JSON.parse(localStorage.getItem("TOKEN")),
      },
    });
  };

  delete = (url, query) => {
    return Axios({
      url: `${DOMAIN}/${url}/${query}`,
      method: "DELETE",
      headers: {
        Authorization: "Bearer " + JSON.parse(localStorage.getItem("TOKEN")),
      },
    });
  };
}
