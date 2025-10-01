import { v4 as uuidv4 } from 'uuid';
interface BillingPeriodProps {
    membershipId: number;
    start: Date;
    end: Date;
    state?: string;
}

enum BillingPeriodState {
    PLANNED = 'planned',
    ISSUED = 'issued',
}

export class BillingPeriod {
    id: number;
    uuid: string;
    membership: number;
    start: Date;
    end: Date;
    state: string;

    private constructor(props: BillingPeriodProps) {
        this.id = 0; // will be set by the repository defaulting to 0
        this.uuid = uuidv4();
        this.membership = props.membershipId;
        this.start = props.start;
        this.end = props.end;
        this.state = this.start > new Date() ? BillingPeriodState.PLANNED : BillingPeriodState.ISSUED;
    }

    static create(props: BillingPeriodProps) {
        return new BillingPeriod(props);
    }
}