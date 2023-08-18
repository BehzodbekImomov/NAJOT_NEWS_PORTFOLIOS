import { request } from "../../server/request";

export const fetchUsers = () => {
  return async (dispatch) => {
    dispatch({ type: "USERS_LOADING" });
    let { data } = await request.get("user");
    dispatch({ type: "GET_USERS", payload: data });
  };
};


export const deleteUsersAction = (id) => {
  return async (dispatch) => {
    await request.delete(`user/${id}`);
    dispatch(fetchUsers());
  };
};