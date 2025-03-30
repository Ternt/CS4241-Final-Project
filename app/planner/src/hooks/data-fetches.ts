import { useQuery } from "@tanstack/react-query";
import axios from "axios";

export function fetchAllSubjects() {
  return useQuery({
    queryKey: ["subject-all"],
    queryFn: () =>
      axios({
        url: "http://localhost:8080/api/data/subject-all",
        method: "get",
        headers: {
          "Content-Type": "application/json",
        }
      }).then((res) => res.data),
    enabled: true,
    retry: 4,
  });
}

export function fetchCourses(subject_code: string) {
  return useQuery({
    queryKey: [`courses-${subject_code}`],
    queryFn: () =>
      axios({
        url: `http://localhost:8080/api/data/course-${subject_code}`,
        method: "get",
        headers: {
          "Content-Type": "application/json",
        }
      }).then((res) => res.data),
    enabled: true,
    retry: 4,
  });
}

export function fetchCourseXML() {
  return useQuery({
    queryKey: ["subject"],
    queryFn: () =>
      axios({
        url: "http://localhost:8080/api/data/all",
        method: "get",
        headers: {
          "Content-Type": "application/xml",
        }
      }).then((res) => res.data),
    enabled: true,
    retry: 4,
  });
}