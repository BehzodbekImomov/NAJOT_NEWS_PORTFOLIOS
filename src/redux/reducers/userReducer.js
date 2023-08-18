const initialState = {
  users: [],
  loading: false,
  totalCategories: 0,
};

export const userReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case "USERS_LOADING":
      return { ...state, loading: true };
    case "GET_USERS":
      return {
        loading: false,
        users: payload.data.map((user) => ({
          ...user,
          key: user._id,
        })),
        totalUser: payload.pagination.total,
      };
  }
  return state;
};