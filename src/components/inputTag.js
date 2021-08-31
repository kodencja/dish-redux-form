export const createInputTag =
  (renderTag) =>
  ({ input, label, meta, ...custom }) => {
    const { touched, error } = meta;
    return (
      <div
        className={[
          "input-block",
          error && touched ? "error" : "",
          meta.active ? "active" : "",
        ].join(" ")}
      >
        <label htmlFor={input.name}>{label}</label>
        {renderTag(input, custom)}
        {touched && error && error !== undefined && (
          <span className="invalid-feedback">{error}</span>
        )}
      </div>
    );
  };