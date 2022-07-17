const axios = require("axios");
const Country = require("../models/country");

const fetchRandomApiData = async () => {
  let response = await axios("https://randomuser.me/api");
  let data = response.data.results[0];
  let query = { name: data.location.country };
  const country = await Country.find(query);
  console.log(country);
  if (country.length === 0) {
    const countryData = new Country({
      name: data.location.country,
      users: [
        {
          name: `${data.name.title} ${data.name.first} ${data.name.last}`,
          gender: data.gender,
          email: data.email,
        },
      ],
    });
    await countryData.save();
  }
  else {
    country[0].users.push({
      name: `${data.name.title} ${data.name.first} ${data.name.last}`,
      gender: data.gender,
      email: data.email,
    });
    await Country.findByIdAndUpdate(country[0].id, { $set: {users: country[0].users } });
  }
};

const updateBatchData = async (req, res, next) => {
  try {
    await fetchRandomApiData();
    res.status(200).json({msg: "Batch Job Synchronized successfully"});
  } catch (e) {
    res.status(500).send(e);
  }
};

const getCountry = async (req, res) => {
  try {
    const countryList = await Country.find({});
    res.status(200).json({ countries: countryList });
  } catch (e) {
    res.status(500).send(e);
  }
};

module.exports = {
  fetchRandomApiData,
  updateBatchData,
  getCountry,
};
