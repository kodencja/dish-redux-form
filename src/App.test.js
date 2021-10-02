import { render, screen } from '@testing-library/react';
import App from './App';

describe("App", ()=>{
  it('App to be in the document', () => {
    render(<App />);
    const AppElement = screen.getByTestId("App");
    expect(AppElement).toBeInTheDocument();
  });

  it('should App comp. has class App', () => {
    render(<App />);
    const AppElement = screen.getByTestId("App");
    expect(AppElement).toHaveClass("App");
  });

})
