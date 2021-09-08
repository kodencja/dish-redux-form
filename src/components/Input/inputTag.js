export const createInputTag =
  (renderTag) =>
  ({ input, label, meta, ...custom }) => {
    const { touched, error, valid } = meta;
    return (
      <div
      className={[
        "input-block",
        error && touched ? "error" : "",
        valid && touched ? "valid" : "",
      ].join(" ")}
      >
        <label htmlFor={input.name}>{label}</label>
        {renderTag(input, meta, custom)}
        {touched && error && error !== undefined && (
          <span className="invalid-feedback">{error}</span>
        )}
      </div>
    );
  };