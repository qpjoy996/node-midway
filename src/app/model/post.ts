import { DataType, Column, Model, Table, CreatedAt, UpdatedAt, DeletedAt} from 'sequelize-typescript';
import { providerWrapper } from 'midway';

const { STRING, TEXT, INTEGER, BIGINT, UUIDV1 } = DataType;

export const factory = () => PostModel;
providerWrapper([
  {
    id: 'PostModel',
    provider: factory
  }
]);
export type IPostModel = typeof PostModel;

@Table({
  freezeTableName: true,
  tableName: 'my_post_table',
  underscored: true,
  schema: 'node_midway',
  paranoid: true
})
export class PostModel extends Model<any> {
  @Column({
    type: BIGINT(Object(20)),
    primaryKey: true,
    autoIncrement: true,
    comment: 'post id',
  })
  id: number;

  @Column({
    type: STRING(100),
    defaultValue: UUIDV1,
    // sequelize.literal('uuid_generate_v1()')
    unique: true,
    allowNull: false,
    comment: 'post uuid',
  })
  post_uuid: string;

  @Column({
    type: STRING(1024),
    allowNull: false,
    comment: 'post title'
  })
  title: string;

  @Column({
    field: 'post_content', // db field
    type: TEXT,
    allowNull: true,
    comment: 'post content',
  })
  content: string; // param field

  @Column({
    type: INTEGER(Object(11)),
    allowNull: false,
    defaultValue: 1,
    comment: 'soft delete status', // 0-deleted 1-normal
  })
  status: number;

  @CreatedAt
  @Column({ field: 'created_at' })
  createdTime: Date;

  @UpdatedAt
  @Column({ field: 'modified_at' })
  modifiedTime: Date;

  @DeletedAt
  @Column({ field: 'delete_at'})
  deleteTime: Date
}
