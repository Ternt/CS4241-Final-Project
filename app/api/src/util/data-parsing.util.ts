

/**
 * Contains a set of keywords that if matched,
 * would determine the category of the subject.
 */
export function determineSubjectCategory(subjectName: string, department: string) {
  if (
    department.match(/social/i) ||
    subjectName.match(/social/i)
  ) {
    return 'Social Science';
  }

  if (
    department.match(/engineering/i) ||
    subjectName.match(/engineering/i)
  ) {
    return 'Engineering';
  }

  const scienceRegex = new RegExp(
    /science|/.source
    + /physic(s)*|/.source
    + /chemistry|/.source
    + /bio|biology|/.source
    + /math/.source
    , 'i');
  if (department.match(scienceRegex)) {
    return 'Science';
  }

  const langRegex = new RegExp(
    /arabic|/.source
    + /chinese|/.source
    + /english|/.source
    + /german|/.source
    + /japanese|/.source
    + /spanish|/.source
    + /french|/.source
    + /vietnamese/.source
    , 'i');
  if (subjectName.match(langRegex)) {
    return 'Language'
  }

  if (department.match(/humanities | art(s)*/ig)) {
    return 'Humanities';
  }

  if (department.match(/business/ig)) {
    return 'Business';
  }

  return 'Others'
}