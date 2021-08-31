export const appearInput = (inputDivRefCurr, btnRefCurr) => {
  const time = 2500,
    timeAdd = 700;

  if (inputDivRefCurr !== undefined && inputDivRefCurr !== null) {
    inputDivRefCurr.forEach((el) => {
      const classes = el.classList;

      const classesArr = Array.from(classes);
      let hideClassName = "";
      hideClassName = classesArr.filter((el) => el.startsWith("hide"));
      
      if (hideClassName.length > 0) {
        const classNameDirection = hideClassName[0].substr(
          hideClassName[0].indexOf("-")
        );

        let elName;

        // get the 'name' attribute of the input / select field
        elName = el.children[0].children[1].getAttribute("name");

        // remove 'hideClassName' if there is any and add 'show' class
        if (hideClassName !== "") {
          // console.log(hideClassName);
          if (
            elName !== "name" &&
            elName !== "preparation_time" &&
            elName !== "type"
          ) {
            setTimeout(() => {
              el.classList.add("show" + classNameDirection);
              el.classList.remove(hideClassName[0]);
            }, 100);
          } else {
            setTimeout(
              () => {
                el.classList.add("show" + classNameDirection);
                el.classList.remove(hideClassName[0]);
              },
              elName === "name"
                ? time
                : elName === "preparation_time"
                ? time + timeAdd
                : time + timeAdd * 2
            );
          }
        }
      }

      if (
        btnRefCurr !== undefined &&
        btnRefCurr !== null &&
        btnRefCurr.classList.contains("hide-down")
      ) {
        setTimeout(() => {
          btnRefCurr.classList.add("show-down");
          btnRefCurr.classList.remove("hide-down");
        }, time + timeAdd * 3);
      }
    });
  }
};
