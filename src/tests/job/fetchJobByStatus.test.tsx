import { StatusBoard } from "@/components/StatusBoard";
import { I18nProviderClient } from "@/locales/client";
import { fetchJobsByStatus } from "@/store/actions/jobActions";
import { act, render, screen } from "@testing-library/react";
import { Provider } from "react-redux";
import configureStore from "redux-mock-store";
import "@testing-library/jest-dom";

jest.mock("@/utils/fetchStatus", () => ({
  fetchStatus: jest.fn().mockResolvedValue([
    { id: "1", name: "Application Sent" },
    { id: "2", name: "Interview Scheduled" },
  ]),
}));
jest.mock("@/store/actions/jobActions", () => ({
  fetchJobsByStatus: jest.fn().mockResolvedValue([]),
}));
const mockStore = configureStore([]);

describe("Fetch Jobs depending the status", () => {
  let store: ReturnType<typeof mockStore>;

  beforeEach(() => {
    store = mockStore({
      jobs: {
        jobs: [
          {
            id: "1",
            title: "Software Engineer",
            company: "Tech Corp",
            type: "Full-time",
            location: "Paris",
            description: "Great job opportunity",
            contactEmail: "test@gmail.com",
            salary: "60000",
            status: { id: "1", name: "Application Sent" },
            statusId: "1",
          },
        ],
      },
    });

    store.dispatch = jest.fn();
  });

  it("should dispatch fetchJobs depending the status", async () => {
    const selectedStatus = { id: "1", name: "Application Sent" };

    const onUpdatedJobClickMock = jest.fn();

    await act(async () => {
      render(
        <I18nProviderClient locale="en">
          <Provider store={store}>
            <StatusBoard
              selectedStatus={selectedStatus}
              onUpdatedJobClick={onUpdatedJobClickMock}
            />
          </Provider>
        </I18nProviderClient>
      );
    });

    expect(store.dispatch).toHaveBeenCalledTimes(1);
    expect(fetchJobsByStatus).toHaveBeenCalledWith(selectedStatus.id);

    expect(screen.getByText(/Software Engineer/i)).toBeInTheDocument();
    expect(screen.getByText(/Tech Corp/i)).toBeInTheDocument();
    expect(screen.getByText(/Full-time/i)).toBeInTheDocument();
    expect(screen.getByText(/Paris/i)).toBeInTheDocument();
    expect(screen.getByText(/Great job opportunity/i)).toBeInTheDocument();
    expect(screen.getByText(/test@gmail.com/i)).toBeInTheDocument();
    expect(screen.getByText(/60000/i)).toBeInTheDocument();
    expect(screen.getByText(/Application Sent/i)).toBeInTheDocument();
  });
});
