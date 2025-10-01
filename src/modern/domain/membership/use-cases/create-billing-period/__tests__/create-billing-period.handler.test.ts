import { RepositoryFactory } from "../../../../../infra/repository-factory.factory";
import { Membership } from "../../../aggregates/membership.aggregate";
import { CreateBillingPeriodHandler } from "../create-billing-period.handler";
import { v4 as uuidv4 } from 'uuid';

jest.mock('uuid', () => ({
  v4: jest.fn().mockReturnValue('123e4567-e89b-12d3-a456-426614174000'),
}));

let membership: Membership = Membership.create({
  name: 'test',
  recurringPrice: 100,
  paymentMethod: 'cash',
  validFrom: new Date('2025-09-01'),
  billingInterval: 'monthly',
  billingPeriods: 6,
});

const billingPeriodsData = [
  {
    start: new Date('2025-09-01'),
    end: new Date('2025-10-01'),
    state: 'issued',
    uuid: uuidv4(),
  },
  {
    start: new Date('2025-10-01'),
    end: new Date('2025-11-01T01:00:00.000Z'),
    state: 'planned',
    uuid: uuidv4(),
  },
  {
    start: new Date('2025-11-01T01:00:00.000Z'),
    end: new Date('2025-12-01T01:00:00.000Z'),
    state: 'planned',
    uuid: uuidv4(),
  },
  
  {
    start: new Date('2025-12-01T01:00:00.000Z'),
    end: new Date('2026-01-01T01:00:00.000Z'),
    state: 'planned',
    uuid: uuidv4(),
  },
  
  {
    start: new Date('2026-01-01T01:00:00.000Z'),
    end: new Date('2026-02-01T01:00:00.000Z'),
    state: 'planned',
    uuid: uuidv4(),
  },
  
  {
    start: new Date('2026-02-01T01:00:00.000Z'),
    end: new Date('2026-03-01T01:00:00.000Z'),
    state: 'planned',
    uuid: uuidv4(),
  },
];

describe('Billing Period Entity', () => {
  beforeAll(async () => {
    jest.useFakeTimers();
    jest.setSystemTime(new Date('2025-09-01'));
  });
  it('should create a billing periods based on the membership', async () => {
    const createBillingPeriodHandler = new CreateBillingPeriodHandler(RepositoryFactory.createBillingPeriodRepository());
    const billingPeriods = await createBillingPeriodHandler.execute(membership);
    expect(billingPeriods).toMatchObject(billingPeriodsData);
  });
});