export const authCfg = {
  jwt: {
    secret: process.env.AUTH_SECRET || "default",
    expiresIn: "3d",
  },
};
