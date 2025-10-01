import { Membership } from '../../aggregates/membership.aggregate';
import { BillingPeriod } from '../../entities/billing-period.entity';
import { IBillingPeriodRepository } from '../../repos/ibilling-period.repository';
import { IMembershipRepository } from '../../repos/imembership.repository';

export class ListMemberShipsHandler {
  constructor(
    private readonly membershipRepo: IMembershipRepository,
    private readonly billingPeriodRepo: IBillingPeriodRepository,
  ) {}

  async execute(): Promise<{ membership: Membership, periods: BillingPeriod[] }[]> {
    const memeberships = await this.membershipRepo.findAll();
    const membershipPeriods = await this.billingPeriodRepo.findAll();
    let indexedMembershipPeriods: { [key: string]: BillingPeriod[] } = {};
    for (const membershipPeriod of membershipPeriods) {
      indexedMembershipPeriods[membershipPeriod.membership] = indexedMembershipPeriods[membershipPeriod.membership] || [];
      indexedMembershipPeriods[membershipPeriod.membership].push(membershipPeriod);
    }
    let data: { membership: Membership, periods: BillingPeriod[] }[] = [];
    for (const membership of memeberships) {
      const membershipPeriods = indexedMembershipPeriods[membership.id];
      data.push({ membership, periods: membershipPeriods || [] });
    }
    return data;
  }
}