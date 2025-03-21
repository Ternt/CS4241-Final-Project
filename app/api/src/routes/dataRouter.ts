import { Router, Request, Response } from "express";
import { XMLBuilder } from "fast-xml-parser";

import { getAllData } from '../util/DataParseUtil'

const router: Router = Router();

router.get("/all", async (req: Request, res: Response) => {
  try {
    const data = await getAllData();

    const builder = new XMLBuilder({
      attributeNamePrefix: "$",
      ignoreAttributes: false,
      arrayNodeName: "subject",
      indentBy: "    ",
      format: true,
    });
    const result = `<?xml version="1.0"?>
      <script>
        ${builder.build(data)}
      </script>
    `;

    res.set("Content-Type", "text/json").send(data);
  } catch (error) {
    console.error("[ERROR] Cannot find section data.");
    console.log(error);
    res.send(JSON.stringify({ success: false }));
  }
});


export default router;