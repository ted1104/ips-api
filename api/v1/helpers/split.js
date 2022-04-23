const splitid = (id) => {
  const ids = id.split("--")[0];
  const uuids = id.split("--")[1];

  return { ids, uuids };
};

module.exports = splitid;
