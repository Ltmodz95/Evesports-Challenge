import { IBillingPeriodRepository } from "../domain/membership/repos/ibilling-period.repository";
import { IMembershipRepository } from "../domain/membership/repos/imembership.repository";
import { JsonBillingPeriodRepository } from "./json-billing-period.repository";
import { JsonMembershipRepository } from "./json-membership.repository";

export class RepositoryFactory {
    private static membershipRepository: IMembershipRepository;
    private static billingPeriodRepository: IBillingPeriodRepository;

    static createMembershipRepository(): IMembershipRepository {
        if (!this.membershipRepository) {
            this.membershipRepository = new JsonMembershipRepository();
        }
        return this.membershipRepository;
    }

    static createBillingPeriodRepository(): IBillingPeriodRepository {
        if (!this.billingPeriodRepository) {
            this.billingPeriodRepository = new JsonBillingPeriodRepository();
        }
        return this.billingPeriodRepository;
    }
}