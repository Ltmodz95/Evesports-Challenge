import { BillingPeriod } from "../billing-period.entity";

describe('Billing Period Entity', () => {
  it('create a billing period entity', () => {
    const billingPeriod = BillingPeriod.create({
      membershipId: 1,
      start: new Date(),
      end: new Date(),
    });
    expect(billingPeriod).toBeDefined();
  });
  it('create a billing period entity with a planned state', () => {
    const billingPeriod = BillingPeriod.create({
      membershipId: 1,
      start: new Date(Date.now() + 10 * 24 * 60 * 60 * 1000),
      end: new Date(),
    });
    expect(billingPeriod.state).toBe('planned');
  });
  it('create a billing period entity with a issued state', () => {
    const billingPeriod = BillingPeriod.create({
      membershipId: 1,
      start: new Date(Date.now() - 10 * 24 * 60 * 60 * 1000),
      end: new Date(),
    });
    expect(billingPeriod.state).toBe('issued');
  });
});