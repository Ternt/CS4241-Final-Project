import Subject from '../persistent/SubjectPersistence';
import Course from '../persistent/CoursePersistence';
import Section from '../persistent/SectionPersistence';

import { SubjectFilterQuery, CourseFilterQuery, SectionFilterQuery } from '../types';

export async function querySubjectData(QueryObject:SubjectFilterQuery) {
  const queryResult = Subject.find(
    QueryObject,
    { _id: 0, __v: 0 },
    { lean: true },
  );

  if (!queryResult || !queryResult.size) {
    throw new Error("Subject does not exist");
  }

  return queryResult;
}

export async function queryCourseData(QueryObject:CourseFilterQuery) {
  const queryResult = Course.find(
    QueryObject,
    { _id: 0, __v: 0 },
    { lean: true },
  );

  if (!queryResult || !queryResult.size) {
    throw new Error("Course does not exist");
  }

  return queryResult;
}

export async function querySectionData(QueryObject:SectionFilterQuery) {
  const queryResult = Section.find(
    QueryObject,
    { _id: 0, __v: 0 },
    { lean: true },
  );

  if (!queryResult || !queryResult.size) {
    throw new Error("Section does not exist");
  }

  return queryResult;
}