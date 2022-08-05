const mongoose= require('mongoose');

const userSchema= new mongoose.Schema(
    {
    id : {type: Number, required: true},
    first_name : {type: String, required: true},
    last_name : {type: String, requied: true},
    profile_pic: [{ type: String}]
    },
    {
        versionKey: false,
        timestamps: true
    }
);

const gallerySchema= new mongoose.Schema(
    {
        id : {type: Number, required: true},
        pictures : [{type: String}],
        user_id: { type: mongoose.Schema.Types.ObjectId, ref:"user"}
        },
        {
            versionKey: false,
            timestamps: true
        }
);

module.exports= mongoose.model("user", userSchema);