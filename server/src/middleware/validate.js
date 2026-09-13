/**
 * Minimal request validation helpers. Kept dependency-free and explicit
 * rather than pulling in a full schema library, since the surface area
 * of this API is small and well-defined.
 */

export function requireParams(paramNames = []) {
  return (req, res, next) => {
    for (const name of paramNames) {
      if (!req.params[name]) {
        return res.status(400).json({ success: false, message: `Missing required param: ${name}` });
      }
    }
    next();
  };
}

export function requireBody(fieldNames = []) {
  return (req, res, next) => {
    for (const name of fieldNames) {
      if (req.body[name] === undefined || req.body[name] === null || req.body[name] === "") {
        return res.status(400).json({ success: false, message: `Missing required field: ${name}` });
      }
    }
    next();
  };
}

export function isValidObjectIdString(id) {
  return /^[a-f\d]{24}$/i.test(id);
}
