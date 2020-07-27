const uniqid = require("uniqid");

module.exports = {
  formatErrorResponse: (code, message) => ({
    error: {
      code,
      message,
    },
  }),

  formatSuccessResponse: (data = [], { params, route }) => {
    const getEndpoints = () => {
      let self = route.path;
      Object.keys(params).forEach((p) => {
        self = self.replace(`:${p}`, params[p]);
      });

      return {
        self,
      };
    };

    return {
      data,
      endpoints: getEndpoints(),
    };
  },
};
