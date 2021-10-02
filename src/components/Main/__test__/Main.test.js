import { render, screen } from "@testing-library/react";
import configureStore from "redux-mock-store";
import { Provider } from "react-redux";
import Main from "../Main";

const middlewares = [];
const mockStore = configureStore(middlewares);

describe("Main", () => {
  const store = mockStore({});

  test("should have heading main title", () => {
    render(
      <Provider store={store}>
        <Main />
      </Provider>
    );
    const headingElement = screen.getByText(/Let's have a delicious meal!/i);
    expect(headingElement).toBeInTheDocument();
  });
});
