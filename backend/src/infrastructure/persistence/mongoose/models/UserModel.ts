import { Schema, model, type HydratedDocument, type Model, type Types } from 'mongoose';

export type UserDocument = HydratedDocument<{
  avatar?: string;
  bio?: string;
  createdAt: Date;
  email: string;
  followers: Types.ObjectId[];
  following: Types.ObjectId[];
  name: string;
  password: string;
  phoneNumber?: string;
  updatedAt: Date;
  username: string;
}>;

const userSchema = new Schema<UserDocument>(
  {
    avatar: {
      trim: true,
      type: String,
    },
    bio: {
      maxlength: 280,
      trim: true,
      type: String,
    },
    email: {
      index: true,
      lowercase: true,
      required: true,
      trim: true,
      type: String,
      unique: true,
    },
    followers: [
      {
        default: [],
        ref: 'User',
        type: Schema.Types.ObjectId,
      },
    ],
    following: [
      {
        default: [],
        ref: 'User',
        type: Schema.Types.ObjectId,
      },
    ],
    name: {
      required: true,
      trim: true,
      type: String,
    },
    password: {
      required: true,
      select: false,
      type: String,
    },
    phoneNumber: {
      trim: true,
      type: String,
    },
    username: {
      index: true,
      lowercase: true,
      required: true,
      trim: true,
      type: String,
      unique: true,
    },
  },
  {
    timestamps: true,
    versionKey: false,
  },
);

export const UserModel: Model<UserDocument> = model<UserDocument>('User', userSchema);