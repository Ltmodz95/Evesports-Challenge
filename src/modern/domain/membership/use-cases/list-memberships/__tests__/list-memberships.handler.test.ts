import { ListMemberShipsHandler } from "../list-memberships.handler";
import { Membership } from "../../../aggregates/membership.aggregate";
import { BillingPeriod } from "../../../entities/billing-period.entity";
import { IMembershipRepository } from "../../../repos/imembership.repository";
import { IBillingPeriodRepository } from "../../../repos/ibilling-period.repository";

const membership1 = Membership.create({
  name: 'Premium Plan',
  recurringPrice: 90,
  paymentMethod: 'credit_card',
  validFrom: new Date('2025-01-01'),
  billingInterval: 'monthly',
  billingPeriods: 6,
});
membership1.id = 1;

const membership2 = Membership.create({
  name: 'Basic Plan',
  recurringPrice: 100,
  paymentMethod: 'cash',
  validFrom: new Date('2025-02-01'),
  billingInterval: 'yearly',
  billingPeriods: 3,
});
membership2.id = 2;

const mockMemberships: Membership[] = [membership1, membership2];

const mockBillingPeriods: BillingPeriod[] = [
  BillingPeriod.create({
    membershipId: 1,     
    start: new Date('2025-01-01'),
    end: new Date('2025-02-01'),
  }),
  BillingPeriod.create({
    membershipId: 1,     
    start: new Date('2025-02-01'),
    end: new Date('2025-03-01'),
  }),
  BillingPeriod.create({
    membershipId: 2,     
    start: new Date('2025-02-01'),
    end: new Date('2026-02-01'),
  }),
];

const expectedResult = [
  {
    membership: membership1,
    periods: mockBillingPeriods.filter(bp => bp.membership === 1)
  },
  {
    membership: membership2,
    periods: mockBillingPeriods.filter(bp => bp.membership === 2)
  }
];

const mockMembershipRepository: jest.Mocked<IMembershipRepository> = {
  save: jest.fn(),
  findById: jest.fn(),
  findAll: jest.fn().mockResolvedValue(mockMemberships),
};

const mockBillingPeriodRepository: jest.Mocked<IBillingPeriodRepository> = {
  save: jest.fn(),
  findById: jest.fn(),
  findAll: jest.fn().mockResolvedValue(mockBillingPeriods),
};

describe('List Memberships Handler', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should list memberships with their billing periods', async () => {
    const listMembershipsHandler = new ListMemberShipsHandler(
      mockMembershipRepository,
      mockBillingPeriodRepository
    );
    
    const result = await listMembershipsHandler.execute();
    expect(result).toMatchObject(expectedResult);
  });
});