export enum BillingInterval {
  WEEKLY = 'weekly',
  MONTHLY = 'monthly',
  YEARLY = 'yearly',
}

export class Billing {
  public readonly interval: BillingInterval;
  public readonly periods: number;

  private constructor(interval: BillingInterval, periods: number) {
    this.interval = interval;
    this.periods = periods;
  }

  public static create(interval: any, periods: number): Billing {
    if (!Object.values(BillingInterval).includes(interval as BillingInterval)) {
        throw new Error('Invalid billing interval provided.');
    }
    if (interval === BillingInterval.MONTHLY) {
      if (periods < 6 || periods > 12) {
        throw new Error(`billingPeriods${periods > 12 ? 'MoreThan12Months' : 'LessThan6Months'}`);
      }
    } else if (interval === BillingInterval.YEARLY) {
      if (periods < 3 || periods > 10) {
        throw new Error(`billingPeriods${periods > 10 ? 'MoreThan10Years' : 'LessThan3Years'}`);
      }
    }
    return new Billing(interval, periods);
  }
}