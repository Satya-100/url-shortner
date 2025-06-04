const { getUser } = require("../service/auth");

function checkForAuthentication(req, res, next) {
  // const authorizationHeaderValue = req.headers["authorization"];
  const tokenCookie = req.cookies?.token;
  if (!tokenCookie) {
    console.log("No authorization header found");
    return next();
  }

  const user = getUser(tokenCookie);

  req.user = user;
  return next();
}

function restrictTo(roles) {
  return function (req, res, next) {
    if (!req.user) return res.redirect("/login");

    if (!roles.includes(req.user.role)) return res.end("Unauthorized");

    return next();
  };
}

// async function restrictToLoggedInUsersOnly(req, res, next) {
//   console.log("restrictToLoggedInUsersOnly middleware called");
//   // const userUid = req.cookies?.uid;
//   const userUid = req.headers["authorization"];
//   // console.log(req.headers["Authorization"]);

//   if (!userUid) {
//     return res.redirect("/login");
//   }

//   const token = userUid.split("Bearer ")[1];

//   const user = getUser(token);
//   if (!user) {
//     return res.redirect("/login");
//   }

//   console.log("successfully authenticated user", user);

//   console.log("restrictToLoggedInUsersOnly middleware finished");

//   req.user = user;
//   next();
// }

// async function checkAuth(req, res, next) {
//   // const token = req.cookies?.uid;
//   const userUid = req.headers["authorization"];
//   const token = userUid.split("Bearer ")[1];
//   const user = getUser(token);
//   req.user = user;
//   next();
// }

module.exports = {
  // restrictToLoggedInUsersOnly,
  // checkAuth,
  checkForAuthentication,
  restrictTo,
};
