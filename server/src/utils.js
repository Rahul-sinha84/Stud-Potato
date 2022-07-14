const Utils = {
  handleError: (res, err, status) => {
    console.log(err);
    return res.status(status).json({
      status: res.statusCode,
      message: err.message,
      data: {},
    });
  },
  handleSuccess: (res, msg, data, status) =>
    res.status(status).json({
      status: res.statusCode,
      message: msg,
      data: data,
    }),
};

export default Utils;
