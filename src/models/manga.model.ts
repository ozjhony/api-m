import {Entity, model, property, hasMany, belongsTo} from '@loopback/repository';
import {Capitulos} from './capitulos.model';
import {Biblioteca} from './biblioteca.model';

@model()
export class Manga extends Entity {
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
  nombre: string;

  @hasMany(() => Capitulos)
  capitulos: Capitulos[];

  @belongsTo(() => Biblioteca)
  bibliotecaId: string;

  constructor(data?: Partial<Manga>) {
    super(data);
  }
}

export interface MangaRelations {
  // describe navigational properties here
}

export type MangaWithRelations = Manga & MangaRelations;
