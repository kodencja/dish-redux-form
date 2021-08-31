import axios from "axios";

export const sendToServer = (formData, url) => {
  return new Promise((resolve, reject) => {
    const options = {
      method: "POST",
      url: url,
      headers: { "Content-type": "application/json" },
      data: JSON.stringify(formData),
    };

    setTimeout(() => {
      axios(options)
        .then(
          (res) => {
            console.log(res.data);
            resolve(res.data);
          },
          (err) => {
            reject(err.message);
          }
        )
        .catch((err) => {
          console.log(err.message);
          reject(err.message);
        });
    }, 500);
  });
};