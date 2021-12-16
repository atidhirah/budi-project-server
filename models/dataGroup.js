import mongoose from "mongoose";

const { Schema } = mongoose;
const DataGroupSchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  datasets: [
    {
      type: Schema.Types.ObjectId,
      ref: "Dataset",
    },
  ],
});

const DataGroup = mongoose.model("DataGroup", DataGroupSchema);
export default DataGroup;
