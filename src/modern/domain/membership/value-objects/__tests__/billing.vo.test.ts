import { Billing } from "../billing.vo";

describe('Billing Value Object', () => {
  it('create a billing value object', () => {
    const billing = Billing.create('monthly', 10);
    expect(billing).toBeDefined();
  });
});

describe('Fields Validation', () => {
    describe('Billing interval', () => {
        it('throw an error if a billing has a invalid interval', () => {
            expect(()=> Billing.create('daily', 10)).toThrow('Invalid billing interval provided.');
        });
    });
    describe('billing periods', () => {
        it('throw an error if a billing has a invalid periods for a monthly interval    ', () => {
            expect(()=> Billing.create('monthly', 13)).toThrow('billingPeriodsMoreThan12Months');
        });
        it('throw an error if a billing has a invalid periods for a monthly interval', () => {
            expect(()=> Billing.create('monthly', 5)).toThrow('billingPeriodsLessThan6Months');
        });
        it('throw an error if a billing has a invalid periods for a yearly interval', () => {
            expect(()=> Billing.create('yearly', 2)).toThrow('billingPeriodsLessThan3Years');
        });
        it('throw an error if a billing has a invalid periods for a yearly interval', () => {
            expect(()=> Billing.create('yearly', 11)).toThrow('billingPeriodsMoreThan10Years');
        });

    });
});
