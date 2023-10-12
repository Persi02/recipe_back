const User = require('./entity/User.entity');
const Privacy = require('./entity/Privacy.entity');
const Role = require('./entity/Role.entity');
const mongoose = require('mongoose')

async function createPrivacy() {
  try {
    console.log("Creating privacies...")
    const pubPrivacy = new Privacy({ label: "public" })
    const privatePrivacy = new Privacy({ label: "private" })

    const docPub = await pubPrivacy.save()
    const docPriv = await privatePrivacy.save()

    if(docPub && docPriv) {
      console.log("Private and public privacy are created successfully")
    } else {
      console.group("Something went wrong");
    }
  } catch(err) {
    console.log("Error encountered during creating privacies ", err.message);
  }
}

async function createRole() {
  try {
    console.log("Creating role...")
    const admin = new Role({ label: "ADMIN" })
    const user = new Role({ label: "USER" })

    const docAdmin = await admin.save()
    const docUser = await user.save()

    if(docAdmin && docUser) {
      console.log("Roles are created successfully")
    } else {
      console.group("Something went wrong");
    }
  } catch(err) {
    console.log("Error encountered during creating roles ", err.message);
  }
}

async function createUser() {
  try {
    console.log("Creating User...")
    const userToCreate = new User({
      username: "Mavo",
      email: "bema@gmail.com",
      password: "bonjour"
    })

    const doc = await userToCreate.save()

    if(doc) {
      console.log("user is created successfully")
    } else {
      console.group("Something went wrong");
    }
  } catch(err) {
    console.log("Error encountered during creating user ", err.message);
  }
}

mongoose.connect('mongodb://127.0.0.1:27017/recipe', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
.then(async() => {
  console.log("connected to mongo")
  await createRole()
  await createPrivacy()
  await createUser()
  process.exit()
})
.catch(e => console.log(e))