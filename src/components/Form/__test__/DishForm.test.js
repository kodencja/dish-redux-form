import React, { useContext } from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import configureStore from "redux-mock-store";
import { Provider } from "react-redux";
import DishForm from "../DishForm";
import { DishContext } from "../../Main/Main";

const middlewares = [];
const mockStore = configureStore(middlewares);
// const DishContext = React.createContext();

describe("DishForm", () => {
  const store = mockStore({ form: {}, dishes: {} });
  const dishContext = useContext(DishContext);
  const { dishState, formRdx } = dishContext;

  it("Form to be in the document", () => {
    render(<DishForm />);
    const formElement = screen.getByRole("form");
    expect(formElement).toBeInTheDocument();
  });

  // it("should be able to type in input", () => {
  //   render(
  //     <Provider store={store}>
  //       <DishContext.Provider value={{dishState: dishState,
  //        formRdx: formRdx }}>
  //       <DishForm />
  //        </DishContext.Provider> 
  //     </Provider>
  //   );
  //   const inputElem = screen.getByPlaceholderText(/Write dish name/i);
  //   fireEvent.click(inputElem);
  //   fireEvent.change(inputElem, { target: { value: "zurek" } });
  //   expect(inputElem.value).toBe("zurek");
  // });
});
