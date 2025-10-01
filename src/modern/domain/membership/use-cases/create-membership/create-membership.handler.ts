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
    for (let i = 0; i < Number(membership.billingPeriods); i++) {
      const billingPeriod = await BillingPeriod.create({
        membershipId: membership.id,
        start: new Date(membership.validFrom),
        end: new Date(membership.validUntil),
      });
      await this.billingPeriodRepo.save(billingPeriod);
    }
    return membership;
  }
}