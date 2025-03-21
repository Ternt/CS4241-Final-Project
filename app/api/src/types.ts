import { RootFilterQuery } from "mongoose";
import { SubjectType, CourseType, SectionType } from "@repo/app-commons/types/persistent.types";

export type SubjectFilterQuery = RootFilterQuery<SubjectType>;
export type CourseFilterQuery = RootFilterQuery<CourseType>;
export type SectionFilterQuery = RootFilterQuery<SectionType>;