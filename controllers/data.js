import DataGroup from "../models/dataGroup.js";
import Dataset from "../models/dataset.js";
import User from "../models/user.js";

export const createDataGroup = async (req, res) => {
  const { username, name } = req.body;

  try {
    const user = await User.findOne({ username }).populate("dataGroups");

    for (let d of user.dataGroups) {
      if (d.name === name)
        return res.json({
          error: "User already have data group with the same name.",
        });
    }

    const newDataGroup = await DataGroup.create({ name });
    user.dataGroups.push(newDataGroup);

    const updatedUser = await user.save();
    res.json(updatedUser);
  } catch (error) {
    console.log(error);
    res.json({ error: "Server Error" });
  }
};

export const createDataset = async (req, res) => {
  const { dataGroupId, x, y, coordinate } = req.body;

  try {
    const dataGroup = await DataGroup.findById(dataGroupId);
    const newDataset = await Dataset.create({ x, y, coordinate });

    dataGroup.datasets.push(newDataset);
    const updatedDataGroup = dataGroup.save();
    res.json(updatedDataGroup);
  } catch (error) {
    console.log(error);
    res.json({ error: "Server Error" });
  }
};
