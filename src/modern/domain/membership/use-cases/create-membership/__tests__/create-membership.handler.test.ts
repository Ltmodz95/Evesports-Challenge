import { CreateMembershipHandler } from "../create-membership.handler";
import { RepositoryFactory } from "../../../../../infra/repository-factory.factory";
import { v4 as uuidv4 } from 'uuid';

jest.mock('uuid', () => ({
  v4: jest.fn().mockReturnValue('123e4567-e89b-12d3-a456-426614174000'),
}));

describe('Create Membership Handler', () => {

  const membershipData = {
    name: 'test',
    recurringPrice: 100,
    paymentMethod: 'cash',
    validFrom: new Date('2025-10-01'),
    billingInterval: 'monthly',
    billingPeriods: 10,
    state: 'active',
    userId: 2000,
    validUntil: new Date('2026-08-01'),
    uuid: uuidv4()
  }
  it('create a membership', async () => {
    const createMembershipHandler = new CreateMembershipHandler(RepositoryFactory.createMembershipRepository(), RepositoryFactory.createBillingPeriodRepository());
    const membership = await createMembershipHandler.execute({
      name: 'test',
      recurringPrice: 100,
      paymentMethod: 'cash',
      validFrom: new Date('2025-10-01'),
      billingInterval: 'monthly',
      billingPeriods: 10,
    });
    expect(membership).toMatchObject(membershipData);
  });
});