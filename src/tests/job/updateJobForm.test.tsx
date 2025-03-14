import React from "react";
import { render, screen, fireEvent, act } from "@testing-library/react";
import "@testing-library/jest-dom";
import { Provider } from "react-redux";
import configureStore from "redux-mock-store";
import { updateJobInDatabase } from "@/store/actions/jobActions";
import { I18nProviderClient } from "@/locales/client";
import UpdateJobForm from "@/components/UpdateJobForm";
import { Job } from "@/types/Job";

// Mock fetchStatus function for testing
jest.mock("@/utils/fetchStatus", () => ({
  fetchStatus: jest.fn().mockResolvedValue([
    { id: "1", name: "Application Sent" },
    { id: "2", name: "Interview Scheduled" },
  ]),
}));

jest.mock("@/store/actions/jobActions", () => ({
  updateJobInDatabase: jest.fn(),
}));

const mockStore = configureStore([]);

describe("UpdateJobForm", () => {
  let store: ReturnType<typeof mockStore>;

  beforeEach(() => {
    store = mockStore([]);
    store.dispatch = jest.fn();
  });

  it("should dispatch updateJobInDatabase when form is submitted", async () => {
    const job: Job = {
      id: "123",
      title: "Frontend Developer",
      company: "Tech Corp",
      location: "Remote",
      type: "Full-time",
      salary: "$100K",
      contactEmail: "hr@techcorp.com",
      description: "This is a job description.\nMore details here.",
      status: { id: "1", name: "Application Sent" },
    };
    await act(async () => {
      render(
        <I18nProviderClient locale="en">
          <Provider store={store}>
            <UpdateJobForm job={job} />
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

    const button = screen.getByTestId("update-job-button");
    expect(button).toHaveTextContent("Update Job");
    fireEvent.click(button);

    expect(store.dispatch).toHaveBeenCalledTimes(1);
    expect(updateJobInDatabase).toHaveBeenCalledWith(
      expect.objectContaining({
        title: "Développeur Front-End",
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
