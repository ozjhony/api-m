import {DefaultCrudRepository, repository, BelongsToAccessor} from '@loopback/repository';
import {Comentario, ComentarioRelations, Publicacion} from '../models';
import {MongodbDataSource} from '../datasources';
import {inject, Getter} from '@loopback/core';
import {PublicacionRepository} from './publicacion.repository';

export class ComentarioRepository extends DefaultCrudRepository<
  Comentario,
  typeof Comentario.prototype.id,
  ComentarioRelations
> {

  public readonly publicacion: BelongsToAccessor<Publicacion, typeof Comentario.prototype.id>;

  constructor(
    @inject('datasources.mongodb') dataSource: MongodbDataSource, @repository.getter('PublicacionRepository') protected publicacionRepositoryGetter: Getter<PublicacionRepository>,
  ) {
    super(Comentario, dataSource);
    this.publicacion = this.createBelongsToAccessorFor('publicacion', publicacionRepositoryGetter,);
    this.registerInclusionResolver('publicacion', this.publicacion.inclusionResolver);
  }
}
