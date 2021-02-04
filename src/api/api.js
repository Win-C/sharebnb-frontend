import axios from "axios";

const BASE_URL = process.env.REACT_APP_BASE_URL || "http://localhost:5000";

/** API Class.
 *
 * Static class tying together methods used to get/send to to the API.
 * There shouldn't be any frontend-specific stuff here, and there shouldn't
 * be any API-aware stuff elsewhere in the frontend.
 *
 */

class ShareBnBApi {
  // the token for interactive with the API will be stored here.
  static token;

  static async request(endpoint, data = {}, method = "get", isFile = false ) {
    console.debug("API Call:", endpoint, data, method);

    const headerType = isFile ? "multipart/form-data" : "application/json"

    const url = `${BASE_URL}/${endpoint}`;
    const headers = { 
      Authorization: `Bearer ${ShareBnBApi.token}`,
      "Content-Type": headerType,
     };
    const params = (method === "get")
        ? data
        : {};

    try {
      return (await axios({ url, method, data, params, headers })).data;
    } catch (err) {
      console.error("API Error:", err.response);
      // let message = err.response.data.error.message;
      // throw Array.isArray(message) ? message : [message];
      throw ["Cannot signup"]
    }
  }

  // User API routes

  /** Signup the current user. */
  static async signupUser(inputs) {
    let res = await this.request("signup", inputs, "POST", true);
    return res.token;
  }

  /** Login the current user. */
  
  static async loginUser(inputs) {
    let res = await this.request("login", inputs, "POST");
    return res.token;
  }
  
  /** Get the current user. */

  static async getCurrentUser(username) {
    let res = await this.request(`users/${username}`);
    return res.user;
  }
  
  /** Edit the current user. */
  
  static async editCurrentUser(username, inputs) {
    let res = await this.request(`users/${username}/edit`, inputs, "PATCH", true );
    return res.user;
  }
  
  // TODO: Messages endpoints
  // TODO: Listings endpoints
}


export default ShareBnBApi;

ShareBnBApi.token = "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpYXQiOjE2MTI0NzAzNzgsIm5iZiI6MTYxMjQ3MDM3OCwianRpIjoiNTY4ZjdmZjEtNWU5OS00MzlhLWI3NDEtNTcxYjVhYjJhN2VlIiwiZXhwIjoxNjEyNDcxMjc4LCJpZGVudGl0eSI6InRlc3QiLCJmcmVzaCI6ZmFsc2UsInR5cGUiOiJhY2Nlc3MiLCJ1c2VyX2NsYWltcyI6eyJ1c2VybmFtZSI6InRlc3QiLCJpc19hZG1pbiI6ZmFsc2V9fQ.cMlzxcvFj9yF_4122CaD1HeogHXNvyp3FnWSZRQmqbI";