import { Router, Request, Response } from 'express';

import { CategoryType } from "@repo/app-commons/types/types";
import { querySubjectData, queryCourseData, getDistinctFieldValues } from '../util/data-fetch.util';

const router : Router = Router({ caseSensitive: true });

router.get('/course-:subject_code', async (req: Request, res: Response) => {
  const code = req.params.subject_code;
  if (!code) {
    throw new Error('Query identifier is null');
  }

  try {
    const courseData = await queryCourseData({
      subject:code
    });
    res.status(200).send(courseData);
  } catch (error) {
    console.error('Cannot find subject data: ' + error);
    res.status(500).send('Internal server error');
  }
})

router.get('/subject-all', async (req: Request, res: Response) => {
  try {
    const categories = await getDistinctFieldValues('category');
    const data = await Promise.all(
      categories.map(
        async (category) => {
          const categoryObject: CategoryType = {
            category: category,
            subjects: []
          }

          const subjectData = await querySubjectData({ category: category }, { category: 0 });
          for (let i = 0 ; i < subjectData.length ; i++) {
            const subject = subjectData[i];
            categoryObject.subjects.push(subject);
          }

          return categoryObject;
        }
      )
    );

    res.status(200).send(data);
  } catch (error) {
    console.error('Cannot find subject data: ' + error);
  }
});

router.get('/subject-:subject_code', async (req: Request, res: Response) => {
  const code = req.params.subject_code;
  if (!code) {
    throw new Error('Query identifier is null');
  }

  try {
    const subjectData = await querySubjectData({
      code:code
    });
    res.status(200).send(subjectData);
  } catch (error) {
    console.error('Cannot find subject data: ' + error);
    res.status(500).send('Internal server error');
  }
});


export default router;