import { useDispatch, useSelector } from "react-redux";
import { Button } from "./ui/button";
import { addJobToDatabase, fetchJobs } from "@/store/actions/jobActions";
import { AppDispatch } from "@/lib/store";
import { useEffect } from "react";
import { Job } from "@/types/Job";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "./ui/table"; // Assurez-vous d'importer les composants nécessaires

const AddJob = () => {
  const dispatch = useDispatch<AppDispatch>();
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const { jobs, status, error } = useSelector((state: any) => state.job);

  useEffect(() => {
    if (status === "idle") {
      dispatch(fetchJobs());
    }
  }, [dispatch, status]);

  const handleAddJob = () => {
    const newJob = {
      title: "DEVVVV111",
      description: "Un poste de développeur front-end à pourvoir.",
      company: "Tech Innovators",
      type: "CDI",
      location: "Paris",
      contactEmail: "aaa@gmail.com",
      salary: "45000",
      createdAt: new Date().toISOString(), // Assure-toi que le job a un champ de type Date
    };

    dispatch(addJobToDatabase(newJob));
  };

  // Tri des jobs par date décroissante
  const sortedJobs = [...jobs].sort((a, b) => {
    const dateA = new Date(a.createdAt);
    const dateB = new Date(b.createdAt);
    return dateB.getTime() - dateA.getTime(); // Date décroissante
  });

  return (
    <div>
      <Button onClick={handleAddJob}>Ajouter un Job</Button>
      <h2>Liste des Jobs</h2>
      {status === "loading" && <p>Chargement...</p>}
      {error && <p style={{ color: "red" }}>{error}</p>}
      {jobs.length === 0 ? (
        <p>Aucun job trouvé.</p>
      ) : (
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Titre</TableHead>
              <TableHead>Description</TableHead>
              <TableHead>Entreprise</TableHead>
              <TableHead>Type</TableHead>
              <TableHead>Lieu</TableHead>
              <TableHead>Email</TableHead>
              <TableHead>Salaire</TableHead>
              <TableHead>Date d&apos;ajout</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {sortedJobs.map((job: Job) => (
              <TableRow key={job.id}>
                <TableCell>{job.title}</TableCell>
                <TableCell className="max-w-md truncate">
                  {job.description}
                </TableCell>
                <TableCell>{job.company}</TableCell>
                <TableCell>{job.type}</TableCell>
                <TableCell>{job.location}</TableCell>
                <TableCell>{job.contactEmail}</TableCell>
                <TableCell>{job.salary}</TableCell>
                <TableCell>
                  {job.createdAt
                    ? new Date(job.createdAt).toLocaleDateString()
                    : "Date non disponible"}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      )}
    </div>
  );
};

export default AddJob;
