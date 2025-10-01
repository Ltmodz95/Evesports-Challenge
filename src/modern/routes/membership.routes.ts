import express, { Request, Response } from "express"
import { CreateMembershipHandler } from "../domain/membership/use-cases/create-membership/create-membership.handler";
import { RepositoryFactory } from "../infra/repository-factory.factory";
import { ListMemberShipsHandler } from "../domain/membership/use-cases/list-memberships/list-memberships.handler";
const router = express.Router();
const membershipRepository = RepositoryFactory.createMembershipRepository();
const billingPeriodRepository = RepositoryFactory.createBillingPeriodRepository();

router.get("/", async (req: Request, res: Response) => {
  const listMemberShipsHandler = new ListMemberShipsHandler(membershipRepository, billingPeriodRepository);
  try {
  const memberships = await listMemberShipsHandler.execute();
  console.log(memberships);
  res.status(200).json(memberships);
  } catch (error) {
    res.status(500).json({ message: (error as Error).message });
  }
})

router.post("/", async (req: Request, res: Response) => {
    const createMembershipHandler = new CreateMembershipHandler(membershipRepository, billingPeriodRepository);
    try {
    const membership = await createMembershipHandler.execute(req.body);
    res.status(201).json({ membership });
    } catch (error) {
        res.status(400).json({ message: (error as Error).message });
    }
})

export default router;
