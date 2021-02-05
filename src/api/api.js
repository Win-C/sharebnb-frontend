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
      let messages = err.response.data.errors;
      throw Array.isArray(messages) ? messages : [messages];
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

  // Listings API routes

  /** Get all listings. */
  static async getAllListings(searchParams) {
    let res = await this.request("listings", searchParams);
    return res.listings;
  }

  /** Get a single listing. */
  static async getListing(id) {
    let res = await this.request(`listings/${id}`);
    return res.listing;
  }
}

export default ShareBnBApi;
