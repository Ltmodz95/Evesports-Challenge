import { v4 as uuidv4 } from 'uuid';
import { Billing } from '../value-objects/billing.vo';


enum PaymentMethod {
    CASH = 'cash',
    CREDIT_CARD = 'credit card',
}

interface MembershipProps {
    name: string;
    recurringPrice: number;
    paymentMethod: string;
    validFrom: Date;
    billingInterval: string;
    billingPeriods: number;
    userId?: number;
  }

enum MembershipState {
    ACTIVE = 'active',
    PENDING = 'pending',
    EXPIRED = 'expired',
}

export class Membership {
    uuid: string;
    id: number;
    name: string;
    recurringPrice: number;
    paymentMethod: PaymentMethod;
    validFrom: Date;
    validUntil: Date;
    billingInterval: string;
    billingPeriods: number;
    userId: number;
    state: MembershipState;
    constructor(props: MembershipProps) {
        this.uuid = uuidv4();
        this.id = 0; // will be set by the repository defaulting to 0
        this.name = props.name;
        this.recurringPrice = props.recurringPrice;
        this.paymentMethod = props.paymentMethod as PaymentMethod;
        this.validFrom = props.validFrom ? new Date(props.validFrom) : new Date();
        this.billingInterval = props.billingInterval;
        this.billingPeriods = props.billingPeriods;
        this.userId = props.userId || 2000;
        this.validUntil = this.calculateValidUntil();
        this.state = this.setState();
    }


    static create(props: MembershipProps) {
        Billing.create(props.billingInterval, props.billingPeriods);
        const membership = new Membership(props);
        membership.validate();
        return membership;
    }

    private validate() {
        if (this.name.length === 0) {
            throw new Error('missingMandatoryFields');
        }
        if (this.recurringPrice < 0) {
            throw new Error('negativeRecurringPrice');
        }
        if (this.paymentMethod === PaymentMethod.CASH && this.recurringPrice > 100) {
            throw new Error('cashPriceBelow100');
        }
    }

    private calculateValidUntil(): Date {
        const validUntil = new Date(this.validFrom);
        if (this.billingInterval === 'monthly') {
            validUntil.setMonth(this.validFrom.getMonth() + this.billingPeriods);
        } else if (this.billingInterval === 'yearly') {
            validUntil.setMonth(this.validFrom.getMonth() + this.billingPeriods * 12);
        } else if (this.billingInterval === 'weekly') {
            validUntil.setDate(this.validFrom.getDate() + this.billingPeriods * 7);
        }
        return validUntil;
    }

    private setState(): MembershipState {
        let state = MembershipState.ACTIVE;
        if (this.validFrom > new Date()) {
            state = MembershipState.PENDING;
        } else if (this.validUntil < new Date()) {
            state = MembershipState.EXPIRED;
        }
        return state;
    }
}