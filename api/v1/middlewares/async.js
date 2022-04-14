const asyncWrapper = (fn) => {
  return async (req, res, nex) => {
    try {
      await fn(req, res, next);
    } catch (error) {
      next(error);
    }
  };
};

module.exports = asyncWrapper;
