function validateName(name: string) {
  return true;
}

function validateUsername(username: string) {
  return true;
}

function validatePassword(password: string) {
  return true;
}

function signIn(username: string, password: string) {
  if (!(validateUsername(username) && validatePassword(password))) {
    return false;
  }
  console.log(`Signing in with ${username}: ${password}`);
  return true;
}

function signUp(name: string, username: string, password: string) {
  if (!(validateName(name) && validateUsername(username) && validatePassword(password))) {
    return false;
  }
  console.log(`Signing up with ${username}: ${password}`);
  return true;
}

export default { signIn, signUp };
