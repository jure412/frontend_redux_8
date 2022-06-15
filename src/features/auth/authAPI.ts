// // A mock function to mimic making an async request for data
// export function fetchCount(amount = 1) {

import axios from "axios";
import { config } from "../../config";

// Make a request for a user with a given ID
export const login = async (inputs: { email: string; password: string }) => {
  return await axios
    .post(`${config.api}/login`, inputs)
    .then((res) => {
      return res.data.token;
    })
    .catch((err) => {
      console.log({ err });
      return err;
    });
};

export const getMe = async (token: String) => {
  return await axios
    .post(
      `${config.api}/user/:id?`,
      {},
      {
        headers: {
          Authorization: `${token}`,
        },
      }
    )
    .then((res) => {
      console.log({ res });
      return res.data;
    })
    .catch((err) => {
      console.log({ err });
      return err;
    });
};
