import mongoose from "mongoose";

const DatasetShema = mongoose.Schema({
  x: {
    type: Number,
    required: true,
  },
  y: {
    type: Number,
    required: true,
  },
  coordinate: {
    type: String,
    required: true,
  },
});

const Dataset = mongoose.model("Dataset", DatasetShema);
export default Dataset;
