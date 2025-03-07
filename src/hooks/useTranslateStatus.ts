export const statusNameFrench = (status: string) => {
  switch (status) {
    case "Application Sent":
      return "Candidature envoyée";
    case "Interview Scheduled":
      return "Entretien planifié";
    case "Application Accepted":
      return "Candidature acceptée";
    case "Application Rejected":
      return "Candidature rejetée";
    case "Follow Up":
      return "Relancer";
    default:
      return status;
  }
};
