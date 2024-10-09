import fs from "fs";
import path from "path";

const tokenFile = path.join(__dirname, "tokens.json");

const getToken = (userId) => {
  const tokens = JSON.parse(
    fs.readFileSync(tokenFile, { encoding: "utf-8" }) || "{}"
  );
  return tokens[userId];
};

const saveToken = (userId, token) => {
  const sessions = JSON.parse(
    fs.readFileSync(sessionsFile, { encoding: "utf-8" }) || "{}"
  );
  sessions[token] = userId;
  fs.writeFileSync(sessionsFile, JSON.stringify(sessions, null, 2));
};

const getUserIdByToken = (token) => {
  const sessions = JSON.parse(
    fs.readFileSync(sessionsFile, { encoding: "utf-8" }) || "{}"
  );
  return sessions[token];
};

export { getToken, saveToken, getUserIdByToken };
