export const set_Output_Style = (inputVal, elTrg, unit, setOutputLeft) => {
  const styles = getComputedStyle(elTrg);
  const padding =
    parseFloat(styles.paddingLeft) + parseFloat(styles.paddingRight);

  const elWidth = elTrg.clientWidth;

  const parentEl = elTrg.parentElement;
  const parentWidth = parentEl.clientWidth;


  const widthDiff = parentWidth - elWidth;

  const bubbleWidth = parseFloat(
    getComputedStyle(document.documentElement).getPropertyValue(
      "--bubble-width"
    )
  );

  const thumbWidth = parseFloat(
    getComputedStyle(document.documentElement).getPropertyValue("--thumb-width")
  );
  const thumbBorderWidth = parseFloat(
    getComputedStyle(document.documentElement).getPropertyValue(
      "--thumb-border-width"
    )
  );
  const thumbMargLeft = 1;

  if (elTrg !== undefined && elTrg !== null) {
    let refObjMin = parseInt(elTrg.getAttribute("min"));
    let refObjMax = parseInt(elTrg.getAttribute("max"));

    const ratio =
      ((parseInt(inputVal) - refObjMin) * 100) / (refObjMax - refObjMin);
    // console.log(ratio);
    const leftDistance =
      ((padding / 2 +
        thumbMargLeft +
        thumbWidth / 2 -
        bubbleWidth / 2 +
        widthDiff / 2) *
        100) /
      parentWidth;

    const rightDistance =
      ((padding + widthDiff + (thumbWidth + thumbBorderWidth * 2)) * 100) /
      parentWidth;

    const changeableDistance = (rightDistance * ratio) / 100;

    // console.log("leftDistance: ", leftDistance);
    // console.log("rightDistance: ", rightDistance);
    // console.log("changeableDistance: ", changeableDistance);

    setOutputLeft(ratio + leftDistance - changeableDistance + unit);
    return false;
  }
};
