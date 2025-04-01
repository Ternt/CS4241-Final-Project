export type CourseType = {
  code: string;
  title: string;
  description: string;
  instructors: string;
  waitlist_capacity: string;
  enrolled_capacity: string;
  credits: number;
  subject: string;
  academic_level: string;
  academic_terms_pattern: string[];
  offering_periods: string[];
  academic_period: string;
  course_tags: string[];
}

export type ColumnDef = {
  header: string;
  accessor: string;
}

export type BaseColumnDef = {
  id: number;
  header: string;
  resizable: boolean;
  accessor: string;
  width: number;
}