import { Membership } from '../../aggregates/membership.aggregate';
import { BillingPeriod } from '../../entities/billing-period.entity';
import { IBillingPeriodRepository } from '../../repos/ibilling-period.repository';


export class CreateBillingPeriodHandler {
  constructor(
    private readonly billingPeriodRepo: IBillingPeriodRepository,
  ) {}

  async execute(membership: Membership): Promise<BillingPeriod[]> {
    let periodStart = new Date(membership.validFrom);
    let billingPeriods: BillingPeriod[] = [];
    for (let i = 0; i < membership.billingPeriods; i++) {
      const startDate = new Date(periodStart);
      const endDate = new Date(startDate);
  
      if (membership.billingInterval === 'monthly') {
        endDate.setMonth(startDate.getMonth() + 1);
      } else if (membership.billingInterval === 'yearly') {
        endDate.setFullYear(startDate.getFullYear() + 1);
      } else if (membership.billingInterval === 'weekly') {
        endDate.setDate(startDate.getDate() + 7);
      }
  
      const billingPeriod = BillingPeriod.create({
        membershipId: membership.id,
        start: startDate,
        end: endDate,
      });
      
      await this.billingPeriodRepo.save(billingPeriod);
      billingPeriods.push(billingPeriod);
      periodStart = endDate;
    }
  
    return billingPeriods;
  }
  
}