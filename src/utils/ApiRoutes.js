const ApiRoutes = {
  LOGIN: {
    path: "/login",
    authentication: false,
  },
  GETALL: {
    path: "/allData",
    authentication: true,
  },
  GetOne: {
    path: "/:id",
    authentication: true,
  },
  CREATE: {
    path: "/create",
    authentication: true,
  },
  UPDATEONE: {
    path:"/:id",
    authentication: true,
  },
  DELETEONE: {
    path:"/:id",
    authentication: true,
  },
};

export default ApiRoutes;
