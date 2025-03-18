import { render, screen, act } from "@testing-library/react";
import "@testing-library/jest-dom";
import { Provider } from "react-redux";
import configureStore from "redux-mock-store";
import { I18nProviderClient } from "@/locales/client";
import { MoreActionsJob } from "@/components/MoreActionsJob";
import { Job } from "@/types/Job";
import { Status } from "@/types/Status";
import userEvent from "@testing-library/user-event";
import { deleteJobToDatabase } from "@/store/actions/jobActions";

jest.mock("@/store/actions/jobActions", () => ({
  deleteJobToDatabase: jest.fn(),
}));

const mockStore = configureStore([]);

describe("DeleteJob", () => {
  let store: ReturnType<typeof mockStore>;

  beforeEach(() => {
    store = mockStore({});
    store.dispatch = jest.fn();
    Object.defineProperty(window, "matchMedia", {
      writable: true,
      value: jest.fn().mockImplementation((query) => ({
        matches: false,
        media: query,
        onchange: null,
        addEventListener: jest.fn(),
        removeEventListener: jest.fn(),
        dispatchEvent: jest.fn(),
      })),
    });
  });

  it("should dispatch deleteJobToDatabase when click on button", async () => {
    const selectedStatus: Status = {
      id: "1",
      name: "Application Sent",
      color: "blue",
    };

    const onStatusChangeMock = jest.fn();

    const job: Job = {
      id: "123",
      title: "Frontend Developer",
      company: "Tech Corp",
      location: "Remote",
      type: "Full-time",
      salary: "$100K",
      contactEmail: "hr@techcorp.com",
      description: "This is a job description.\nMore details here.",
      status: selectedStatus,
    };
    await act(async () => {
      render(
        <I18nProviderClient locale="en">
          <Provider store={store}>
            <MoreActionsJob
              job={job}
              selectedStatus={selectedStatus}
              onStatusChange={onStatusChangeMock}
            />
          </Provider>
        </I18nProviderClient>
      );
    });

    // Simuler un clic sur le bouton "More options"
    const button = screen.getByLabelText(/More options/i);
    await userEvent.click(button);

    // Vérifie que les options de statut sont rendues dans le dropdown
    const dropdownMenuSubTrigger = screen.getByRole("menuitemStatus");
    expect(dropdownMenuSubTrigger).toBeInTheDocument();

    await userEvent.click(dropdownMenuSubTrigger);

    const deleteButton = screen.getByText(/Delete/i);
    await userEvent.click(deleteButton);

    // Vérifie que deleteJobToDatabase a été appelé
    expect(store.dispatch).toHaveBeenCalledWith(
      deleteJobToDatabase({
        id: job.id ?? "",
      })
    );
  });
});
