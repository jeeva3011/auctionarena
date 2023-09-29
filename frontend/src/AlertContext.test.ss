import React from "react";
import { render, waitFor, fireEvent } from "@testing-library/react";
import AlertContextProvider, { Context as AlertContext } from "./Modules/User/Components/AlertContext";
import {MockedProvider} from '@apollo/client/testing'
import Alert from "./Modules/User/Components/Alert";

test("AlertContext sets and clears alert correctly", async () => {
    const { getByText, rerender } = render(
      <AlertContextProvider>
        <AlertContext.Consumer>
          {({ setAlert, visible }) => (
            <div>
              <button onClick={() => setAlert({ message: "Test Alert", status: "success" })}>Set Alert</button>
              <div id="alert-visible">{visible ? "Visible" : "Not Visible"}</div>
            </div>
          )}
        </AlertContext.Consumer>
      </AlertContextProvider>
    );
  
    const setAlertButton = getByText("Set Alert");
    const alertVisible = getByText("Not Visible");
  
    // Trigger alert
    fireEvent.click(setAlertButton);
  
    // Wait for the alert to become visible
    await waitFor(() => {
      expect(alertVisible.textContent).toBe("Visible");
    });
  
    // Wait for the alert to disappear
    await waitFor(() => {
      rerender(
        <AlertContextProvider>
          <AlertContext.Consumer>
            {({ visible }) => <div id="alert-visible">{visible ? "Visible" : "Not Visible"}</div>}
          </AlertContext.Consumer>
        </AlertContextProvider>
      );
  
      const alertNotVisible = getByText("Not Visible");
      expect(alertNotVisible.textContent).toBe("Not Visible");
    });
  });