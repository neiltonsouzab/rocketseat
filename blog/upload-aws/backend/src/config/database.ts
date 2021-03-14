import mongoose from 'mongoose';

mongoose.connect(
  String(process.env.MONGO_URL),
  {
    useNewUrlParser: true
  }
)