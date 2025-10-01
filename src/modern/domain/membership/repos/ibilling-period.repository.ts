import { BillingPeriod } from '../entities/billing-period.entity';

export interface IBillingPeriodRepository {
    save(billingPeriod: BillingPeriod): Promise<void>;
    findById(id: string): Promise<BillingPeriod | null>;
    findAll(): Promise<BillingPeriod[]>;
  }