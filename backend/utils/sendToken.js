// Create token and save in the cookie

export default (user, statusCode, res) => {
  //Create JWT token
  const token = user.getJwtToken();

  //options for cookies
  const options = {
    expires: new Date(
      Date.now() + process.env.COOKIE_EXPIRES_TIME * 24 * 60 * 60 * 1000
    ),
    httpOnly: true,
    sameSite: process.env.NODE_ENV === "PRODUCTION" ? "none" : "lax",
    secure: process.env.NODE_ENV === "PRODUCTION",
  };
  res.status(statusCode).cookie("token", token, options).json({
    token,
  });
};
