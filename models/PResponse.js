class PResponse {
    constructor({ data, errors = {}, message = '' }) {
      this.data = data;
      this.errors = errors;
      this.message = message;
    }
  }
  
  module.exports = PResponse;