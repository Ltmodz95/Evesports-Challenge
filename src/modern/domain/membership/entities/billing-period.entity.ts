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
        this.state = BillingPeriodState.PLANNED;
    }

    static async create(props: BillingPeriodProps) {
        return new BillingPeriod(props);
    }
}