import { Membership } from '../../aggregates/membership.aggregate';
import { BillingPeriod } from '../../entities/billing-period.entity';
import { IBillingPeriodRepository } from '../../repos/ibilling-period.repository';
import { IMembershipRepository } from '../../repos/imembership.repository';

interface CreateMembershipRequest {
  name: string;
  recurringPrice: number;
  paymentMethod: string;
  validFrom: Date;
  billingInterval: string;
  billingPeriods: number;
}


export class CreateMembershipHandler {
  constructor(
    private readonly membershipRepo: IMembershipRepository,
    private readonly billingPeriodRepo: IBillingPeriodRepository,
  ) {}

  async execute(command: CreateMembershipRequest): Promise<Membership> {
    const membership = Membership.create(command);
    await this.membershipRepo.save(membership);
  
    let periodStart = new Date(membership.validFrom);
  
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
      
      periodStart = endDate;
    }
  
    return membership;
  }
  
}