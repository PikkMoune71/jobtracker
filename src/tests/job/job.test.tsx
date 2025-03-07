import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import { Provider } from "react-redux";
import configureStore from "redux-mock-store";
import AddJobForm from "@/components/AddJobForm"; // Assurez-vous que le chemin est correct
import { addJobToDatabase } from "@/store/actions/jobActions";
import "@testing-library/jest-dom";

// Mock de l'action addJobToDatabase
jest.mock("@/store/actions/jobActions", () => ({
  addJobToDatabase: jest.fn(),
}));

const mockStore = configureStore([]);

describe("AddJobForm", () => {
  let store: ReturnType<typeof mockStore>;

  beforeEach(() => {
    store = mockStore({});
    store.dispatch = jest.fn(); // Simuler l'appel de dispatch
    render(
      <Provider store={store}>
        <AddJobForm />
      </Provider>
    );
  });

  it("should render form inputs", () => {
    expect(screen.getByLabelText(/Title/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Company/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Type/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Location/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Description/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Contact Email/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Salary/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Status/i)).toBeInTheDocument(); // Vérification du champ Status
  });

  it("should update input values on change", () => {
    const titleInput = screen.getByLabelText(/Title/i);
    fireEvent.change(titleInput, { target: { value: "Frontend Developer" } });
    expect(titleInput).toHaveValue("Frontend Developer");
  });

  it("should dispatch addJobToDatabase action on form submit", async () => {
    // Simuler la récupération des status dans le composant
    await screen.findByText("Status"); // Attendre que le composant charge

    fireEvent.change(screen.getByLabelText(/Title/i), {
      target: { value: "Frontend Developer" },
    });
    fireEvent.change(screen.getByLabelText(/Company/i), {
      target: { value: "Tech Corp" },
    });
    fireEvent.change(screen.getByLabelText(/Type/i), {
      target: { value: "Full-time" },
    });
    fireEvent.change(screen.getByLabelText(/Location/i), {
      target: { value: "Remote" },
    });
    fireEvent.change(screen.getByLabelText(/Description/i), {
      target: { value: "Awesome job opportunity" },
    });
    fireEvent.change(screen.getByLabelText(/Contact Email/i), {
      target: { value: "test@techcorp.com" },
    });
    fireEvent.change(screen.getByLabelText(/Salary/i), {
      target: { value: "5000" },
    });

    // Simuler la sélection d'un status (choisir "Candidature Envoyée")
    fireEvent.change(screen.getByRole("combobox"), {
      target: { value: "Candidature Envoyée" },
    });

    // Soumettre le formulaire
    fireEvent.submit(screen.getByRole("form"));

    // Vérifier que l'action a été appelée avec les bonnes valeurs
    expect(store.dispatch).toHaveBeenCalledWith(
      addJobToDatabase({
        title: "Frontend Developer",
        company: "Tech Corp",
        type: "Full-time",
        location: "Remote",
        description: "Awesome job opportunity",
        contactEmail: "test@techcorp.com",
        salary: "5000",
        status: { id: "1", name: "Candidature Envoyée" },
      })
    );
  });
});
