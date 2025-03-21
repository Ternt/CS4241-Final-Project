import { Router, Request, Response } from 'express';
import { querySubjectData } from '../util/DataParseUtil';

const router:Router = Router({ caseSensitive: true });


router.get('/all', async (req: Request, res: Response) => {
  try {
    const subjectData = await querySubjectData({});
    res.status(200).send(subjectData);
  } catch (error) {
    console.error('Cannot find subject data: ' + error);
  }
});

router.get('/:subject_code', async (req: Request, res: Response) => {
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