import { Request, Response } from "express";

export const get404 = (_: Request, res: Response) => {
  res.status(404).render("404", { pageTitle: "Error 404", path: "Error" });
};
