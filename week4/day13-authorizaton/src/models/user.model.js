const mongoose= require('mongoose');

const bcrypt= require('bcryptjs');

const userSchema= new mongoose.Schema(
    {
    email : {type: String, requied: true, unique: true},
    password: { type: String, requied: true},
    role:[{type:String}]
    },
    {
        versionKey: false,
        timestamps: true
    }
);


userSchema.pre("save", function (next) {
    if (!this.isModified("password")) return next();
  
    // secret , salt => sdkfhsdkfh , secret + sdkfhsdkfh => dskfgkcskdfgsdkfsdf
    // salt
    // hashing rounds =>
    var hash = bcrypt.hashSync(this.password, 8);
    this.password = hash;
    return next();
  });
  
  userSchema.methods.checkPassword = function (password) {
    return bcrypt.compareSync(password, this.password);
  };
  
  const User = mongoose.model("user", userSchema); // user => users  


module.exports= User;