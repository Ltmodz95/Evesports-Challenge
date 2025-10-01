import path from "path";
import { Membership } from "../domain/membership/aggregates/membership.aggregate";
import { IMembershipRepository } from "../domain/membership/repos/imembership.repository";
import fs from 'fs/promises';

const DB_PATH = path.join(__dirname, '../../data/memberships.json');

export class JsonMembershipRepository implements IMembershipRepository {
    private memberships: { [key: string]: Membership } = {};

    constructor() {
        this.readData();
    }

    async save(membership: Membership): Promise<Membership> {
        await this.readData();
        const id = Object.keys(this.memberships).length + 1;
        membership.id = id;
        this.memberships[id] = membership;
        await this.writeData();
        return membership;
    }

    async findById(id: string): Promise<Membership | null> {
        await this.readData();
        return this.memberships[id] || null;
    }

    async findAll(): Promise<Membership[]> {
        await this.readData();
        return Object.values(this.memberships);
    }

    private async writeData(): Promise<void> {
        await fs.mkdir(path.dirname(DB_PATH), { recursive: true });
        await fs.writeFile(DB_PATH, JSON.stringify(Object.values(this.memberships), null, 2));
      }


    private async readData(): Promise<void> {
        const data = await fs.readFile(DB_PATH, 'utf8');
        for (const membership of JSON.parse(data)) {
            this.memberships[membership.id] = membership;
        }
    }
}