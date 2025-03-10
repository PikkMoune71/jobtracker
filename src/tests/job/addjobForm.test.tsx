import React from "react";
import { render, screen, fireEvent, act } from "@testing-library/react";
import "@testing-library/jest-dom";
import { Provider } from "react-redux";
import configureStore from "redux-mock-store";
import AddJobForm from "@/components/AddJobForm";
import { addJobToDatabase } from "@/store/actions/jobActions";
import { I18nProviderClient } from "@/locales/client";

// Mock fetchStatus function for testing
jest.mock("@/utils/fetchStatus", () => ({
  fetchStatus: jest.fn().mockResolvedValue([
    { id: "1", name: "Application Sent" },
    { id: "2", name: "Interview Scheduled" },
  ]),
}));

jest.mock("@/store/actions/jobActions", () => ({
  addJobToDatabase: jest.fn(),
}));

const mockStore = configureStore([]);

describe("AddJobForm", () => {
  let store: ReturnType<typeof mockStore>;

  beforeEach(() => {
    store = mockStore({});
    store.dispatch = jest.fn();
  });

  it("should dispatch addJobToDatabase when form is submitted", async () => {
    await act(async () => {
      render(
        <I18nProviderClient locale="en">
          <Provider store={store}>
            <AddJobForm />
          </Provider>
        </I18nProviderClient>
      );
    });

    fireEvent.change(screen.getByLabelText(/Title/i), {
      target: { value: "Développeur Front-End" },
    });
    fireEvent.change(screen.getByLabelText(/Company/i), {
      target: { value: "Tech Corp" },
    });
    fireEvent.change(screen.getByLabelText(/Type/i), {
      target: { value: "Full-time" },
    });
    fireEvent.change(screen.getByLabelText(/Location/i), {
      target: { value: "Paris" },
    });
    fireEvent.change(screen.getByLabelText(/Description/i), {
      target: { value: "Great job opportunity" },
    });
    fireEvent.change(screen.getByLabelText(/Contact Email/i), {
      target: { value: "hr@techcorp.com" },
    });
    fireEvent.change(screen.getByLabelText(/Salary/i), {
      target: { value: "60000" },
    });

    // Simulate selecting an option from the status dropdown
    fireEvent.click(screen.getByRole("combobox"));
    fireEvent.click(screen.getByRole("option", { name: "Application Sent" }));

    // Simulate form submission
    fireEvent.click(screen.getByText(/Add Job/i));

    expect(store.dispatch).toHaveBeenCalledTimes(1);
    expect(addJobToDatabase).toHaveBeenCalledWith(
      expect.objectContaining({
        title: "Développeur Front-End", // Au lieu de "Software Engineer"
        company: "Tech Corp",
        type: "Full-time",
        location: "Paris",
        description: "Great job opportunity",
        contactEmail: "hr@techcorp.com",
        salary: "60000",
        status: expect.any(Object),
      })
    );
  });
});
