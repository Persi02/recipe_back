db = connect("mongodb://127.0.0.1:27017/recipe");

db.users.insetOne({
  username: "ihasina",
  email: "hasina@gmail.com",
  password: "wert"
});