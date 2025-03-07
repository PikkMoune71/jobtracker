import { configureStore } from "@reduxjs/toolkit";
import jobReducer, { JobState } from "@/store/slices/jobSlice";
import { addJobToDatabase } from "@/store/actions/jobActions";

// Créez un store de test sans persistance
const createTestStore = (preloadedState: Partial<JobState> = {}) =>
  configureStore({
    reducer: {
      job: jobReducer,
    },
    preloadedState: {
      job: {
        jobs: [],
        status: "idle",
        error: "",
        ...preloadedState.jobs,
      },
    },
  });

describe("jobSlice", () => {
  it("should handle addJobToDatabase.pending", () => {
    const store = createTestStore();

    store.dispatch(
      addJobToDatabase.pending("", {
        id: "",
        title: "",
        company: "",
        type: "",
        location: "",
        description: "",
        contactEmail: "",
        salary: "",
        status: { name: "" },
      })
    );

    const state = store.getState().job;

    // Vérifiez que le statut est mis à jour en 'loading'
    expect(state.status).toBe("loading");
  });

  it("should handle addJobToDatabase.fulfilled (success)", () => {
    const store = createTestStore();

    // Simuler l'action fulfilled avec des données de job factices
    const job = {
      id: "1",
      title: "Software Engineer",
      company: "Facebook",
      type: "CDI",
      location: "Menlo Park, CA",
      description: "Work on the Facebook app",
      contactEmail: "test@gmail.com",
      salary: "100000",
      status: { name: "Candidature Envoyée" },
    };

    store.dispatch(addJobToDatabase.fulfilled(job, "", job));

    const state = store.getState().job;

    // Vérifiez que le job a été ajouté au tableau et que le statut est 'succeeded'
    expect(state.jobs).toContainEqual(job);
    expect(state.status).toBe("succeeded");
    expect(state.error).toBe("");
  });

  it("should handle addJobToDatabase.rejected (failure)", () => {
    const store = createTestStore();

    // Simuler l'action rejected avec un message d'erreur
    const errorMessage = "Erreur de serveur";

    store.dispatch(
      addJobToDatabase.rejected(new Error(errorMessage), "", {
        id: "",
        title: "",
        company: "",
        type: "",
        location: "",
        description: "",
        contactEmail: "",
        salary: "",
        status: { name: "" },
      })
    );

    const state = store.getState().job;

    // Vérifiez que l'erreur est capturée et que le statut est 'failed'
    expect(state.status).toBe("failed");
    expect(state.error).toBe(errorMessage);
  });
});
