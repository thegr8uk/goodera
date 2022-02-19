const env = process.env;

const config = {
  listPerPage: env.LIST_PER_PAGE || 10,
  token: '0b2033da-9165-11ec-b909-0242ac120002',
}

module.exports = config;