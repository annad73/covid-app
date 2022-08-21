import axios from "axios";
export default async function handler(req, res) {
  if (req.method === "GET") {
    const options = {
      method: "GET",
      url: `https://api.covidactnow.org/v2/state/${req.query.locState}.json?apiKey=b7f1040d7cfa4cb6b07b76f4ea65ab6b`,
    };
    axios
      .request(options)
      .then(function (response) {
        res.status(200).json(response.data);
      })
      .catch(function (error) {
        console.error(error);
      });
  } else {
    res.status(400);
  }
}
