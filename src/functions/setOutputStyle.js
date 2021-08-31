export const set_Output_Style = 
  (inputVal, elTrg, unit, setOutputLeft) => {

    const styles = getComputedStyle(elTrg);
    const padding =
      parseFloat(styles.paddingLeft) + parseFloat(styles.paddingRight);

    const elWidth = elTrg.clientWidth;

    const bubbleWidth = parseFloat(
      getComputedStyle(document.documentElement).getPropertyValue(
        "--bubble-width"
      )
    );

    const thumbWidth = parseFloat(
      getComputedStyle(document.documentElement).getPropertyValue(
        "--thumb-width"
      )
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

      const leftDistance =
        ((padding / 2 +
          thumbMargLeft +
          (thumbWidth + thumbBorderWidth * 2) / 2 -
          bubbleWidth / 2) *
          100) /
        elWidth;

      const rightDistance =
        ((padding + (thumbWidth + thumbBorderWidth * 2)) * 100) / elWidth;

      const changeableDistance = (rightDistance * ratio) / 100;

      setOutputLeft( ratio + leftDistance - changeableDistance + unit);
      return false;
    }
  };