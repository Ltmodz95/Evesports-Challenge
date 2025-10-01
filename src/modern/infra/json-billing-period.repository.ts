import path from "path";
import { IBillingPeriodRepository } from "../domain/membership/repos/ibilling-period.repository";
import fs from 'fs/promises';
import { BillingPeriod } from "../domain/membership/entities/billing-period.entity";

const DB_PATH = path.join(__dirname, '../../data/membership-periods.json');

export class JsonBillingPeriodRepository implements IBillingPeriodRepository {
    private billingPeriods: { [key: string]: BillingPeriod } = {};

    constructor() {
        this.readData();
    }

    async save(billingPeriod: BillingPeriod): Promise<void> {
        await this.readData();
        const id = Object.keys(this.billingPeriods).length + 1;
        billingPeriod.id = id;
        this.billingPeriods[id] = billingPeriod;
        await this.writeData();
    }

    async findById(id: string): Promise<BillingPeriod | null> {
        await this.readData();
        return this.billingPeriods[id] || null;
    }

    async findAll(): Promise<BillingPeriod[]> {
        await this.readData();
        return Object.values(this.billingPeriods);
    }

    private async writeData(): Promise<void> {
        await fs.mkdir(path.dirname(DB_PATH), { recursive: true });
        await fs.writeFile(DB_PATH, JSON.stringify(Object.values(this.billingPeriods), null, 2));
      }


    private async readData(): Promise<void> {
        const data = await fs.readFile(DB_PATH, 'utf8');
        for (const billingPeriod of JSON.parse(data)) {
            this.billingPeriods[billingPeriod.id] = billingPeriod;
        }
    }
}