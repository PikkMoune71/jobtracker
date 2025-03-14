import { I18nProviderClient } from "@/locales/client";
import { act, render, screen, waitFor } from "@testing-library/react";
import { Provider } from "react-redux";
import configureStore from "redux-mock-store";
import "@testing-library/jest-dom";
import { MoreActionsJob } from "@/components/MoreActionsJob";
import { Status } from "@/types/Status";
import { Job } from "@/types/Job";
import userEvent from "@testing-library/user-event";

jest.mock("@/store/actions/jobActions", () => ({
  fetchJobsByStatus: jest.fn(),
  updateJobStatus: jest.fn(),
}));

const mockStore = configureStore([]);

describe("MoreActionsJob", () => {
  let store: ReturnType<typeof mockStore>;

  beforeEach(() => {
    store = mockStore({
      status: {
        status: [
          { id: "1", name: "Application Sent", color: "blue" },
          { id: "2", name: "Interview Scheduled", color: "green" },
          { id: "3", name: "Offer Made", color: "orange" },
        ],
      },
    });
    store.dispatch = jest.fn();
  });

  it("should render status options correctly", async () => {
    const selectedStatus: Status = {
      id: "1",
      name: "Application Sent",
      color: "blue",
    };

    const onStatusChangeMock = jest.fn();
    const onUpdatedJobClickMock = jest.fn();

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
              onUpdatedJobClick={onUpdatedJobClickMock}
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

    const dropdownMenu = await screen.findByRole("dropdownStatus");
    expect(dropdownMenu).toBeInTheDocument();

    // Vérifie que les statuts sont correctement affichés dans le menu
    const statusItems = screen.getAllByRole("optionStatus");
    expect(statusItems.length).toBe(3); // S'il y a 3 statuts
    expect(statusItems[0]).toHaveTextContent("Application Sent");
    expect(statusItems[1]).toHaveTextContent("Interview Scheduled");
    expect(statusItems[2]).toHaveTextContent("Offer Made");
  });

  it("should change the status of a job when an option is selected", async () => {
    const selectedStatus: Status = {
      id: "1",
      name: "Application Sent",
      color: "blue",
    };

    const onStatusChangeMock = jest.fn();
    const onUpdatedJobClickMock = jest.fn();

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
              onUpdatedJobClick={onUpdatedJobClickMock}
            />
          </Provider>
        </I18nProviderClient>
      );
    });

    // Simuler un clic sur le bouton "More options"
    const button = screen.getByLabelText(/More options/i);
    await userEvent.click(button);

    // Simuler la sélection d'une nouvelle option de statut
    const dropdownMenuSubTrigger = screen.getByRole("menuitemStatus");
    await userEvent.click(dropdownMenuSubTrigger);

    const dropdownMenu = await screen.findByRole("dropdownStatus");
    expect(dropdownMenu).toBeInTheDocument();

    // Sélectionner le deuxième statut
    const option = screen.getByText("Interview Scheduled");
    await userEvent.click(option);

    // Vérifie que `onStatusChangeMock` a bien été appelé avec les bons paramètres
    await waitFor(() =>
      expect(onStatusChangeMock).toHaveBeenCalledWith("123", {
        id: "2",
        name: "Interview Scheduled",
        color: "green",
      })
    );
  });
});
