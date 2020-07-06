import {Entity, model, property} from '@loopback/repository';

@model()
export class Userlog extends Entity {
  @property({
    type: 'string',
    id: true,
    generated: true,
  })
  id?: string;

  @property({
    type: 'string',
    required: true,
  })
  username: string;

  @property({
    type: 'string',
    required: true,
  })
  password: string;

  @property({
    type: 'number',
    required: true,
  })
  role: number;


  constructor(data?: Partial<Userlog>) {
    super(data);
  }
}

export interface UserlogRelations {
  // describe navigational properties here
}

export type UserlogWithRelations = Userlog & UserlogRelations;
