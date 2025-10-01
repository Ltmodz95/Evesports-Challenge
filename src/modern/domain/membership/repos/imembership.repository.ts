import { Membership } from '../aggregates/membership.aggregate';

export interface IMembershipRepository {
    save(membership: Membership): Promise<Membership>;
    findById(id: string): Promise<Membership | null>;
    findAll(): Promise<Membership[]>;
  }