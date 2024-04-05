import mongoose from "mongoose";

const SubUserBureauSchema = new mongoose.Schema(
  {
    userId: {
      type: String,
      required: true,
    },
    profilePhoto: {
      type: String,
      required: true,
    },
    firstName: {
      type: String,
      required: true,
    },
    lastName: {
      type: String,
      required: true,
    },
    about: {
      type: String,
      required: true,
    },
    gender: {
      type: String,
      required: true,
      enum: ["male", "female"],
    },
    dob: {
      type: String,
      required: true, //2024-03-25
    },
    phone: {
      type: String,
      required: true,
    },
    address: {
      type: String,
      required: true,
    },
    city: {
      type: String,
      required: true,
    },
    country: {
      type: String,
      required: true,
    },
    motherTounge: {
      type: String,
      required: true,
    },
    nationality: {
      type: String,
      required: true,
    },
    interest: {
      type: String,
      required: true,
      enum: ["male", "female"],
    },
    religon: {
      type: String,
      required: true,
    },
    caste: {
      type: String,
      required: true,
    },
    height: {
      type: Number,
      required: true,
    },
    weight: {
      type: String,
      required: true,
    },
    qulification: {
      type: String,
      required: true,
    },
    profession: {
      type: String,
      required: true,
    },
    income: {
      type: String,
      required: true,
    },
    birthPlace: {
      type: String,
      required: true,
    },
    complexion: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const SubUserJobSchema = new mongoose.Schema(
  {
    userId: {
      type: String,
      required: true,
    },
    about: {
      type: String,
      required: true,
    },
    gender: {
      type: String,
      required: true,
      enum: ["male", "female"],
    },
    dob: {
      type: String,
      required: true, //2024-03-25
    },
    phone: {
      type: String,
      required: true,
    },
    address: {
      type: String,
      required: true,
    },
    city: {
      type: String,
      required: true,
    },
    country: {
      type: String,
      required: true,
    },
    profilePhoto: {
      type: String,
      required: true,
    },
    companyName: {
      type: String,
    },
    companyWebsite: {
      type: String,
    },
    companySocialHandle: {
      type: String,
    },
    cnicNumber: {
      type: String,
      required: true,
    },
    skills: {
      type: Array,
      required: true,
    },
    workExperience: {
      type: String,
      required: true,
    },
    levelOfEducation: {
      type: String,
      required: true,
    },
    developerSocialHandle: {
      type: String,
      required: true,
    },
    developerCv: {
      type: String,
      required: true,
    },
    jobUserType: {
      type: String,
      required: true,
      enum: ["employer", "freelancer"],
    },
  },
  {
    timestamps: true,
  }
);

const SubUserFoodVendorSchema = new mongoose.Schema(
  {
    userId: {
      type: String,
      required: true,
    },
    about: {
      type: String,
      required: true,
    },
    gender: {
      type: String,
      required: true,
    },
    dob: {
      type: String,
      required: true,
    },
    phone: {
      type: String,
      required: true,
    },
    address: {
      type: String,
      required: true,
    },
    city: {
      type: String,
      required: true,
    },
    country: {
      type: String,
      required: true,
    },
    province: {
      type: String,
      required: true,
    },
    zip: {
      type: String,
      required: true,
    },
    profilePhoto: {
      type: String,
      required: true,
    },
    bannerPhoto: {
      type: String,
      required: true,
    },
    fbProfile: {
      type: String,
    },
    instaProfile: {
      type: String,
    },
    youtubeProfile: {
      type: String,
    },
    resturantName: {
      type: String,
      required: true,
    },
    resturantSocialHandle: {
      type: String,
    },
    resturantType: {
      type: String,
      required: true,
      enum: ["homeMade", "resturant"],
    },
    latitude: {
      type: String,
      required: true,
    },
    longitude: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

export const SubUserBureau = mongoose.model(
  "subuserBureau",
  SubUserBureauSchema
);
export const SubUserJob = mongoose.model("subuserJob", SubUserJobSchema);
export const SubUserFood = mongoose.model(
  " SubUserFood",
  SubUserFoodVendorSchema
);
