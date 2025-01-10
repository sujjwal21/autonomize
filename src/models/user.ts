import mongoose, { Document, Schema } from 'mongoose';

export interface IUser extends Document {
  username: string;
  name?: string;
  location?: string;
  bio?: string;
  blog?: string;
  avatar_url?: string;
  public_repos?: number;
  public_gists?: number;
  followers?: number;
  following?: number;
  soft_deleted?: boolean;
}

const UserSchema: Schema = new Schema(
  {
    username: { type: String, required: true, unique: true },
    name: { type: String },
    location: { type: String },
    bio: { type: String },
    blog: { type: String },
    avatar_url: { type: String },
    public_repos: { type: Number },
    public_gists: { type: Number },
    followers: { type: Number },
    following: { type: Number },
    soft_deleted: { type: Boolean, default: false },
  },
  { timestamps: true }
);

export default mongoose.model<IUser>('User', UserSchema);
