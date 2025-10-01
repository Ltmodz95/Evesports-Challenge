import { Membership } from "../membership.aggregate";

describe('Membership Aggregate', () => {
  it('should create a membership', () => {
    const membership = Membership.create({
      name: 'test',
      recurringPrice: 100,
      paymentMethod: 'cash',
      validFrom: new Date(),
      billingInterval: 'monthly',
      billingPeriods: 10,
    });
    expect(membership).toBeDefined();
  });

});

describe('Fields Validation', () => {
  it('throw an error if a membership has a missing name', () => {
    expect(() => Membership.create({
      name: '',
      recurringPrice: 100,
      paymentMethod: 'cash',
      validFrom: new Date(),
      billingInterval: 'monthly',
      billingPeriods: 10,
    })).toThrow('missingMandatoryFields');
  });
  it('throw an error if a membership has a negative recurring price', () => {
    expect(() => Membership.create({
      name: 'test',
      recurringPrice: -100,
      paymentMethod: 'cash',
      validFrom: new Date(),
      billingInterval: 'monthly',
      billingPeriods: 10,
    })).toThrow('negativeRecurringPrice');
  });
  it('throw an error if a membership has a cash price below 100', () => {
    expect(() => Membership.create({
      name: 'test',
      recurringPrice: 101,
      paymentMethod: 'cash',
      validFrom: new Date(),
      billingInterval: 'monthly',
      billingPeriods: 10,
    })).toThrow('cashPriceBelow100');
  });
});

describe('Membership State', () => {
  it('create a membership with active state', () => {
    const membership = Membership.create({
      name: 'test',
      recurringPrice: 100,
      paymentMethod: 'cash',
      validFrom: new Date(),
      billingInterval: 'monthly',
      billingPeriods: 10,
    });
    expect(membership.state).toBe('active');
  });
  it('create a membership with a pending state', () => {
    const yearFromNow = new Date(Date.now() + 365 * 24 * 60 * 60 * 1000);
    const membership = Membership.create({
      name: 'test',
      recurringPrice: 100,
      paymentMethod: 'cash',
      validFrom: yearFromNow,
      billingInterval: 'monthly',
      billingPeriods: 10,
    });
    expect(membership.state).toBe('pending');
  });

  it('create a membership with an expired state', () => {
    const yearAgo = new Date(Date.now() - 365 * 24 * 60 * 60 * 1000);
    const membership = Membership.create({
      name: 'test',
      recurringPrice: 100,
      paymentMethod: 'cash',
      validFrom: yearAgo,
      billingInterval: 'monthly',
      billingPeriods: 10,
    });
      expect(membership.state).toBe('expired');
    });
});

describe('Valid Until', () => {
  it('calculate the valid until date for a monthly membership', () => {
    const membership = Membership.create({
      name: 'test',
      recurringPrice: 100,
      paymentMethod: 'cash',
      validFrom: new Date('2025-01-01'),
      billingInterval: 'monthly',
      billingPeriods: 10,
    });
    expect(membership.validUntil).toEqual(new Date('2025-11-01'));
  });
  it('calculate the valid until date for a yearly membership', () => {
    const membership = Membership.create({
      name: 'test',
      recurringPrice: 100,
      paymentMethod: 'cash',
      validFrom: new Date('2025-01-01'),
      billingInterval: 'yearly',
      billingPeriods: 4,
    });
    expect(membership.validUntil).toEqual(new Date('2029-01-01'));
  });

  it('calculate the valid until date for a weekly membership', () => {
    const membership = Membership.create({
      name: 'test',
      recurringPrice: 100,
      paymentMethod: 'cash',
      validFrom: new Date('2025-01-01'),
      billingInterval: 'weekly',
      billingPeriods: 13,
    });
    expect(membership.validUntil).toEqual(new Date('2025-04-02'));
  });
});