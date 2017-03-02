/**
 * Usage:
 *
 * ```
 * res.emailAddressInUse();
 * ```
 *
 */

module.exports = function loginInUse(){

  // Get access to `res`
  // (since the arguments are up to us)
  var res = this.res;

  return res.send(410, 'Login is already taken by another user.');
};
