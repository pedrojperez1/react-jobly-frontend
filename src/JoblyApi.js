import axios from "axios";

const BASE_URL = process.env.REACT_APP_BASE_URL || "http://localhost:3001";

/** API Class.
 *
 * Static class tying together methods used to get/send to to the API.
 * There shouldn't be any frontend-specific stuff here, and there shouldn't
 * be any API-aware stuff elsewhere in the frontend.
 *
 */

class JoblyApi {
  // the token for interactive with the API will be stored here.
  static token;

  static async request(endpoint, data = {}, method = "get") {
    console.log("API Call:", endpoint, data, method);

    const url = `${BASE_URL}/${endpoint}`;
    const headers = { Authorization: `Bearer ${JoblyApi.token}` };
    const params = (method === "get")
        ? data
        : {};
    console.log(url, method, data, params, headers)
    try {
      return (await axios({ url, method, data, params, headers })).data;
    } catch (err) {
      console.error("API Error:", err.response);
      let message = err.response.data.error.message;
      throw Array.isArray(message) ? message : [message];
    }
  }

  // Individual API routes

  /** Get details on a company by handle. */

  static async getCompany(handle) {
    let res = await this.request(`companies/${handle}`);
    return res.company;
  }

  static async getCompanies() {
    let res = await this.request(`companies`);
    return res.companies;
  }

  static async getJobs() {
    let res = await this.request(`jobs`);
    return res.jobs;
  }

  static async getUser(username) {
    let res = await this.request(`users/${username}`)
    return res.user;
  }

  static async login(data) {
    let res = await this.request(`auth/token`, data, "post");
    return {
        username: data.username,
        token: res.token
    }
  }

  static async signUp(data) {
      let res = await this.request(`auth/register`, data, "post");
      return {
          username: data.username,
          token: res.token
      }
  }

  static async updateProfile(username, data) {
      let res = await this.request(`users/${username}`, data, "patch");
      return res.user;
  }

  static async applyToJob(username, jobId) {
      let res = await this.request(`users/${username}/jobs/${jobId}`, {}, "post");
      return res
  }
}

// for now, put token ("testuser" / "password" on class)
// JoblyApi.token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6InJleSIsImlzQWRtaW4iOmZhbHNlLCJpYXQiOjE2MDc2OTg0NjZ9.CBXx4M3ksft9_I5g-2CQ7OWe_mAHXJ93jhvo3C1O5Gk";

export default JoblyApi;