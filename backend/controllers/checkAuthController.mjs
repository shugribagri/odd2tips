const checkAuth = (req, res) => {
  res.json({
    token: req.cookies.token,
    isAuthenticated: true,
    user: req.user,
  });
};

export default {
  checkAuth,
};
