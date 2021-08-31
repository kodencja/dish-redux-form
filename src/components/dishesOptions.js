
const dishesOpt = ["default", "pizza", "soup", "sandwich"];

export   const options = dishesOpt.map((name, ind) => {
    if (name === "default") {
      return (
        <option defaultValue hidden label=" " key={ind}>
          Select an option
        </option>
      );
    } else {
      return (
        <option value={name} key={ind}>
          {name}
        </option>
      );
    }
  });